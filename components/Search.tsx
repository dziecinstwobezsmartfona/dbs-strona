'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DEBOUNCE_MS = 2000;
const MIN_QUERY_LENGTH = 2;

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

interface SearchResponse {
  results: SearchResult[];
  nextOffset: number | null;
}

type Status = 'idle' | 'loading' | 'done' | 'error';

const Search: React.FC<{ initialQuery?: string }> = ({ initialQuery = '' }) => {
  const router = useRouter();
  const [input, setInput] = React.useState(initialQuery);
  const [query, setQuery] = React.useState(initialQuery.trim());
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [nextOffset, setNextOffset] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<Status>(initialQuery.trim().length >= MIN_QUERY_LENGTH ? 'loading' : 'idle');
  const abortRef = React.useRef<AbortController | null>(null);
  const loadingMoreRef = React.useRef(false);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  // router.replace below changes the URL (and so initialQuery); only the first value matters
  const openedWithQuery = React.useRef(initialQuery.trim());

  const fetchPage = React.useCallback(async (q: string, offset: number) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch(`/api/szukaj?q=${encodeURIComponent(q)}&offset=${offset}`, { signal: controller.signal });
      if (!res.ok) throw new Error(String(res.status));
      const data: SearchResponse = await res.json();
      setResults((prev) => (offset === 0 ? data.results : [...prev, ...data.results]));
      setNextOffset(data.nextOffset);
      setStatus('done');
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      setStatus('error');
    } finally {
      if (abortRef.current === controller) loadingMoreRef.current = false;
    }
  }, []);

  // Starts a fresh search for an already trimmed query
  const commitQuery = React.useCallback((q: string) => {
    setQuery(q);
    router.replace(q ? `/szukaj?q=${encodeURIComponent(q)}` : '/szukaj', { scroll: false });
    setResults([]);
    setNextOffset(null);
    loadingMoreRef.current = false;
    if (q.length < MIN_QUERY_LENGTH) {
      abortRef.current?.abort();
      setStatus('idle');
      return;
    }
    setStatus('loading');
    fetchPage(q, 0);
  }, [fetchPage, router]);

  // Search for the query the page was opened with
  React.useEffect(() => {
    const q = openedWithQuery.current;
    if (q.length < MIN_QUERY_LENGTH) return;
    const timer = setTimeout(() => fetchPage(q, 0), 0);
    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [fetchPage]);

  // Wait until the user stops typing before searching
  React.useEffect(() => {
    const trimmed = input.trim();
    if (trimmed === query) return;
    const timer = setTimeout(() => commitQuery(trimmed), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [input, query, commitQuery]);

  // Load the next portion when the end of the list scrolls into view
  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || nextOffset === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMoreRef.current) {
        loadingMoreRef.current = true;
        setStatus('loading');
        fetchPage(query, nextOffset);
      }
    }, { rootMargin: '200px' });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [nextOffset, query, fetchPage, results.length]);

  const submitNow = (e: React.FormEvent) => {
    e.preventDefault();
    commitQuery(input.trim());
  };

  const tooShort = query.length < MIN_QUERY_LENGTH;

  return (
    <div className="w-full">
      <form onSubmit={submitNow} role="search" className="mb-10">
        <label htmlFor="search-input" className="sr-only">Szukaj na stronie</label>
        <input
          id="search-input"
          type="search"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={100}
          placeholder="Wpisz, czego szukasz…"
          className="w-full rounded-3xl bg-white px-6 py-4 text-lg shadow-md outline-none focus:ring-2 focus:ring-(--foreground)"
        />
      </form>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="text-center text-red-700">Nie udało się wyszukać. Spróbuj ponownie za chwilę.</p>
        )}
        {status === 'done' && results.length === 0 && (
          <p className="text-center text-gray-600">Brak wyników dla „{query}”.</p>
        )}
        {status === 'idle' && input.trim().length > 0 && input.trim().length < MIN_QUERY_LENGTH && (
          <p className="text-center text-gray-600">Wpisz co najmniej {MIN_QUERY_LENGTH} znaki.</p>
        )}
      </div>

      {!tooShort && results.length > 0 && (
        <ul className="flex flex-col gap-4">
          {results.map((r, i) => (
            <li key={`${r.url}-${i}`}>
              <Link
                href={r.url}
                className="block rounded-3xl bg-white p-5 shadow-md transition-transform hover:scale-[1.01] hover:bg-gray-50"
              >
                <h2 className="font-semibold text-xl leading-tight mb-1">{r.title}</h2>
                <p className="text-gray-700 line-clamp-2">{r.snippet}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {nextOffset !== null && <div ref={sentinelRef} className="h-10" />}
      {status === 'loading' && (
        <p className="py-6 text-center text-gray-600" role="status">Szukam…</p>
      )}
    </div>
  );
};

export default Search;

'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MenuItem {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openMenuIndex, setOpenMenuIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu-group')) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const menus: MenuItem[] = [
    { title: 'O NAS', links: [{ label: 'Nasza Misja', href: '/nasza-misja' }, { label: 'Nasz Wpływ', href: '/nasz-wplyw' }] },
    { title: 'CO ROBIMY', links: [{ label: 'Sytuacja', href: '/sytuacja' }, { label: 'Rozwiązanie', href: '/rozwiazanie' }] },
    // { title: 'Materiały', links: [{ label: 'Dla rodziców', href: '/dla-rodzicow' }, { label: 'Dla nauczycieli', href: '/dla-nauczycieli' }] }
  ];

  const rightLinks = [
    { label: 'CO MOGĘ ZROBIĆ?', href: '/co-moge-zrobic' },
    { label: 'Podpisz PAKT', href: '/pakt-rodzicow' }
  ];

  return (
    <header className="fixed top-4.5 left-[4%] right-[4%] bg-(--background) shadow-lg z-50 rounded-3xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 lg:px-6 py-3 mx-auto">
        {/* Left: Hamburger for mobile + Desktop menus */}
        <div className="justify-self-start flex items-center">
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <nav className="hidden lg:flex items-center space-x-2 md:space-x-4 lg:space-x-6">
            {menus.map((menu, index) => (
              <div key={index} className="group relative menu-group">
                <div 
                  className="cursor-pointer font-menu font-bold text-[clamp(0.75rem,1.5vw,1rem)] text-gray-700 hover:text-gray-900 px-2 md:px-3 py-2 rounded-lg transition-colors"
                  onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                >
                  {menu.title}
                </div>
                <ul className={`font-menu font-bold absolute left-0 top-full bg-white shadow-xl rounded-lg border border-gray-200 min-w-[150px] py-2 z-10 ${
                  openMenuIndex === index ? 'block' : 'hidden group-hover:block'
                }`}>
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        onClick={() => setOpenMenuIndex(null)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Center: Logo and Organization Name */}
        <div className="flex flex-row justify-center items-center space-x-2 lg:space-x-3">
          {/* <Image src="/images/logo1.png" alt="" width={70} height={70} /> */}
          <Link href="/">
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg lg:text-[2.2rem]/8 font-title">DZIECIŃSTWO</p>
              <p className="text-lg lg:text-[2.2rem]/8 font-title">BEZ SMARTFONA</p>
            </div>
          </Link>
        </div>

        {/* Right: Desktop links + Search icon */}
        <div className="justify-self-end flex items-center space-x-2 lg:space-x-4">
          <nav className="hidden lg:flex space-x-2 md:space-x-4">
            {rightLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={
                  link.label === 'Podpisz PAKT'
                    ? "font-menu font-bold text-[clamp(0.75rem,1.5vw,1rem)] bg-[var(--main-accent)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-white px-2 md:px-4 py-4 rounded-3xl transition-colors"
                    : "font-menu font-bold text-[clamp(0.75rem,1.5vw,1rem)] text-gray-700 hover:text-gray-900 px-2 md:px-4 py-4 rounded-3xl transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Search Icon */}
          {/*
          <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t border-gray-200 px-4 lg:px-6 py-4">
          {menus.map((menu, index) => (
            <div key={index} className="mb-4">
              <div className="font-menu text-gray-900 py-2">{menu.title}</div>
              <ul className="space-y-2">
                {menu.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="block text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 space-y-2">
            {rightLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block font-menu text-gray-700 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-(--background) items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <Image
              src="/under-construction.png"
              alt="Nie ma takiej strony"
              width={400}
              height={300}
              className="mx-auto"
              priority
            />
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Nie ma tu takiej strony</h2>
          
          {/* Call to Action */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block bg-(--foreground) text-(--background) px-8 py-3 rounded-3xl text-lg font-semibold hover:bg-(--secondary-background) transition-colors shadow-md"
            >
              Wróć na stronę główną
            </Link>
            
          </div>
        </div>
      </main>

    </div>
  );
}
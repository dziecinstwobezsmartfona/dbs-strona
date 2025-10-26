import Link from 'next/link';
import React from 'react';

interface MenuItem {
  title: string;
  links: string[];
}

const Header: React.FC = () => {
  const menus: MenuItem[] = [
    { title: 'O Nas', links: ['Nasza Misja', 'Nasz Wpływ', 'Nasza Historia', 'Nasz Zespół'] },
    { title: 'Zagadnienie', links: ['Problem', 'Rozwiązanie', 'Dane'] },
    { title: 'Zasoby', links: ['Pytania', 'Narzędzia', 'DBS Blog', 'DBS Poleca'] }
  ];

  return (
    <header className="fixed top-4 left-[5%] right-[5%] bg-white shadow-lg z-50 rounded-3xl border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 mx-auto relative">
        {/* Left: Three folding menus */}
        <nav className="flex items-center space-x-6">
          {menus.map((menu, index) => (
            <div key={index} className="group relative">
              <div className="cursor-pointer font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors">
                {menu.title}
              </div>
              <ul className="absolute left-0 top-full bg-white shadow-xl rounded-lg border border-gray-200 min-w-[150px] py-2 z-10 hidden group-hover:block">
                {menu.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Center: Logo and Organization Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span> {/* Placeholder logo */}
          </div>
          <span className="text-xl font-bold text-gray-900">MyOrg</span>
        </div>

        {/* Right: Three links and search icon */}
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-4">
            {['Zaangażuj się', 'Podpisz PAKT', 'Wesprzyj finansowo'].map((link, index) => (
              <Link
                key={index}
                href={`/${link.toLowerCase()}`}
                className="font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>
          {/* Search Icon */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
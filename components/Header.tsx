'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MenuItem {
  title: string;
  links: string[];
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menus: MenuItem[] = [
    { title: 'O NAS', links: ['Nasza Misja', 'Nasz Wpływ', 'Nasza Historia', 'Nasz Zespół'] },
    { title: 'DEFINICJA PROBLEMU', links: ['Sytuacja', 'Rozwiązanie', 'Dane'] },
    // { title: 'Materiały', links: ['Dla rodziców', 'Dla nauczycieli'] }
  ];

  const rightLinks = ['CO MOGĘ ZROBIĆ?', 'CZYM JEST PAKT?'];

  const slugify = (text: string): string => {
    const polishMap: { [key: string]: string } = {
      'ą': 'a', 'Ą': 'a',
      'ć': 'c', 'Ć': 'c',
      'ę': 'e', 'Ę': 'e',
      'ł': 'l', 'Ł': 'l',
      'ń': 'n', 'Ń': 'n',
      'ó': 'o', 'Ó': 'o',
      'ś': 's', 'Ś': 's',
      'ź': 'z', 'Ź': 'z',
      'ż': 'z', 'Ż': 'z',
    };

    return text
      .split('')
      .map(char => polishMap[char] || char)
      .join('')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  return (
    <header className="fixed top-4 left-[4%] right-[4%] bg-(--background) shadow-lg z-50 rounded-3xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6 py-2 mx-auto">
        {/* Left: Hamburger for mobile + Desktop menus */}
        <div className="justify-self-start flex items-center">
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
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
          <nav className="hidden md:flex items-center space-x-2 md:space-x-4 lg:space-x-6">
            {menus.map((menu, index) => (
              <div key={index} className="group relative">
                <div className="cursor-pointer font-menu font-bold text-[clamp(0.75rem,1.5vw,1rem)] text-gray-700 hover:text-gray-900 px-2 md:px-3 py-2 rounded-lg transition-colors">
                  {menu.title}
                </div>
                <ul className="font-menu font-bold absolute left-0 top-full bg-white shadow-xl rounded-lg border border-gray-200 min-w-[150px] py-2 z-10 hidden group-hover:block">
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={`/${slugify(link)}`}
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
        </div>

        {/* Center: Logo and Organization Name */}
        <div className="flex flex-row justify-center items-center space-x-2 md:space-x-3">
          <Image src="/images/logo1.png" alt="" width={70} height={70} />
          <div className="flex flex-col justify-center items-left">
            <p className="text-lg md:text-3xl font-title">DZIECIŃSTWO</p>
            <p className="text-lg md:text-3xl font-title">BEZ SMARTFONA</p>
          </div>
        </div>

        {/* Right: Desktop links + Search icon */}
        <div className="justify-self-end flex items-center space-x-2 md:space-x-4">
          <nav className="hidden md:flex space-x-2 md:space-x-4">
            {rightLinks.map((link, index) => (
              <Link
                key={index}
                href={`/${slugify(link)}`}
                className="font-menu font-bold text-[clamp(0.75rem,1.5vw,1rem)] text-gray-700 hover:text-gray-900 px-2 md:px-3 py-2 rounded-lg transition-colors"
              >
                {link}
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
        <div className="md:hidden bg-white shadow-xl border-t border-gray-200 px-4 md:px-6 py-4">
          {menus.map((menu, index) => (
            <div key={index} className="mb-4">
              <div className="font-menu text-gray-900 py-2">{menu.title}</div>
              <ul className="space-y-2">
                {menu.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={`/${slugify(link)}`}
                      className="block text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
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
                href={`/${slugify(link)}`}
                className="block font-menu text-gray-700 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
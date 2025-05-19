
import { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from '../Component/DarkModeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-gray-300 dark:text-black p-4 flex items-center justify-between dark:bg-[#70BDC2] relative">
     
      <div className="md:hidden order-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none text-2xl"
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      
      <h1 className="font-bold text-xl order-2 mx-auto md:mx-0 md:order-1">Weather App</h1>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6 order-2">
        <li className="transition-transform transform hover:scale-110 duration-300">
          <Link href="/">Home</Link>
        </li>
        <li className="transition-transform transform hover:scale-110 duration-300">
          <Link href="/history">Search History</Link>
        </li>
        <li className="transition-transform transform hover:scale-110 duration-300">
          <Link href="/details">Weather Details</Link>
        </li>
        <li className="transition-transform transform hover:scale-110 duration-300">
          <Link href="/about">About</Link>
        </li>
      </ul>

      
      <div className="hidden md:block order-3">
        <DarkModeToggle />
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-56 bg-gray-700 dark:bg-[#70BDC2] text-gray-300 dark:text-black flex flex-col items-center py-4 md:hidden z-10">
          <Link href="/" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/history" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Search History</Link>
          <Link href="/details" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>Weather Details</Link>
          <Link href="/about" className="py-2 hover:text-white" onClick={() => setIsOpen(false)}>About</Link>
          <div className="mt-4">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

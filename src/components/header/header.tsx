"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0f172a] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      
      <Link href="/" className="flex items-center gap-3 hover:opacity-90">
        <Image
          src="/furby.png"
          alt="Furby"
          width={48}
          height={48}
          className="object-cover"
          priority
        />
        <h1 className="text-2xl font-bold tracking-wide">Furbys Movies</h1>
      </Link>

     
      <button
        className="block sm:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

     
      <nav className="hidden sm:flex space-x-6 text-lg">
        <Link href="/popular" className="hover:text-yellow-400 transition-colors">Popular Movies</Link>
        <Link href="/top-rated" className="hover:text-yellow-400 transition-colors">Top Rated</Link>
        <Link href="/now-playing" className="hover:text-yellow-400 transition-colors">Now Playing</Link>
        <Link
          href="/favorites"
          className="bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-lg font-semibold text-white text-sm flex items-center gap-2 transition-all shadow-md"
        >
          <span>⭐ Favoritos</span>
        </Link>
      </nav>

      
      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#0f172a] flex flex-col items-start px-6 py-4 space-y-4 sm:hidden shadow-lg z-50">
          <Link href="/popular" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Popular Movies</Link>
          <Link href="/top-rated" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Top Rated</Link>
          <Link href="/now-playing" className="hover:text-yellow-400" onClick={() => setMenuOpen(false)}>Now Playing</Link>
          <Link
            href="/favorites"
            className="bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-lg font-semibold text-white text-sm flex items-center gap-2 transition-all shadow-md"
            onClick={() => setMenuOpen(false)}
          >
            <span>⭐ Favoritos</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

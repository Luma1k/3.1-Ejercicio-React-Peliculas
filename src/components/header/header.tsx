import Image from "next/image";
import Link from "next/link";

const Header = () => {
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

     
      <nav className="flex space-x-6 text-lg">
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
    </header>
  );
};

export default Header;

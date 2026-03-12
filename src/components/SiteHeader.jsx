import { Link } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
        <Link
          to="/"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xs"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">rayflics</p>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur md:flex">
          <Link
            to="/archive"
            className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white hover:text-black"
          >
            Archive
          </Link>
          <Link
            to="/subject/friends"
            className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white hover:text-black"
          >
            Friends
          </Link>
          <Link
            to="/subject/streets"
            className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white hover:text-black"
          >
            Streets
          </Link>
          <Link
            to="/subject/portraits"
            className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white hover:text-black"
          >
            Portraits
          </Link>
        </nav>
      </div>
    </header>
  );
}
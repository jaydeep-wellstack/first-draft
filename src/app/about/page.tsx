import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-white px-6">
      <div className="max-w-xl text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-heading mb-6">
          About me
        </h1>
        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-8">
          This page is currently under construction. Stay tuned for a deeper dive into my design philosophy and creative journey.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-sm uppercase font-medium"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

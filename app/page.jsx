import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <h1 className="text-sm font-medium tracking-widest uppercase text-gray-500">
        Ironwood Atelier
      </h1>
      <h2 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 max-w-3xl leading-tight">
        Timeless Leather Essentials, Redefined.
      </h2>
      <p className="text-lg text-gray-600 max-w-xl font-light">
        Premium full-grain leather belts crafted for durability and minimal design.
      </p>
      <Link
        href="/products"
        className="inline-block px-8 py-3 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors rounded-sm"
      >
        Explore Belts
      </Link>
    </div>
  );
}

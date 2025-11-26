'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const { openCart, lines } = useCartStore();
  const cartCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="text-lg font-medium tracking-tight text-black hover:opacity-80 transition-opacity">
          Ironwood Atelier
        </Link>

        {/* Right: Navigation & Cart */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-black transition-colors">
              Products
            </Link>
            <Link href="/blog" className="hover:text-black transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-black transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="text-sm font-medium text-black hover:opacity-70 transition-opacity"
          >
            Cart ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
}

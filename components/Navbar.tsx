import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span>Beyond UI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              About us
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              Features
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-gray-600"
            >
              Blog
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              Contact us
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-gray-600">
              Demo
            </Link>
          </nav>

          <Button className="bg-black hover:bg-gray-900 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

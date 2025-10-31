"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = "/";

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span>Beyond UI</span>
          </Link>

          <div className="relative hidden sm:block">
            <Input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <div key={label}>
                {href ? (
                  <Link
                    href={href}
                    className="text-sm font-medium hover:text-gray-600"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {label}
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div className="flex gap-2">
            <Button variant="outline">Demo</Button>
            <Button variant="default">Get Started</Button>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none z-50"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="absolute right-4 top-16 bg-white/90 rounded-2xl shadow-2xl p-6 w-72 border border-gray-100 backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="block md:hidden w-full mb-4">
              <Input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map(({ label, href }) => (
                <li key={label} className="w-full">
                  {href ? (
                    <Link
                      href={href}
                      className={`text-base font-medium px-3 py-2 rounded-xl w-full text-center transition-all duration-200 ${
                        pathname === href
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  ) : (
                    <span className="text-base font-medium px-3 py-2 rounded-xl w-full text-center text-gray-700">
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-4 mt-6 w-full">
              <Button variant="outline" className="w-full px-4 py-2">
                Demo
              </Button>
              <Button variant="default" className="w-full px-4 py-2">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import { BookOpen, Github, Menu, Wallet, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../CitePay.png";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/query", label: "Query" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/publishers", label: "Publishers" },
  { href: "/docs", label: "Docs" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-sky-200 bg-white/90 px-4 py-3 shadow-[0_18px_60px_rgba(6,19,31,0.10)] backdrop-blur-xl">
        <Link className="flex items-center gap-3" href="/" onClick={() => setIsOpen(false)}>
          <span className="relative h-10 w-32 overflow-hidden rounded-full bg-sky-50 px-3 py-1 shadow-sm ring-1 ring-sky-100">
            <Image alt="CitePay" className="object-contain" fill priority src={logo} sizes="128px" />
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-slate-700 transition hover:scale-[1.02] hover:bg-sky-50"
            href="https://github.com/thetruesammyjay"
            target="_blank"
          >
            <Github className="size-4" />
            GitHub
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 text-sm font-bold text-sky-700 transition hover:scale-[1.02] hover:bg-sky-100"
            href="/docs"
          >
            <BookOpen className="size-4" />
            Docs
          </Link>
          <Button className="shadow-none">
            <Wallet className="size-4" />
            Connect
          </Button>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100 md:hidden"
          type="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-[4.75rem] rounded-2xl border border-sky-200 bg-white p-3 shadow-[0_18px_60px_rgba(6,19,31,0.10)] backdrop-blur-xl md:hidden">
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              href="https://github.com/thetruesammyjay"
              target="_blank"
              onClick={() => setIsOpen(false)}
            >
              GitHub
            </Link>
            <button
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 text-sm font-bold text-white shadow-[0_16px_30px_rgba(24,168,255,0.25)]"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Wallet className="size-4" />
              Connect Wallet
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

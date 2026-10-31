"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site, waLink } from "@/data/site";
import { OpenNowBadge } from "./OpenNowBadge";
import { CartButton } from "./CartButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Our Story" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/reserve", label: "Reserve" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <OpenNowBadge className="hidden lg:inline-flex" />
          <CartButton />
          <a
            href={waLink("Hi! I'd like to place an order.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Order on WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full border-b border-border bg-background md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center text-lg text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="py-3">
              <OpenNowBadge />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
import Link from "next/link";
import { site, waLink } from "@/data/site";

const social =
  "inline-flex h-11 items-center text-sm transition-colors hover:text-accent-ink";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#14110f] text-foreground [--accent-ink:#e8a33d] [--border:rgba(245,237,224,0.12)] [--foreground:#f5ede0] [--muted:#b8ab98]">
      <div className="border-b border-border px-4 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">
          Follow along
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-8">
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={social}
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={social}
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a href={site.phoneHref} className={social}>
              Call us
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <div className="text-sm text-muted">
          <p className="font-semibold text-foreground">Visit us</p>
          <p className="mt-3">{site.address}</p>
          <p className="mt-2">
            <a href={site.phoneHref} className="hover:text-foreground">
              {site.phone}
            </a>
          </p>
        </div>

        <div className="text-sm text-muted">
          <p className="font-semibold text-foreground">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/menu" className="hover:text-foreground">Menu</Link></li>
            <li><Link href="/reserve" className="hover:text-foreground">Reserve a table</Link></li>
            <li><Link href="/#gallery" className="hover:text-foreground">Gallery</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted">
        <p>
          Concept project. All names, dishes, prices and reviews are sample
          content. Food photos from Unsplash and Pexels.
        </p>
        <p className="mt-1">© 2026 {site.name} (demo)</p>
      </div>
    </footer>
  );
}
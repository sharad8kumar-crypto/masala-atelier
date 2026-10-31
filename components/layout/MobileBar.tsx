import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site, waLink } from "@/data/site";

const base =
  "flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium text-foreground";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex">
        <a href={site.phoneHref} className={base}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <a
          href={waLink("Hi! I'd like to place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-accent text-on-accent`}
        >
          <MessageCircle size={18} aria-hidden="true" />
          Order
        </a>
        <Link href="/reserve" className={base}>
          <CalendarCheck size={18} aria-hidden="true" />
          Reserve
        </Link>
      </div>
    </div>
  );
}
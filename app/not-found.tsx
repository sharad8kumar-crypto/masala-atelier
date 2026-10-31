import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="font-script text-8xl text-gold">Oops</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold uppercase tracking-[0.15em] sm:text-5xl">
        Not on the menu
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-semibold text-on-accent"
        >
          Back to home
        </Link>
        <Link
          href="/menu"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 font-semibold"
        >
          View the menu
        </Link>
      </div>
    </section>
  );
}
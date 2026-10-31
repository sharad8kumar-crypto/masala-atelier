import { SafeImage as Image } from "@/components/ui/SafeImage";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function InstagramStrip() {
  return (
    <section
      className="px-4 pb-20 pt-4 sm:px-6"
      aria-labelledby="insta-heading"
    >
      <div className="mx-auto max-w-7xl">
        <ScriptHeading
          script="Moments"
          title="On Instagram"
          id="insta-heading"
          align="center"
        />

        <ul className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {gallery.slice(0, 6).map((item) => (
            <li key={item.src}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open Instagram: ${item.alt}`}
                className="group relative block aspect-square overflow-hidden bg-surface"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 16vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/30" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-muted">
          Sample photos for this concept project.
        </p>
      </div>
    </section>
  );
}
import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://masala-atelier.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/reserve"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Signature } from "@/components/sections/Signature";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Story } from "@/components/sections/Story";
import { ChefSpecial } from "@/components/sections/ChefSpecial";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Signature />
      <MenuPreview />
      <Story />
      <ChefSpecial />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
    </>
  );
}
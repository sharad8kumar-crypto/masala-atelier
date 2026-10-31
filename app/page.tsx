import { HeroBanner } from "@/components/sections/HeroBanner";
import { Marquee } from "@/components/sections/Marquee";
import { Signature } from "@/components/sections/Signature";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Discover } from "@/components/sections/Discover";
import { Story } from "@/components/sections/Story";
import { ChefSpecial } from "@/components/sections/ChefSpecial";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";
import { InstagramStrip } from "@/components/sections/InstagramStrip";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Marquee />
      <Signature />
      <MenuPreview />
      <Discover />
      <Story />
      <ChefSpecial />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <InstagramStrip />
    </>
  );
}
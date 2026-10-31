"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export function SafeImage({
  fallbackLabel,
  alt,
  ...props
}: ImageProps & { fallbackLabel?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/30 via-surface to-chili/15 p-3 text-center"
      >
        <span
          aria-hidden="true"
          className="font-script text-3xl leading-tight text-gold/80 sm:text-4xl"
        >
          {fallbackLabel ?? alt}
        </span>
      </div>
    );
  }

  return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
}
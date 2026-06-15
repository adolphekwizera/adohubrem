"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  sizes,
  priority,
}: Props) {
  const [useNative, setUseNative] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  if (!imgSrc) return null;

  return useNative ? (
    // native <img> fallback
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc("/images/blog-fallback.webp")}
      loading={priority ? "eager" : "lazy"}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setUseNative(true)}
    />
  );
}

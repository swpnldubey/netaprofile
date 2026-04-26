"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  name: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
};

export default function PoliticianPhoto({ src, name, className, fill, priority }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-slate-200 ${className ?? ""}`}>
        <span className="text-slate-500 font-bold text-2xl">{name[0]}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill={fill}
      className={`object-cover ${className ?? ""}`}
      priority={priority}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}

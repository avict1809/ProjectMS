"use client";

import { Wrench, Hourglass } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 grow">
      <Wrench size={80} className="text-white animate-spin-slow" />
      <h1 className="text-4xl font-bold text-white mt-6">
        This Feature is Under Construction
      </h1>
      <p className="text-lg text-white mt-2">
        We’re making some improvements. Check back soon.
      </p>
      <Hourglass size={40} className="text-white mt-4 animate-pulse" />
    </div>
  );
}

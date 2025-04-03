"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "@/styles/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loading animation
    NProgress.start();
    setLoading(true);

    // Simulate a delay for smooth effect
    const timer = setTimeout(() => {
      NProgress.done();
      setLoading(false);
    }, 0); // Adjust delay if needed

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null; // No visible component, just triggers the effect
  console.log(loading);
};

export default ProgressBar;

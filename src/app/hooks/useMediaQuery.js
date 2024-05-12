"use client";
import { useLayoutEffect, useState } from "react";

const useMediaQuery = () => {
  const [isDownLargeScrean, setIsDownLargeScrean] = useState(false);

  useLayoutEffect(() => {
    function handleResize() {
      setIsDownLargeScrean(window.innerWidth < 1024); // Adjust the breakpoint as needed
    }

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return isDownLargeScrean;
};

export default useMediaQuery;
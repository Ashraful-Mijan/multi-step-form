"use client";
import Image from "next/image";
import bgsidebar from "../../../public/images/bg-sidebar-desktop.svg";
import mobileBgSidebar from "../../../public/images/bg-sidebar-mobile.svg";
import useMediaQuery from "../hooks/useMediaQuery";
const BackgroundImage = () => {
  const isDownLargeScrean = useMediaQuery();
  return (
    <Image
      src={isDownLargeScrean ? mobileBgSidebar : bgsidebar}
      alt="bg-sidebar"
      fill
      sizes="100vw"
      className="object-cover lg:rounded-e-lg -z-10"
      priority
    />
  );
};

export default BackgroundImage;

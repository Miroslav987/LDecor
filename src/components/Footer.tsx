"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-[120px]">
      <nav className="bg-white shadow-[0_-4px_6px_-1px_#0000001a] mt-[120px] mb-[84px] md:mb-0 hidden md:block">
        <div className="w-full h-[142px] flex items-center justify-between container snap-y">
          <div>
                <Image
                  src="/logo.svg"
                  className="filter brightness-75 contrast-200"
                  width={154}
                  height={54}
                  priority
                  alt="logo"
                />
          </div>
          <div className="flex gap-[20px] text-black font-medium text-[20px]">
                <Link target="_blank" href={"https://wa.me/+996704138085"}>+996(704)-13-80-85</Link>
                <Link target="_blank" href={"https://wa.me/+996509115993"}>+996(509)-11-59-93</Link>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

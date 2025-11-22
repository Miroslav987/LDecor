"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="md:mt-[120px] ">
      <nav className="bg-white py-[40px] md:py-0 px-[20px] md:px-0 shadow-[0_-4px_6px_-1px_#0000001a]  md:mb-[84px] md:mb-0 ">
        <div className="w-full md:h-[142px] flex items-center justify-between container snap-y">
          <div>
                <Image
                  src="/logo.svg"
                  className="filter brightness-75 contrast-200 hidden md:block"
                  width={154}
                  height={54}
                  priority
                  alt="logo" 
                />
                <Image
                  src="/logo.svg"
                  className="filter brightness-75 contrast-200 block md:hidden"
                  width={120}
                  height={40}
                  priority
                  alt="logo" 
                />
          </div>
              <div className="flex flex-col text-black font-medium text-[14px] md:text-[18px]">
                <Link target="_blank" href="https://wa.me/+996704138085">+996(704)-13-80-85</Link>
                <Link target="_blank" href="https://wa.me/+996509115993">+996(509)-11-59-93</Link>
              </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

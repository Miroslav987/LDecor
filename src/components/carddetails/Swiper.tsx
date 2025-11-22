import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function CardSwiper({ images }: any) {
  const swiperRef = useRef<any | null>(null);
const [isLoading, setIsLoading] = useState(false);


  const [preview, setPreview] = useState<string | null>(null);

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <>
      <div className=" md:w-[50%]">
        <div className="relative">
          <Swiper
            loop={true}
            className="w-[100%]"
            spaceBetween={50}
            slidesPerView={1}
            ref={swiperRef}
          >
            {images.map((e: string, i: number) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <Image
                  src={e}
                  width={346}
                  height={280}
                  alt={e}
                  className="rounded-xl  m-auto object-cover h-[280px] cursor-pointer"
                  onClick={() => {
  setIsLoading(true);
  setPreview(e);
}}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {images.length > 1 && (
            <div className="absolute top-[50%] inset-x-[10px] flex z-[2] justify-between  pointer-events-none">
              <button
                className="pointer-events-auto p-[10px] rounded-full"
                onClick={handlePrev}
              >
                <svg
                  className="rotate-90"
                  width="20"
                  height="20"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className=" pointer-events-auto p-[10px] rounded-full"
                onClick={handleNext}
              >
                <svg
                  className="rotate-[-90deg]"
                  width="20"
                  height="20"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>


{preview && (
  <div
    className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
    onClick={() => setPreview(null)}
  >

    {isLoading && (
      <div className="absolute flex items-center justify-center inset-0">
        <div className="w-12 h-12 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
      </div>
    )}

    <div className="relative max-w-[90vw] max-h-[90vh]">
      <Image
        src={preview}
        alt="preview"
        width={1000}
        height={1000}
        className={`object-contain rounded-xl max-h-[90vh] w-auto transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />

  
      <button
        onClick={() => setPreview(null)}
        className="absolute rounded-tr-lg rounded-bl-lg top-0 right-0 text-white text-3xl"
      >
        ✕
      </button>
    </div>
  </div>
)}
    </>
  );
}

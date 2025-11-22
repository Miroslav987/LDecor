import { useBasket } from "@/lib/features/basket/BasketServer";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CardBasket({ product }: any) {
  const { DeleteBasketProduct, PlusQuanty, MinusQuanty } = useBasket();

  return (
    <div className="relative  p-[10px] md:p-[15px] gap-[16px] z-0 w-full md:w-[218px] shadow-[0_0_10px_0_#00000014]">
      <button
        type="button"
        onClick={() => DeleteBasketProduct(product.id)}
        className="shadow-[3px_3px_10px_0_#0000004D] absolute top-0 left-0 
                   flex justify-center items-center bg-grey_first 
                   rounded-tl-lg rounded-br-lg w-[36px] h-[32px] p-[5px] 
                   hover:invert-[100%]"
      >
        <svg
          className="m-auto"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 1.5H11.5M1.5 4H16.5M14.8333 4L14.2489 12.7661C14.1612 14.0813 14.1174 14.7389 13.8333 15.2375C13.5833 15.6765 13.206 16.0294 12.7514 16.2497C12.235 16.5 11.5759 16.5 10.2578 16.5H7.74221C6.42409 16.5 5.76503 16.5 5.24861 16.2497C4.79396 16.0294 4.41674 15.6765 4.16665 15.2375C3.88259 14.7389 3.83875 14.0813 3.75107 12.7661L3.16667 4"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex gap-[16px] flex-row md:flex-col">
        <div className=" w-full flex items-center justify-center rounded-[10px]  ">
          <Image
            src={product.img}
            width={210}
            height={170}
            alt={product.img}
            className=" hidden md:block object-cover h-[114px] md:h-[120px] rounded-[13px] "
          />
          <Image
            src={product.img}
            width={146}
            height={114}
            alt={product.img}
            className=" object-cover h-[114px] md:h-[120px] rounded-[13px] block md:hidden "
          />
        </div>
        <div>
        <div className="">
          <p className="text-[16px] md:text-[20px]  font-medium">{product.name}</p>
          <p className="py-[10px] md:py-[15px] font-[Montserrat] text-[14px] md:text-[20px] font-bold">
            {+product.price * +product.quantity} сом
          </p>
        </div>
        <div>
              <p className="text-grey_second text-sm pb-[6px]  md:pt-0">Количество:</p>
      <div className="w-full flex gap-[10px] items-center">
        <div className="w-full flex justify-between items-center gap-[10px] md:gap-[15.5px]">
          <button
            type="button"
            onClick={() => MinusQuanty(product.id)}
            className=" h-[34px] px-[11px] text-[#ffffff] border rounded-[10px] flex items-center justify-center  hover:border-black"
          >
            <span className=" pb-[7px]  font-sans text-3xl">-</span>
          </button>
          <div className="w-full  flex items-center justify-center border rounded-[10px] border-black">
            <div className="relative w-full">
              <input
                type="number"
                maxLength={2}
                value={product.quantity}
                onChange={() => 0}
                className="w-full h-[39px] rounded-[10px] text-center outline-none p-0 pr-5"
              />
              <span className="absolute text-sm right-5  font-medium top-1/2 -translate-y-1/2 ">
                шт
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => PlusQuanty(product.id)}
            className=" h-[34px] px-[11px] text-[#ffffff] border rounded-[10px] flex items-center justify-center  hover:border-black"
          >
            <span className=" pb-[7px] font-sans text-3xl">+</span>
          </button>
        </div></div>
      </div></div>
      </div>

    </div>
  );
}

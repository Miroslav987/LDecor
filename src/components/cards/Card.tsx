import { useModal } from "@/context/ModalProvider";
import { useBasket } from "@/lib/features/basket/BasketServer";
import Image from "next/image";
import React from "react";
import DetailCard from "./DetailCard";

export default function Card({ product }: any) {
  const { openModal } = useModal();
  const { AddBasketProduct } = useBasket();

  const handleOpenModal = () => {
    openModal(<DetailCard product={product} />);
  };

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault();

    AddBasketProduct({
      name: product.title,
      img: product.imgs?.[0] ?? "",
      price: product.price,
      id: product.id,
      quantity: 1,
    });
  };

  const image = product?.imgs?.[0];
console.log(image);

  return (
    <div
      onClick={handleOpenModal}
      className="relative flex gap-[10px] md:gap-0 items-center md:items-start md:flex-col justify-start 
                 w-full md:h-[277px] p-[15px] rounded-[10px] bg-white 
                 shadow-[0_0_10px_0_#00000014] cursor-pointer"
    >

      <button
        type="button"
        onClick={handleAddToBasket}
        className="shadow-[3px_3px_10px_0_#0000004D] absolute top-0 left-0 
                   flex justify-center items-center bg-grey_first 
                   rounded-tl-lg rounded-br-lg w-[36px] h-[32px] p-[5px] 
                   hover:invert-[100%]"
      >
        <svg width="15" height="15" viewBox="0 0 28 28" fill="none">
          <path
            d="M1.25 1.25H1.63016C2.30134 1.25 2.63753 1.25 2.91128 1.37109C3.15264 1.47786 3.359 1.64975 3.50781 1.86772C3.67632 2.11453 3.73716 2.4441 3.85861 3.10197L6.91672 19.6667L21.6809 19.6667C22.3229 19.6667 22.6449 19.6667 22.9109 19.5532C23.1458 19.453 23.3484 19.2907 23.4989 19.0843C23.669 18.851 23.7411 18.5386 23.8851 17.9144L26.1093 8.27661C26.3283 7.32772 26.4378 6.85314 26.3175 6.48088C26.212 6.15425 25.99 5.87732 25.6954 5.70105C25.3595 5.5 24.874 5.5 23.9007 5.5H4.79167M22.5 26.75C21.7176 26.75 21.0833 26.1157 21.0833 25.3333C21.0833 24.5509 21.7176 23.9167 22.5 23.9167C23.2824 23.9167 23.9167 24.5509 23.9167 25.3333C23.9167 26.1157 23.2824 26.75 22.5 26.75ZM8.33333 26.75C7.55093 26.75 6.91667 26.1157 6.91667 25.3333C6.91667 24.5509 7.55093 23.9167 8.33333 23.9167C9.11574 23.9167 9.75 24.5509 9.75 25.3333C9.75 26.1157 9.11574 26.75 8.33333 26.75Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>


      {image && (
        <div className="min-w-[210px] md:w-full flex rounded-xl  justify-start">
          <Image
            src={image}
            width={210}
            height={170}
            className="object-cover h-[170px] rounded-xl"
            alt={product.name}
            priority
          />
        </div>
      )}


      <div className="text-black">
        <h3 className="text-[20px] font-medium">{product?.title}</h3>
        <p className="text-[20px] font-[Montserrat] font-bold">{product?.price} сом</p>
      </div>
    </div>
  );
}

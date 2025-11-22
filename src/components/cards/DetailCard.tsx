"use client";

import { FC, useEffect, useState } from "react";
import { useModal } from "@/context/ModalProvider";
import CardSwiper from "../carddetails/Swiper";
import { ProductType } from "@/app/page";
import { useBasket } from "@/lib/features/basket/BasketServer";
import { useAppSelector } from "@/lib/hooks";
import MakingOrdering from "../modals/basket/MakingOrdering";

export type DetailCardProps = {
  product: ProductType;
};

const DetailCard: FC<DetailCardProps> = ({ product }) => {
  const { closeModal, openModal } = useModal();
  const { basket } = useAppSelector((state) => state.basket);
  const { AddBasketProduct } = useBasket();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const exists = basket.products.some((p: any) => p.id === product.id);
    setAdded(exists);
  }, [basket.products, product.id]);

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!added) {
      AddBasketProduct({
        name: product.title,
        img: product.imgs?.[0] ?? "",
        price: product.price,
        id: product.id,
        quantity: 1,
      });
      setAdded(true);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openModal(<MakingOrdering singleProduct={product} />);
  };

  return (
    <>
      {product?.imgs?.[0] ? (
        <div className="relative w-[80%] h-[80%] rounded-[10px] bg-white p-[30px] shadow-[0_0_10px_0_#00000014]">
          <button
            onClick={closeModal}
            className="absolute p-0 right-[10px] top-[0px] rotate-45 text-grey_second text-4xl bg-white"
          >
            +
          </button>

          <div className="flex flex-col md:flex-row md:justify-between gap-[30px]">
            <CardSwiper images={product.imgs} />

            <div className="w-full flex flex-col justify-between">
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[20px] font-medium text-black">
                  {product.title}
                </h2>
                <p className="text-[20px] font-[Montserrat] font-bold text-black">
                  {product.price} сом
                </p>
              </div>

              <div className="w-full md:w-[245px] flex flex-col gap-[15px]">
                <button
                  className={`flex gap-[10px] items-center justify-center rounded-[10px] ${
                    added ? "bg-green-500 text-white" : " "
                  }`}
                  onClick={handleAddToBasket}
                >
                  {added ? "Добавлено" : "В корзину"}
                </button>

                <button
                  className="rounded-[10px] bg-yellow-500 "
                  onClick={handleBuyNow}
                >
                  Купить сейчас
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailCard;

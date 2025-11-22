"use client"
import CardBasket from "@/components/cards/CardBasket";
import ConfirmClearBasket from "@/components/modals/basket/ConfirmClearBasket";
import MakingOrdering from "@/components/modals/basket/MakingOrdering";
import { useModal } from "@/context/ModalProvider";
import { useBasket } from "@/lib/features/basket/BasketServer";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";


export default function Basket() {
  const [client, setClient] = useState(false);
  const { openModal } = useModal()
  const { AllPriceProducts } = useBasket()
  const { basket } = useAppSelector(state => state.basket)
  let totalPrice:any =0
  
  if (basket.total_quantity) {
    
    const productsPrice = basket.products.map((e: any) =>
      +e.quantity * +e.price
    )
    totalPrice = productsPrice.reduce((acc: any, number: any) => acc + number)
  }
  useEffect(()=>{
    AllPriceProducts(totalPrice)
    console.log(basket);
    
  },[totalPrice])

  useEffect(()=>{
    setClient(true)
  },[])

  if (!client) {
    return null;
  }
  console.log(basket);
  

  return (

    <>
      {basket.total_quantity? (
        <div>

          <div className="flex justify-end">
            <button
              onClick={() => openModal(<ConfirmClearBasket />)}
              className="w-full p-0 text-lg h-[36px] rounded-[10px] flex justify-center items-center gap-[10px] bg-grey_first shadow-[0_0_4px_0_#00000029] md:w-[202px]">
              <svg
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
              Очистить корзину
            </button>
          </div>
          <div className="flex mt-[40px] mb-[45px] flex-wrap  gap-[54px] ">
            {basket.products.map((e: any) => (
              <div key={e.extraId}>
              <CardBasket key={e.extraId} product={e} />
              </div>
            ))}
          </div>
          <div className="w-full h-[4px] bg-grey_third rounded-[4px] "></div>

          <div className=" flex flex-col gap-[47.5px] items-start md:flex-row md:items-end">
            <div className=" w-[340px]  flex gap-[10px] flex-col pt-[45px]">
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Доставка</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className=" whitespace-nowrap">Бесплатно</p>
              </div>
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Количество товаров</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className=" whitespace-nowrap">{basket.total_quantity}шт.</p>
              </div>
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Итого</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className="whitespace-nowrap">
                  {basket.price} сом
                </p>
              </div>
            </div>


            {/* <div className=" h-[60px] rounded-[10px] bg-grey_first flex items-center ">
              <p className="px-[25px]">G7P4K2ZQ</p>
              <button className=" h-[100%] rounded-[10px]  px-[25px] bg-black text-white ">
                Использовать
              </button>
              <button className=" h-[100%] rounded-[10px]  px-[25] bg-green_first text-white ">
                Подтвержден
              </button>
            </div> */}

              
            <button onClick={() => openModal(<MakingOrdering/>)}  className="w-full rounded-[10px] h-[60px] text-white ">
              Продолжить
            </button>

          </div>
        </div>
      ) : (
        <div >

          <div className="h-[50vh] flex flex-col justify-center items-center ">
            <svg width="83" height="83" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 36C36 36 32.625 31.5 27 31.5C21.375 31.5 18 36 18 36M33.75 20.25H33.7725M20.25 20.25H20.2725M49.5 27C49.5 39.4264 39.4264 49.5 27 49.5C14.5736 49.5 4.5 39.4264 4.5 27C4.5 14.5736 14.5736 4.5 27 4.5C39.4264 4.5 49.5 14.5736 49.5 27ZM34.875 20.25C34.875 20.8713 34.3713 21.375 33.75 21.375C33.1287 21.375 32.625 20.8713 32.625 20.25C32.625 19.6287 33.1287 19.125 33.75 19.125C34.3713 19.125 34.875 19.6287 34.875 20.25ZM21.375 20.25C21.375 20.8713 20.8713 21.375 20.25 21.375C19.6287 21.375 19.125 20.8713 19.125 20.25C19.125 19.6287 19.6287 19.125 20.25 19.125C20.8713 19.125 21.375 19.6287 21.375 20.25Z" stroke="#1E2128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[32px]">Корзина пуста</p>
          </div>
          <div className="w-full h-[4px] bg-grey_third rounded-[4px]  opacity-[0.5] hidden md:block"></div>
          <div className="h-40 hidden gap-[47.5px] items-end opacity-[0.5] md:flex">
            <div className=" w-[340px]  flex gap-[10px] flex-col pt-[45px]">
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Доставка</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className=" whitespace-nowrap">Бесплатно</p>
              </div>
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Количество товаров</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className=" whitespace-nowrap">0шт.</p>
              </div>
              <div className=" w-full flex items-center gap-[8px]">
                <p className="whitespace-nowrap">Итого</p>
                <p className=" text-black overflow-hidden whitespace-nowrap tracking-[5px]">
                  ...............................
                </p>
                <p className=" whitespace-nowrap">
                  0 сом
                </p>
              </div>
            </div>
            <button className="mr-[32px] w-full rounded-[10px] h-[61px] text-white ">
              Продолжить
            </button>
          </div>
        </div>
      )}
    </>
  );
}

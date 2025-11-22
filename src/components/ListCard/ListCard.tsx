"use client";

import { FC } from "react";
import CardLoad from "../cards/CardLoad";
import Card from "../cards/Card";
import { ProductListType } from "@/app/page";

export type ListCardProps = {
  productList: ProductListType;
};

const ListCard: FC<ListCardProps> = ({ productList }) => {
  return (
    <div className="mt-[40px]">
      <h2 className="text-[25px] font-medium text-[#8C8C8C]">{productList.name}</h2>
      <div className="w-full mt-[20px] grid gap-5 md:gap-[80px] md:px-[20px] xl:px-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {productList.products.length > 0
          ? productList.products.map((e: any, index: number) => (
              <Card key={index} product={e} />
            ))
          : [1, 1, 1, 1].map((e, i) => <CardLoad key={i} />)}
      </div>
    </div>
  );
};

export default ListCard;

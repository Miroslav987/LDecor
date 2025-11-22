"use client";

import { Suspense, useEffect, useState } from "react";
import ListCard from "../components/ListCard/ListCard";

export type ProductType = {
  title: string;
  imgs: string[];
  price: number;
  id: string;
  category?: string;
};

export type ProductListType = {
  name: string;
  products: ProductType[];
};

const HomePageContent = () => {
  const [listProductList, setListProductList] = useState<ProductListType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProducts", {
          cache: "force-cache"
        });

        let data: ProductType[] = await res.json();

        const grouped: Record<string, ProductType[]> = {};

        for (const item of data) {
          const cat = item.category || "Без категории";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        }

        const firstRender: ProductListType[] = Object.keys(grouped).map(k => ({
          name: k,
          products: []
        }));

        setListProductList(firstRender);
        setLoading(false);

        const categories = Object.keys(grouped);

        categories.forEach((cat, index) => {
          setTimeout(() => {
            setListProductList(prev =>
              prev.map(list =>
                list.name === cat ? { ...list, products: grouped[cat] } : list
              )
            );
          }, index * 20); // супер быстрый stagger
        });

      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="loading p-10 text-center text-xl">
        Загрузка...
      </div>
    );

  return (
    <div className="container px-[10px] md:px-0 flex flex-col gap-[20px]">
      {listProductList.map((list, i) => (
        <div key={i} id={list.name}>
          <ListCard productList={list} />
        </div>
      ))}
    </div>
  );
};

const HomePage = () => (
  <Suspense fallback={<p className="p-10 text-center">Загрузка...</p>}>
    <HomePageContent />
  </Suspense>
);

export default HomePage;

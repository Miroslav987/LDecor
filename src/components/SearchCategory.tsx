"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import clsx from "clsx";

type ProductType = {
  id: string;
  category: string;
  // другие поля...
};

export default function SearchCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Текущая категория из URL
  const currentCategory = searchParams.get("category");
  
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/getProducts");
        const data: ProductType[] = await res.json();

        const uniqueCategories = Array.from(new Set(data.map((p) => p.category || "Без категории")));
        
        // УБРАЛИ "all". Теперь только категории из базы.
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchCategory = (category: string) => {
    // Обновляем URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`/?${params.toString()}`, { scroll: false });

    const el = document.getElementById(category);
    if (el) {
      const headerOffset = 150; 
      
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (loading || !categories.length) return null;

  return (
    <div className="my-[10px] md:my-[20px] w-full flex gap-[16px] overflow-hidden">
      <ScrollContainer 
        vertical={false} 
        className="w-full pl-[50%] md:pl-0 py-[5px] flex justify-center gap-[16px] md:py-[0px] cursor-grab active:cursor-grabbing"
      >
        {categories.map((cat, i) => {
          const isActive = currentCategory === cat;

          return (
            <button
              key={i}
              onClick={() => handleSearchCategory(cat)}
              className={clsx(
                `
                  whitespace-nowrap
                  flex justify-center items-center
                  md:py-[16px] md:px-[40px] h-[53px] rounded-[10px]
                  text-[16px] md:text-[20px] transition-all duration-200
                  shadow-[0_0_10px_0_#00000014]
                  border border-transparent
                `,
                {
                  "bg-[#773C12]": isActive,
                  "hover:border-gray-50 ": !isActive, 
                }
              )}
            >
              {cat}
            </button>
          );
        })}
      </ScrollContainer>
    </div>
  );
}
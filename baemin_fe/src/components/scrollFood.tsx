"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IItemResult } from "@/interfaces/interface";

interface Item {
  food_id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_id: number;
  additional_options: Record<string, any>;
  food_slug: string;
}

interface ScrollBarProps {
  items: {
    title: string;
    items: Item[];
  };
}

export default function ScrollBar({ items }: ScrollBarProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleNavigate = (food: any) => {
    router.push(`/detailfood/${food.food_slug}_${food.category_id}`);
  };

  const handleNext = () => {
    if (containerRef.current && currentIndex < items.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full" style={{ height: "300px" }}>
      <div
        className="w-full h-full flex flex-col px-4 pt-4 pb-2"
        style={{ height: "300px" }}
      >
        <div className="relative ml-3 text-xl font-bold mb-2">
          {items.title}
        </div>
        <div className="w-full relative h-full">
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20 w-8 h-8 rounded-full z-20"
            >
              <LeftOutlined />
            </button>
          )}
          <div
            ref={containerRef}
            className="scroll-container w-full h-full flex flex-row gap-3"
          >
            {items.items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(item)}
                className="group w-48 h-full cursor-pointer"
              >
                <div className="w-full h-2/3">
                  <div
                    className="group-hover:brightness-75"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.image_url}
                      alt={item.name}
                    />
                  </div>
                </div>
                <div className="group-hover:bg-slate-50 w-full h-1/3 flex flex-col pl-2 pr-2 border-solid border-2 border-beamin-50">
                  <div className="w-full truncate text-base">
                    <span>{item.name}</span>
                  </div>
                  <div
                    className="w-full truncate text-sm"
                    style={{ color: "#959595" }}
                  >
                    <span>{item.description}</span>
                  </div>
                  <div className="w-full text-sm border-t border-beamin-50 mt-2">
                    <span className="mt-2">Quán Ăn</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {currentIndex < items.items.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20 right-1 w-8 h-8 rounded-full z-20"
            >
              <RightOutlined />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

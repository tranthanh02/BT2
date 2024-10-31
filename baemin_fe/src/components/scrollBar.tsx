"use client";

import Image from "next/image";
import React from "react";
import { IItemScrollBar } from "../interfaces/interface";
import { Carousel } from "antd";
export default function ScrollBar({ items }: { items: IItemScrollBar[] }) {
  return (
    <>
      <Carousel arrows slidesToShow={2} autoplay autoplaySpeed={2000}>
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-1/2 bg-blue-200 p-4 cursor-pointer h-[300px] "
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={item.url}
              alt=""
            ></Image>
          </div>
        ))}
      </Carousel>
    </>
  );
}

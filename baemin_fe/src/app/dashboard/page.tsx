//import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import { foodServices } from "@/services";
import Image from "next/image";
import React from "react";

type Item = {
  id: string;
  name: string;
  address: string;
  img: string;
  kind: string;
};

export default async function DashBoard() {
  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];

  const listCategories =
    (await foodServices.getFoodCategories()).data?.content ?? [];
  console.log(listCategories);

  const listFood = (await foodServices.getAllFood()).data?.content ?? [];
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
            <span>Thực đơn </span>
            {listCategories &&
              listCategories.map((item: any) => (
                <div
                  key={item.category_id}
                  className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src={item.image_url}
                      width={30}
                      height={30}
                      alt={item.description}
                    />
                    <span>{item.category_name}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems} />
          <ScrollFood
            items={{
              title: "Hôm Nay ăn gì",
              items: listFood,
            }}
          ></ScrollFood>
        </div>
      </div>
    </>
  );
}

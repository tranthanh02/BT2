//import { ShoppingCartOutlined } from '@ant-design/icons';
import React from "react";
import TypeSelector from "./type";
import AreaSelector from "./area";
import FilterSelector from "./filter";
import ResultFood from "./result";
import { foodServices } from "@/services";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = `name=${searchParams.name}`;
  let listFood = [];

  if (
    Object.keys(searchParams).length === 0 &&
    searchParams.constructor === Object
  )
    listFood = (await foodServices.getAllFood()).data?.content ?? [];
  else {
    listFood = (await foodServices.searchFood(query)).data?.content ?? [];
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-solid">
        <div className="flex flex-row gap-3">
          <AreaSelector />
          <TypeSelector />
        </div>
        <div className="flex items-center justify-center ">
          <FilterSelector></FilterSelector>
        </div>
      </div>
      {/* <div className="my-3 flex flex-row"></div> */}
      <ResultFood items={listFood} />
    </>
  );
};
export default Page;

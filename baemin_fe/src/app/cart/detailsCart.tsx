"use client";
import Image from "next/image";
import { IDetailsCart, IItemResult } from "../../interfaces/interface";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { productsAction } from "@/lib/features/product/producSlice";
// Use the defined types

export default function DetailsCart({ Details }: { Details: any }) {
  const { carts } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  return (
    <>
      {
        <div className="w-full flex flex-col bg-white rounded-md">
          <div className="flex flex-row my-7 ml-8 items-center gap-3">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
            />
            <span className="text-base font-normal">{Details.name}</span>
            {Details.quandoitac && (
              <div className="bg-beamin p-1 rounded-md">
                <span className="text-sm font-normal text-white">
                  Quán đối tác
                </span>
              </div>
            )}
          </div>
          <div className="w-full border-t border-b border-solid border-gray-600 py-3">
            {carts &&
              carts.map((item: any) => (
                <div key={item.food_id} className={"w-full grid grid-cols-12"}>
                  <div className="pl-8 col-span-4 flex items-center flex-row gap-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800"
                    />
                    <div className="relative h-36 w-36">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={item.image_url}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-base">{item.name}</span>
                      <span className="text-sm text-gray-600">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    {item?.price} ₫
                  </div>
                  <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <input
                      type="number"
                      id="quantity"
                      className="w-16 text-center border border-gray-300 rounded"
                      defaultValue={item?.quantity}
                      onChange={(e) =>
                        dispatch(
                          productsAction.handleQuantity({
                            food: item,
                            quantity: e.target.value,
                          })
                        )
                      }
                      min="1"
                      max="100"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    {item?.price}₫
                  </div>
                  <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                    <span
                      className="hover:text-red-600 cursor-pointer"
                      onClick={() => dispatch(productsAction.deleteCart(item))}
                    >
                      Xóa
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      }
    </>
  );
}

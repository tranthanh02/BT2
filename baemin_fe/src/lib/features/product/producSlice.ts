import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: JSON.parse(localStorage.getItem("carts") as string) || [],
  totalPrice: 0,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      // @ts-ignore
      console.log(payload);

      const index = state.carts.findIndex(
        (item: any) => item.food_id === payload.food_id
      );
      console.log("index", index);

      if (index < 0) {
        // @ts-ignore
        const addQuantityProduct = { ...payload, quantity: 1 };
        state.carts.push(addQuantityProduct);
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    deleteCart: (state, { payload }) => {
      const index = state.carts.findIndex(
        (item: any) => item.food_id === payload.food_id
      );

      if (index !== -1) {
        // @ts-ignore
        state.carts.splice(index, 1);
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    deleteAllCart: (state) => {
      localStorage.removeItem("carts");
      state.carts = [];
    },
    handleQuantity: (state, { payload }) => {
      const { food, quantity } = payload;
      state.carts.forEach((item: any) => {
        if (item.food_id === food.food_id) {
          item.quantity = quantity;
        }
      });
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
  },
});

export const { actions: productsAction, reducer: productsReducer } =
  productsSlice;

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/product/producSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

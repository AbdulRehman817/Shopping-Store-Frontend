// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Assuming cartSlice is in the same folder

export const store = configureStore({
  reducer: {
    allCart: cartReducer,
  },
});

// ✅ Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

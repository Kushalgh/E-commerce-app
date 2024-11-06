import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cart-types";
import { toast } from "react-toastify";
import { act } from "react";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      console.log(state.items);
      const existingItemIndex = state.items.findIndex(
        (item) => item.id?.toString() === newItem.id?.toString()
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
        toast.success("Cart item is updated");
      } else {
        state.items.push(newItem);
        toast.success("Added a new item");
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.id?.toString() === itemIdToRemove?.toString()
      );

      if (itemToRemove) {
        if (itemToRemove.quantity && itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== itemIdToRemove
          );
          toast.error("Item was removed from cart");
        }
      }
    },

    deleteItem(state, action: PayloadAction<string>) {
      const itemIdToRemove = action.payload;

      console.log(state.items);

      if (itemIdToRemove) {
        state.items = state.items.filter(
          (item) => item.id?.toString() !== itemIdToRemove?.toString()
        );
      }
    },
  },
});

export const { addItem, removeItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalAmount =
        action.payload.totalAmount ??
        state.items.reduce(
          (total, item) =>
            total +
            (item.product?.price || item.productId?.price || 0) *
              (Number(item.quantity) || 0),
          0
        );
      state.totalQuantity = state.items.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
      );
    },
    clearCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { setCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
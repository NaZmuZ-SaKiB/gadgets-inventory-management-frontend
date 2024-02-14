import { TProduct } from "@/types/product.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TCartItem = {
  product: TProduct;
  quantity: number;
  price: number;
};

const initialState: {
  cart: TCartItem[];
} = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const isAlreadyInCart = state.cart.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (
        isAlreadyInCart &&
        isAlreadyInCart.product.quantity > isAlreadyInCart.quantity
      ) {
        const index = state.cart.indexOf(isAlreadyInCart);

        isAlreadyInCart.quantity = isAlreadyInCart.quantity + 1;

        state.cart[index] = isAlreadyInCart;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart.filter((item) => item.product._id !== action.payload);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const isAlreadyInCart = state.cart.find(
        (item) => item.product._id === action.payload
      );

      if (isAlreadyInCart && isAlreadyInCart.quantity > 1) {
        const index = state.cart.indexOf(isAlreadyInCart);

        isAlreadyInCart.quantity = isAlreadyInCart.quantity - 1;

        state.cart[index] = isAlreadyInCart;
      } else {
        state.cart.filter((item) => item.product._id !== action.payload);
      }
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

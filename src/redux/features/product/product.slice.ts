import { createSlice } from "@reduxjs/toolkit";

type TProductState = {
  filter: Record<string, unknown>;
  selected: string[];
};

const initialState: TProductState = {
  filter: {
    page: 1,
    limit: 10,
  },
  selected: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter[action.payload.field] = action.payload.value;
    },
    selectProduct: (state, action) => {
      state.selected = Array.from(new Set([...state.selected, action.payload]));
    },
    clearSelectedProducts: (state) => {
      state.selected = [];
    },
    removeSelectedProduct: (state, action) => {
      state.selected = state.selected.filter((item) => item !== action.payload);
    },
  },
});

export const {
  setFilter,
  selectProduct,
  removeSelectedProduct,
  clearSelectedProducts,
} = productSlice.actions;

export default productSlice.reducer;

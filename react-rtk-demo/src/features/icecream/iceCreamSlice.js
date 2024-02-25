import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfIcecream: 5,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    buyIceCream: (state, action) => {
      if (state.numOfIcecream >= action.payload)
        state.numOfIcecream -= action.payload;
    },
    reStockIceCream: (state, action) => {
      state.numOfIcecream += action.payload;
    },
  },
  //for a action cake/orderCake, reduce the numOfIcecream by same amount
  // extraReducers: {
  //   ["cake/orderCake"]: (state, action) => {
  //     if (state.numOfIcecream > 0 && state.numOfIcecream >= action.payload)
  //       state.numOfIcecream -= action.payload;
  //   },
  // },
});

export default iceCreamSlice.reducer;
export const { buyIceCream, reStockIceCream } = iceCreamSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
// import { buyIceCream } from "../icecream/iceCreamSlice";

const initialState = {
  numOfCakes: 10,
  numOfPestry: 5,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    orderCake: (state, action) => {
      if (state.numOfCakes >= action.payload)
        state.numOfCakes -= action.payload;
    },
    reStockCake: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(buyIceCream, (state, action) => {
  //     if (state.numOfCakes >= action.payload)
  //       state.numOfCakes -= action.payload;
  //   });
  //},
});

export default cakeSlice.reducer;
export const { orderCake, reStockCake } = cakeSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload),
        (state.error = "");
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.isLoading = false),
        (state.data = []),
        (state.error = action.error.message);
    });
  },
  reducers: {},
});

export default userSlice.reducer;
export { fetchUsers };

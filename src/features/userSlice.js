import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "krisna",
    email: "krisna@gmail.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {},
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload.data;

      //set nilai
      state.user = user;

      //ke local storage
      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state) => {
      //set nilai
      state.user = null;

      //ke local storage
      localStorage.removeItem("user");
      toast.success("Logout Beres");
    },

    registerUser: (state, action) => {
      const user = action.payload.data;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Register Beres");
    },
  },
});

export const { loginUser, logoutUser, registerUser } = userSlice.actions;
export default userSlice.reducer;

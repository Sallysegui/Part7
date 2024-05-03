import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userView",
  initialState: "",
  reducers: {
    setUserView(state, action) {
      const userView = action.payload;
      return userView;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

export const { setUserView, clearUser } = userSlice.actions;

export const userFullview = (user) => {
  return (dispatch) => {
    dispatch(setUserView(user));
  };
};

export const clearuserFullview = (user) => {
  return (dispatch) => {
    dispatch(clearUser());
  };
};
export default userSlice.reducer;

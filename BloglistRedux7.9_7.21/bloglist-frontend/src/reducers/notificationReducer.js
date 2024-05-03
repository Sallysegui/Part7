import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      const notificationValue = action.payload;
      return notificationValue;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const likeNotification = (content, time) => {
  return (dispatch) => {
    dispatch(setNotification(`you liked '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export const newNotification = (content, time) => {
  return (dispatch) => {
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

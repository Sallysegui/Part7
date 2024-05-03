import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(state, action) {
      const filterValue = action.payload;
      // console.log(state)
      // console.log(action)
      // return state.push(filterValue)
      return (state = filterValue);
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;


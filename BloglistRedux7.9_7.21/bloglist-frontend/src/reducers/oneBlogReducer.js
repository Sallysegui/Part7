import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "OneblogReducer",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id;
      const changedBlog = action.payload;
      return state.map((b) => (b.id !== id ? b : changedBlog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      console.log(id);

      return state.filter((item) => item.id != id);
    },
    setABlog(state, action) {
      return action.payload;
    },
  },
});

export const {   updateBlog, removeBlog, setABlog } =
  blogSlice.actions;


export const addLikes = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, blog);
    dispatch(updateBlog(likedBlog));
  };
};



export const deletingBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
    } catch (err) {
      console.log("Ohhhh nooo!");
      console.log(err);
    }
  };
};

export const addStateABlog = (id) => {
  return async (dispatch) => {
    try {
      const blogView = await blogService.getOne(id);
      dispatch(setABlog(blogView));
    } catch (err) {
      console.log("Ohhhh nooo!");
      console.log(err);
    }
  };
};

export default blogSlice.reducer;

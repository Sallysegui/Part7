import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogReducer",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id;
      const changedBlog = action.payload;
      return state.map((b) => (b.id !== id ? b : changedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const id = action.payload;
      console.log(id);

      return state.filter((item) => item.id != id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogsSorted = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogsSorted));
  };
};
export const addLikes = (id, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(id, blog);
    dispatch(updateBlog(likedBlog));
  };
};

export const addComment = (id, blog) => {
  return async (dispatch) => {
    const newCommentBlog = await blogService.update(id, blog);
    dispatch(updateBlog(newCommentBlog));
  };
};

export const createBlog = (content) => {
  console.log(content);
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
    } catch (err) {
      console.log("Ohhhh nooo!");
      console.log(err);
    }
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

export default blogSlice.reducer;

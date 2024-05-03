import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data);

export const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export const updateBlog = (updatedBlog) =>
  axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    .then((res) => res.data);

export const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

const baseUrlLogin = "http://localhost:3003/api/login";

export const loginBlog = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrlLogin, credentials);
  // console.log(response.data);
  return response.data;
};

const baseUrlUsers = "http://localhost:3003/api/users";

export const getUsers = async () => {
  const response = await axios.get(baseUrlUsers);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

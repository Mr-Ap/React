import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export async function getPostsPerPage(pageParam = 1, options = {}) {
  try {
    const response = await api.get(`/posts?_page=${pageParam}`, options);
    return response.data;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

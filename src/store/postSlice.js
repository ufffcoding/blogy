import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import database from "../appwrite/database";

const initialState = {
  isLoading: false,
  posts: [],
  rejectedPosts: {},
};

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  const postData = await database.getPosts();
  const posts = postData.documents.map((post) => ({
    ...post,
    imageUrl: database.getFilepreview(post.image),
  }));
  return posts;
});

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const { $id, post } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.$id === $id);
      state.posts[postIndex] = post;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.$id !== action.payload,
      );
    },
    emptyPosts: (state) => {
      state.isLoading = false;
      state.posts = [];
      state.rejectedPosts = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.rejectedPosts = action.error;
      state.isLoading = false;
    });
  },
});

export const { addPost, updatePost, removePost, emptyPosts } =
  postSlice.actions;

export default postSlice.reducer;

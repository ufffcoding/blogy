import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../appwrite/auth";

const initialState = {
  isLoading: false,
  status: false,
  userData: [],
  rejectedUserData: {},
};

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const userData = await auth.getCurrentUser();
  return userData;
});

const authSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.status = false;
      state.userData = [];
      state.rejectedUserData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.status = false;
      state.userData = [];
      state.rejectedUserData = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

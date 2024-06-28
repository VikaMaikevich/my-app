import { createSlice } from "@reduxjs/toolkit";
import { fetchFavoriteAnArticle, fetchUnFavoriteAnArticle } from "../serverActions/articlesThunks";

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    article: null,
    currentPage: 1,
    articlesCount: null,
    loading: false,
    error: null,
  },
  reducers: {
    togglePage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteAnArticle.fulfilled, (state, action) => {
       console.log(action.payload)
       state.errorMessage = '';
      })
      .addCase(fetchFavoriteAnArticle.rejected, (state, action) => {
        state.errorMessage = action.payload || "my unknown error";
        console.log(action.payload)
      })
      .addCase(fetchUnFavoriteAnArticle.fulfilled, (state, action) => {
        console.log(action.payload)
        state.errorMessage = '';
      })
      .addCase(fetchUnFavoriteAnArticle.rejected, (state, action) => {
        state.errorMessage = action.payload || "my unknown error";
        console.log(action.payload)
      })
     
  },
});
export const { togglePage } = articleSlice.actions;
export default articleSlice.reducer;
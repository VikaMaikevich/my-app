import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavoriteAnArticle = createAsyncThunk(
    "articles/fetchFavoriteAnArticle",
    async function (slug, api) {
      const baseUrl = `https://blog.kata.academy/api/`;
      const url = `articles/${slug}/favorite`;
      try{
          const response = await fetch(`${baseUrl}${url}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            
          });
          if (!response.ok){
            return api.rejectWithValue("Что-то пошло не так. Невозможно поставить лайк!");
          }
          const data = await response.json();
          console.log(data.article)
          return data.article;
      }
      catch (e){
        throw e.message;
          }
      }
  );
  export const fetchUnFavoriteAnArticle = createAsyncThunk(
    "articles/fetchUnFavoriteAnArticle",
    async function (slug, api) {
      const baseUrl = `https://blog.kata.academy/api/`;
      const url = `articles/${slug}/favorite`;
      try{
          const response = await fetch(`${baseUrl}${url}`,
          {
            method: "DELITE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok){
            return api.rejectWithValue("Что-то пошло не так. Невозможно удалить лайк!");
          }
          const data = await response.json();
          console.log(data.article)
          return data.article;
      }
      catch (e){
        throw e.message;
          }
      }
  );
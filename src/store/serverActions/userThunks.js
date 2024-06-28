import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerNewUser = createAsyncThunk(
  "user/registerNewUser",
  async function (body, api) {
    const baseUrl = `https://blog.kata.academy/api/`;
    const url = `users`;

    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      if (response.status === 422) {
        throw new Error(`The email or username is already in use`);
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.user.token);
      return data;
    } catch (e) {
      console.log(e);
      return api.rejectWithValue(e.message);
    }
  }
);
export const existingUserLogin = createAsyncThunk(
  "user/existingUserLogin",
  async function (body, api) {
    const baseUrl = `https://blog.kata.academy/api/`;
    const url = `users/login`;

    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`The email or password is incorrect`);
      }
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.user.token);
      return data;
    } catch (e) {
      console.log(e);
      return api.rejectWithValue(e.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async function ({body, navigate}, api) {
    const baseUrl = `https://blog.kata.academy/api/`;
    const url = `user`;

    try {
      const response = await fetch(`${baseUrl}${url}`, 
       {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      if(response.status===422){
        throw new Error(`The email or username is already in use`);
      }
      const data = await response.json();
  
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/",  { replace: true })
      return data;
    } catch (e) {
      console.log(e);
      return api.rejectWithValue(e.message);
    }
  }
);
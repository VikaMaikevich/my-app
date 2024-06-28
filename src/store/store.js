import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleSlice";
import { kataPostsApi } from "./kataPostApi";
import userReducer from './reducers/userSlice';


export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
    [kataPostsApi.reducerPath]: kataPostsApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(kataPostsApi.middleware)
});

import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './reducers/articleSlice';
import { postsApi } from './postApi';
import userReducer from './reducers/userSlice';

export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(postsApi.middleware),
});

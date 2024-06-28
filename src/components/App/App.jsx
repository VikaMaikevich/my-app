import { Route, Routes } from "react-router-dom";
import Layout from "../../pages/Layout/Layout";
import ArticlePage from "../../pages/ArticlePage/ArticlePage";
import AllArticlesPage from "../../pages/AllArticlesPage/AllArticlesPage";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import EditProfilePage from "../../pages/EditProfilePage/EditProfilePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import CreateArticlePage from "../../pages/CreateArticlePage/CreateArticlePage";
import { useDispatch, useSelector } from "react-redux";
import { upDateUserLS } from "../../store/reducers/userSlice";
import EditArticlePage from "../../pages/EditArticlePage/EditArticlePage";
import { useEffect } from "react";
import AuthUser from "../HOK/AuthUser";
import NotAuthUser from "../HOK/NoAuthUser";


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(upDateUserLS(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllArticlesPage />} />
        <Route path="articles" element={<AllArticlesPage />} />
        <Route path="articles/:slug" element={<ArticlePage />} />
        <Route element={<AuthUser user={user} />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="profile" element={<EditProfilePage />} />
        <Route
          path="new-article"
          element={
            <NotAuthUser user={user}>
              <CreateArticlePage />
            </NotAuthUser>
          }
        />
        <Route
          path="articles/:slug/edit"
          element={
            <NotAuthUser user={user}>
              <EditArticlePage />
            </NotAuthUser>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
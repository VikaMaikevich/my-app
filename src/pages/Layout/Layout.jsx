import MyButton from "../../components/MyButton/MyButton";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import stl from "./Layout.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { removeUserLS } from "../../store/reducers/userSlice";
import UserProfile from "../../components/UserProfile/UserProfile";

const Layout = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    dispatch(removeUserLS(null));
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className={stl.app}>
      <header className={stl.header}>
        <Link to="/">
          <MyButton
            type="text"
            size="large"
            children="Realworld Blog"
            className={stl.btn}
          />
        </Link>
        {!currentUser ? (
          <div className={stl.btnWrapper}>
            <Link to="/sign-in">
              <MyButton type="text" size="large" children="Sign In" />
            </Link>
            <Link to="/sign-up">
              <MyButton
                type="default"
                size="large"
                children="Sign Up"
                color="#52C41A"
              />
            </Link>
          </div>
        ) : (
          <div className={stl.btnWrapper}>
            <Link to="/new-article">
              <MyButton
                type="default"
                children="Create article"
                color="#52C41A"
                size="small"
              />
            </Link>
            <Link to="profile" className={stl.link}>
              <UserProfile
                username={currentUser.username}
                image={currentUser.image}
              />
            </Link>

            <MyButton
              type="default"
              children="Log Out"
              color="#000000BF"
              size="large"
              onClick={logOut}
            />
          </div>
        )}
      </header>
      <div className={stl.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

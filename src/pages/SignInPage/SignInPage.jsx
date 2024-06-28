import SignInForm from "../../components/SignInForm/SignInForm";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { onCloseError } from "../../store/reducers/userSlice";
import stl from "./SignInPage.module.scss";

const SignInPage = () => {
  const dispatch = useDispatch();
  const userError = useSelector((state) => state.user.errorMessage);
  const onClose = () => {
    dispatch(onCloseError(null));
  };

  return (
    <div className={stl.wrapper}>
      {userError && (
        <Alert
          message="Error!"
          description={userError}
          type="error"
          closable
          onClose={onClose}
        />
      )}
      <SignInForm />
    </div>
  );
};

export default SignInPage;
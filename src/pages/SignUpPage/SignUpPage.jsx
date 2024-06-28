import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { onCloseError } from "../../store/reducers/userSlice";
import stl from "./SignUpPage.module.scss";

const SignUpPage = () => {
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
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
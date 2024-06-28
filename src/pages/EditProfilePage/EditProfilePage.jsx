import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { onCloseError } from "../../store/reducers/userSlice";
import EditUserProfileForm from "../../components/EditUserProfileForm/EditUserProfileForm";
import stl from "./EditProfilePage.module.scss";

const EditProfilePage = () => {
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
      <EditUserProfileForm />
    </div>
  );
};

export default EditProfilePage;
import MyButton from "../MyButton/MyButton";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../store/serverActions/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import stl from "./EditUserProfileForm.module.scss";

const EditUserProfileForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: currentUser?.username || null,
      email: currentUser?.email || null,
      image: currentUser?.image || null,
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const body = { user: data };
    dispatch(updateUserProfile({ body, navigate }));
    reset();
  };

  return (
    <div className={stl.wrapper}>
      <h1>Edit Profile</h1>
      <form
        name="EditProfile"
        onSubmit={handleSubmit(onSubmit)}
        className={stl.form}
      >
        <label className={stl.label}>
          Username
          <input
            {...register("username", {
              required: "The field must be filled in",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 20, message: "Maximum 20 characters" },
              pattern: {
                value: /^[a-z][a-z0-9_-]*$/,
                message:
                  "You can only use lowercase English letters and numbers, - and _",
              },
            })}
            placeholder="Username"
            className={
              !errors?.username ? stl.input : `${stl.input} ${stl.input_error}`
            }
          />
          <div className={stl.error}>
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
          </div>
        </label>

        <label className={stl.label}>
          Email address
          <input
            {...register("email", {
              required: "Email is required",
              validate: {
                minLength: (v) => v.length > 0 || "Email is required",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
            placeholder="Email address"
            type="email"
            className={
              !errors?.email ? stl.input : `${stl.input} ${stl.input_error}`
            }
          />
          <div className={stl.error}>
            {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
          </div>
        </label>

        <label className={stl.label}>
          New Password
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
              maxLength: { value: 40, message: "Maximum 40 characters" },
            })}
            placeholder="Password"
            type="password"
            className={
              !errors?.password ? stl.input : `${stl.input} ${stl.input_error}`
            }
          />
          <div className={stl.error}>
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
        </label>
        <label className={stl.label}>
          Avatar image (url)
          <input
            {...register("image", {
              required: false,
              pattern: {
                value:
                  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
                message: "There must be a valid url",
              },
            })}
            placeholder="Enter image url"
            className={
              !errors?.image ? stl.input : `${stl.input} ${stl.input_error}`
            }
          />
          <div className={stl.error}>
            {errors?.image && <p>{errors?.image?.message || "Error!"}</p>}
          </div>
        </label>

        <MyButton
          desabled={!isValid}
          type="primary"
          children="Save"
          color="#1890FF"
          htmlType="submit"
        />
      </form>
    </div>
  );
};
export default EditUserProfileForm;

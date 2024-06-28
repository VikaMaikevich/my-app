import MyButton from "../MyButton/MyButton";
import { useForm } from "react-hook-form";
import { registerNewUser } from "../../store/serverActions/userThunks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import stl from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      isAgree: true,
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registerNewUser({ user: data }));
    console.log(JSON.stringify(data));
    reset();
  };

  return (
    <div className={stl.wrapper}>
      <h1>Create new account</h1>
      <form
        name="signUp"
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
          Password
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
          Repeat Password
          <input
            {...register("repeatPassword", {
              required: "Please repeat your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="Repeat Password"
            type="password"
            className={
              !errors?.repeatPassword
                ? stl.input
                : `${stl.input} ${stl.input_error}`
            }
          />
          <div className={stl.error}>
            {errors?.repeatPassword && (
              <p>{errors?.repeatPassword?.message || "Error!"}</p>
            )}
          </div>
        </label>

        <hr className={stl.hr} />
        <div className={stl.checkboxWrapper}>
          <label className={stl.checkbox}>
            <input
              {...register("isAgree", {
                required: "Checkbox must be checked",
              })}
              type="checkbox"
              className={
                !errors?.isAgree ? stl.input : `${stl.input} ${stl.input_error}`
              }
            />
            <span>I agree to the processing of my personal information</span>
          </label>
          <div className={stl.error}>
            {errors?.isAgree && <p>{errors?.isAgree?.message || "Error!"}</p>}
          </div>
        </div>

        <MyButton
          desabled={!isValid}
          type="primary"
          children="Create"
          color="#1890FF"
          htmlType="submit"
        />
      </form>
      <div className={stl.span}>
        Already have an account?{" "}
        <Link to="/sign-in" className={stl.link}>
          Sign In.
        </Link>
      </div>
    </div>
  );
};
export default SignUpForm;

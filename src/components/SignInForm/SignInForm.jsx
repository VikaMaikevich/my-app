import MyButton from "../MyButton/MyButton";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { existingUserLogin } from "../../store/serverActions/userThunks";
import { useDispatch, useSelector } from "react-redux";
import stl from "./SignInForm.module.scss";

const SignInForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const dispatch = useDispatch();

  const userError = useSelector((state) => state.user.errorMessage);

  const onSubmit = (data) => {
    dispatch(existingUserLogin({ user: data }));
    if (!userError) {
      reset();
    }
  };

  return (
    <div className={stl.wrapper}>
      <h1>Sign In</h1>
      <form
        name="signUp"
        onSubmit={handleSubmit(onSubmit)}
        className={errors ? stl.form : `${stl.form} ${stl.form_error}`}
      >
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
            className={stl.input}
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
            className={stl.input}
          />
          <div className={stl.error}>
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
          </div>
        </label>

        <MyButton
          desabled={!isValid}
          type="primary"
          children="Login"
          color="#1890FF"
          htmlType="submit"
        />
      </form>
      <div className={stl.span}>
        Don’t have an account?{" "}
        <Link to="/sign-up" className={stl.link}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};
export default SignInForm;
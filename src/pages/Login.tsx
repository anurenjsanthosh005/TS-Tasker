import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { users } from "../data/mock";
import { useAuth } from "../context/contextHooks";

interface LoginFormInputs {
  username: string;
  password: string;
}

function Login() {
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    try {
      const user = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (!user) {
        throw new Error("Invalid username or password");
      }

      console.log("Login successful:", user);
      userLogin(user);
      navigate("/", { replace: true });
    } catch (err: any) {
      //this any type is temporary for small forms.
      // Show error in the form
      setError("root", {
        type: "manual",
        message: err.message,
      });
    }
  };

  return (
    <div className="border bg-blue-100 w-[500px] h-[390px] flex flex-col justify-center items-center rounded-xl shadow-lg p-9 ">
      <h1 className="text-3xl font-bold mb-8">LOGIN</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-6"
      >
        {/* Username Input */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
            className="py-2 px-3 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-black"
          />
          {errors.username && (
            <span className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
            className="py-2 px-3 rounded-xl border-2 border-gray-400 focus:outline-none focus:border-black"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/*onSubmit Display login error */}
        {errors.root && (
          <span className="text-red-500 text-sm">{errors.root.message}</span>
        )}

        <button
          type="submit"
          className="py-2 px-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition"
        >
          Login
        </button>
        <div className="flex justify-center ">
          <p>Don't have an account? Sign up</p>
        </div>
      </form>
    </div>
  );
}

export default Login;

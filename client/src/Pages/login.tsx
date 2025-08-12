import { Button } from "@/components/Button";
import { InputField } from "@/components/Input-field";
import { loginSchema, type loginInputSchema } from "@/Schema/login.schema";
import {
  registerSchema,
  type registerInputSchema,
} from "@/Schema/register.schema";
import { usePost } from "@/utils/hooks/axios-hooks/usePost";
import { useAppDispatch } from "@/utils/hooks/redux-hook/store-hooks";
import { setAccessToken } from "@/utils/redux/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { toast } from "react-toastify";

const Login = () => {
  const dispatcher = useAppDispatch();
  const cb = useRef<HTMLInputElement>(null);
  const registerFormMethods = useForm<registerInputSchema>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showRegisterPassword, setShowRegisterPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({ confirmPassword: false, password: false });

  const loginFormMethods = useForm<loginInputSchema>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = usePost<{ message: string }>({
    url: "register",
    options: {
      onSuccess: (data) => {
        toast.success(data.message);
        registerFormMethods.reset();
        if (cb.current) cb.current.checked = true;
      },
      onError: (data) => {
        toast.error(data.response?.data.message);
      },
    },
  });

  const { mutate: loginMutate } = usePost<{ accessToken: string }>({
    url: "/login",
    options: {
      onSuccess(data) {
        dispatcher(setAccessToken(data.accessToken));
        toast.success("Logged in successfully");
      },
      onError(data) {
        toast.error(data.response?.data.message);
      },
    },
  });

  const registerSubmit = (data: registerInputSchema) => {
    mutate(data);
  };

  const loginSubmit = (data: loginInputSchema) => {
    loginMutate(data);
  };

  return (
    <section className="h-[100dvh] lg:h-fit">
      <header className="h-[20%]">
        <h1 className="text-5xl text-center p-2 font-semibold">
          Notes Taking App
        </h1>
      </header>
      <section className="h-[80%] rounded-t-2xl pt-12  lg:w-[50%] mx-auto lg:mt-24 lg:h-56 lg:flex lg:rounded-2xl  lg:flex-col lg:justify-center  bg-white">
        <input type="checkbox" id="auth" ref={cb} defaultChecked hidden />
        {/* login form */}
        <form
          onSubmit={loginFormMethods.handleSubmit(loginSubmit)}
          className="bg-white h-full lg:h-fit rounded-2xl flex-col py-2"
          id="login"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Login{" "}
          </h1>

          <InputField
            label="Email Address"
            {...loginFormMethods.register("email")}
            containerProps={{
              className: "mx-auto",
            }}
            errorMessage={loginFormMethods.formState.errors.email?.message}
          />
          <InputField
            label="Password"
            containerProps={{
              className: "mx-auto",
            }}
            type={showPassword ? "text" : "password"}
            {...loginFormMethods.register("password")}
            errorMessage={loginFormMethods.formState.errors.password?.message}
            suffix={
              showPassword ? (
                <IoMdEye onClick={() => setShowPassword((prev) => !prev)} />
              ) : (
                <IoMdEyeOff onClick={() => setShowPassword((prev) => !prev)} />
              )
            }
          />
          <Button text="Submit" className="rounded-md mt-2" />
          <div className="p-2 flex justify-end">
            <label htmlFor="auth">
              <span className=" cursor-pointer">
                Register {<LuArrowRight className="inline" />}{" "}
              </span>
            </label>
          </div>
        </form>
        {/* register form */}
        <form
          className="bg-white h-full lg:h-fit rounded-2xl flex-col  py-2"
          onSubmit={registerFormMethods.handleSubmit(registerSubmit)}
          id="register"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Register{" "}
          </h1>
          <InputField
            label="Email Address"
            containerProps={{
              className: "mx-auto",
            }}
            {...registerFormMethods.register("email")}
            errorMessage={registerFormMethods.formState.errors.email?.message}
          />
          <InputField
            label="UserName"
            containerProps={{
              className: "mx-auto",
            }}
            {...registerFormMethods.register("userName")}
            errorMessage={
              registerFormMethods.formState.errors.userName?.message
            }
          />
          <InputField
            label="Password"
            containerProps={{
              className: "mx-auto",
            }}
            type={showRegisterPassword.password ? "text" : "password"}
            {...registerFormMethods.register("password")}
            errorMessage={
              registerFormMethods.formState.errors.password?.message
            }
            suffix={
              showPassword ? (
                <IoMdEye
                  onClick={() =>
                    setShowRegisterPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                />
              ) : (
                <IoMdEyeOff
                  onClick={() =>
                    setShowRegisterPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                />
              )
            }
          />
          <InputField
            label="Confirm Password"
            containerProps={{
              className: "mx-auto",
            }}
            type={showRegisterPassword.confirmPassword ? "text" : "password"}
            {...registerFormMethods.register("confirmPassword")}
            errorMessage={
              registerFormMethods.formState.errors.confirmPassword?.message
            }
            suffix={
              showPassword ? (
                <IoMdEye
                  onClick={() =>
                    setShowRegisterPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                />
              ) : (
                <IoMdEyeOff
                  onClick={() =>
                    setShowRegisterPassword((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                />
              )
            }
          />
          <Button text="Submit" className="rounded-md mt-2" />
          <div className="p-2 flex justify-start">
            <label htmlFor="auth">
              <span className=" cursor-pointer">
                {<LuArrowLeft className="inline" />} Login{" "}
              </span>
            </label>
          </div>
        </form>
      </section>
    </section>
  );
};

export { Login };

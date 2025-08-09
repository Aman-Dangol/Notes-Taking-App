import { Button } from "@/components/Button";
import { InputField } from "@/components/Input-field";
import { loginSchema, type loginInputSchema } from "@/Schema/login.schema";
import {
  registerSchema,
  type registerInputSchema,
} from "@/Schema/register.schema";
import { usePost } from "@/utils/hooks/axios-hooks/usePost";
import { useAppDisptach } from "@/utils/hooks/redux-hook/store-hooks";
import { setAccessToken } from "@/utils/redux/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router";

const Login = () => {
  const dipatcher = useAppDisptach();
  const navigate = useNavigate();
  const registerFormMethods = useForm<registerInputSchema>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const loginFormMethods = useForm<loginInputSchema>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: registerInputSchema) => {
      const response = await axios.post("/api/register", data, {
        headers: {
          Authorization: "",
        },
      });

      return response.data;
    },
    onSuccess(data) {
      console.log(data);
      registerFormMethods.reset();
    },
    onError(error) {
      console.log(error);
    },
  });

  const { mutate: loginMutate } = usePost<{ accessToken: string }>({
    url: "/login",
    options: {
      onSuccess(data) {
        dipatcher(setAccessToken(data.accessToken));
        navigate("/home");
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

      <section className="h-[80%] rounded-t-2xl pt-12  lg:w-[50%] mx-auto lg:mt-24 lg:h-56 lg:flex lg:rounded-2xl  lg:flex-col lg:justify-center bg-white">
        <input type="checkbox" id="auth" defaultChecked hidden />
        {/* login form */}
        <form
          onSubmit={loginFormMethods.handleSubmit(loginSubmit)}
          className=" bg-white h-full lg:h-fit rounded-2xl py-2 "
          id="login"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Login{" "}
          </h1>

          <InputField
            label="Email Address"
            {...loginFormMethods.register("email")}
            errorMessage={loginFormMethods.formState.errors.email?.message}
          />
          <InputField
            label="Password"
            {...loginFormMethods.register("password")}
            errorMessage={loginFormMethods.formState.errors.password?.message}
          />
          <Button text="Submit" className="rounded-md mx-auto block mt-2" />
          <div className="p-2 float-right">
            <label htmlFor="auth">
              <span className=" cursor-pointer">
                Register {<LuArrowRight className="inline" />}{" "}
              </span>
            </label>
          </div>
        </form>
        {/* register form */}
        <form
          className=" bg-white h-full lg:h-fit rounded-2xl py-2"
          onSubmit={registerFormMethods.handleSubmit(registerSubmit)}
          id="register"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Register{" "}
          </h1>
          <InputField
            label="Email Address"
            {...registerFormMethods.register("email")}
            errorMessage={registerFormMethods.formState.errors.email?.message}
          />
          <InputField
            label="UserName"
            {...registerFormMethods.register("userName")}
            errorMessage={
              registerFormMethods.formState.errors.userName?.message
            }
          />
          <InputField
            label="Password"
            {...registerFormMethods.register("password")}
            errorMessage={
              registerFormMethods.formState.errors.password?.message
            }
          />
          <Button text="Submit" className="rounded-md mx-auto block mt-2" />
          <div className="p-2">
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

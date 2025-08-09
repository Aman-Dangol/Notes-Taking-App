import { Button } from "@/components/Button";
import { InputField } from "@/components/Input-field";
import { registerSchema } from "@/Schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";

const Login = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  return (
    <section className="h-[100dvh] lg:h-fit">
      <header className="h-[20%]">
        <h1 className="text-5xl text-center p-2 font-semibold">
          Notes Taking App
        </h1>
      </header>

      <section className="h-[80%] rounded-t-2xl pt-12  lg:w-[50%] mx-auto lg:mt-24 lg:h-56 lg:flex lg:rounded-2xl  lg:flex-col lg:justify-center bg-white">
        <input type="checkbox" id="auth" defaultChecked hidden />
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" bg-white h-full lg:h-fit rounded-2xl py-2 "
          id="login"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Login{" "}
          </h1>

          <InputField label="Email Address" />
          <InputField label="Password" />
          <Button text="Submit" className="rounded-md mx-auto block mt-2" />
          <div className="p-2 float-right">
            <label htmlFor="auth">
              <span className=" cursor-pointer">
                Register {<LuArrowRight className="inline" />}{" "}
              </span>
            </label>
          </div>
        </form>
        <form
          className=" bg-white h-full lg:h-fit rounded-2xl py-2"
          onSubmit={(e) => e.preventDefault()}
          id="register"
        >
          <h1 className="text-3xl text-center p-2 bg-white rounded-t-2xl font-semibold">
            Register{" "}
          </h1>
          <InputField
            label="Email Address"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <InputField
            label="UserName"
            {...register("userName")}
            errorMessage={errors.userName?.message}
          />
          <InputField
            label="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
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

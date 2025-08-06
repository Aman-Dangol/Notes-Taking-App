import { InputField } from "@/components/Input-field";

const Login = () => {
  return (
    <section className="h-[100dvh] lg:h-fit">
      <header className="h-[20%]">
        <h1 className="text-5xl text-center p-2 font-semibold">Login</h1>
      </header>
      <section className="h-[80%] rounded-t-2xl  lg:w-[50%] mx-auto lg:mt-20 lg:h-56 lg:flex lg:rounded-2xl  lg:flex-col lg:justify-center bg-white">
        <form className=" bg-white h-full lg:h-fit rounded-2xl py-2 ">
          <InputField label="Email Address" />
          <InputField label="Password" />
        </form>
      </section>
    </section>
  );
};

export { Login };

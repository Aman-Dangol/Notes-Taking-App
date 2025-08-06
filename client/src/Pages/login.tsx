import { InputField } from "../components/Input-field";

const Login = () => {
  return (
    <section>
      <header>
        <h1 className="text-5xl text-center p-2 font-semibold">Login</h1>
        <section className="bg-white">
          <InputField label="Enter email Address" />
        </section>
      </header>
    </section>
  );
};

export { Login };

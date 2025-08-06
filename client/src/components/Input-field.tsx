import type {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

interface props
  extends DetailedHTMLProps<
    Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">,
    HTMLInputElement
  > {
  asChild?: boolean;
  label: string;
  labelProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  inputContainerProps?: HTMLAttributes<HTMLDivElement>;
  errorMessage?: string;
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const InputField = ({
  type,
  ref,
  errorMessage = "",
  label,
  labelProps = { className: "text-black" },
  className: inputClassName,
  containerProps,
  asChild = false,
  children = <div />,
  prefix,
  suffix,
  ...inputProps
}: props) => {
  const { className: containerClassName, ...otherContainerProps } =
    containerProps ?? {};

  return (
    <div
      className={`mx-auto w-[80%] ${containerClassName}`}
      {...otherContainerProps}
    >
      <div className=" gap-2 md:gap-2 grid grid-cols-3 md:grid-cols-5 lg:gap-0 items-center">
        <label {...labelProps}>{label}</label>

        {asChild === false ? (
          <div
            className={`col-span-2 md:col-span-4 rounded-md py-1 flex gap-2 justify-between items-center px-2 bg-white`}
          >
            {prefix ? prefix : ""}
            <input
              type={type}
              ref={ref}
              className={`${inputClassName} flex-1  outline-none`}
              {...inputProps}
            />
            {suffix ? suffix : ""}
          </div>
        ) : (
          children
        )}
      </div>
      <p className="error h-2">{errorMessage} </p>
    </div>
  );
};

export { InputField };

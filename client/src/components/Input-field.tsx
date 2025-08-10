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

  const { className: labelClassName } = labelProps;

  return (
    <div
      className={`w-[80%] mb-2   ${containerClassName}`}
      {...otherContainerProps}
    >
      <div className=" bg-inherit md:grid md:gap-2 items-center md:grid-cols-5 lg:gap-0 ">
        <label {...labelProps} className={` ${labelClassName}`}>
          {label} :
        </label>
        {asChild === false ? (
          <div
            className={`col-span-2 flex md:col-span-4  rounded-md py lg:max-h-[35px] gap-2 justify-between items-center px-2 border-2 border-orange-500 `}
          >
            {prefix ? prefix : ""}
            <input
              type={type}
              ref={ref}
              className={`${inputClassName} flex-1  outline-none py-1`}
              {...inputProps}
            />
            {suffix ? suffix : ""}
          </div>
        ) : (
          children
        )}
      </div>
      <p className="error ">{errorMessage} </p>
    </div>
  );
};

export { InputField };

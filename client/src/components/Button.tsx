import type { DetailedHTMLProps } from "react";

interface props
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<Omit<HTMLButtonElement, "className">>,
    HTMLButtonElement
  > {
  text: string;
  className?: string;
}

const Button = ({ text, className, type = "submit", ...others }: props) => {
  return (
    <button
      type={type}
      {...others}
      className={`border-color px-8 py-2 bg-red-800 text-white rounded-md mx-auto cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export { Button };

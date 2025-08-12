import type { DetailedHTMLProps } from "react";

interface props
  extends DetailedHTMLProps<
    React.HTMLAttributes<Omit<HTMLSpanElement, "className">>,
    HTMLSpanElement
  > {
  categoryName: string;
  className?: string;
}

export const CategoryBox = ({
  categoryName = "",
  className = "",
  ...props
}: props) => {
  return (
    <span
      className={`p-1 bg-red-900 min-w-[40px] text-center rounded-sm cursor-pointer text-white ${className}`}
      {...props}
    >
      {categoryName}
    </span>
  );
};

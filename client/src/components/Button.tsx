const Button = ({
  type = "submit",
  text,
  className,
}: {
  type?: "button" | "submit";
  text: string;
  className: string;
}) => {
  return (
    <button
      type={type}
      className={`border-color p-2 mx-auto cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export { Button };

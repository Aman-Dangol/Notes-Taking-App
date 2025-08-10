const Button = ({
  type = "submit",
  text,
  className,
}: {
  type?: "button" | "submit";
  text: string;
  className?: string;
}) => {
  return (
    <button
      type={type}
      className={`border-color px-8 py-2 bg-red-800 text-white rounded-md mx-auto cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export { Button };

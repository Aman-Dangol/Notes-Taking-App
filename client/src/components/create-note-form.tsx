import { Button } from "@/components/Button";
import { InputField } from "@/components/Input-field";
import { noteSchema, type noteSchemaInput } from "@/Schema/note-schema";
import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import { usePost } from "@/utils/hooks/axios-hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface props {
  closeFn: () => void;
}

export const NoteForm = ({ closeFn }: props) => {
  const qc = useQueryClient();

  const { data: categoryList } = useGet<{
    categories: {
      name: string;
      id: number;
    }[];
  }>({
    url: "/category",
    queryKey: ["category-list"],
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<noteSchemaInput>({
    resolver: zodResolver(noteSchema),
    mode: "onSubmit",
    defaultValues: {
      category: [],
    },
  });

  const { mutate: createNote } = usePost<{ message: string }>({
    url: "/note/create",
    options: {
      onSuccess: (data) => {
        toast.success(data.message);
        qc.invalidateQueries({
          queryKey: ["note-list"],
        });
        closeFn();
      },
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "category",
    control,
  });

  const formSubmit = (data: noteSchemaInput) => {
    createNote(data);
  };

  const watchedcategory = watch("category");

  console.log(watchedcategory);

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col items-center pb-6"
    >
      <InputField
        label="title"
        {...register("title")}
        errorMessage={errors.title?.message}
      />
      <InputField
        label="description"
        {...register("description")}
        errorMessage={errors.description?.message}
      />
      <InputField
        label="category"
        errorMessage={errors.category?.message}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            if (fields.every((e) => e.categoryName !== target.value)) {
              append({
                categoryName: target.value,
              });
              target.value = "";
            } else toast.error("value already exist");
          }
        }}
      />
      <div className="flex flex-wrap  p-2 gap-2 my-2 over w-[80%]">
        {categoryList?.categories?.map((item, index) => (
          <span
            key={index}
            className={`p-1 rounded-2xl text-white cursor-pointer hover:scale-110 transition-transform min-w-[40px] text-center ${
              watchedcategory.some((i) => i.categoryName === item.name)
                ? "bg-green-600"
                : " bg-red-900 "
            }`}
            onClick={() => {
              const index =
                watchedcategory?.findIndex((cat) => {
                  return cat.categoryName === item.name;
                }) ?? -1;

              console.log(index, item.name);
              if (index !== -1) {
                remove(index);
                console.log("removeds");
              } else {
                append({ categoryName: item.name });
              }
            }}
          >
            {item.name}
          </span>
        ))}

        {watchedcategory
          .filter((item) => {
            const index =
              categoryList?.categories?.findIndex(
                (cat) => cat.name === item.categoryName
              ) ?? -1;
            if (index === -1) return true;
            return false;
          })
          .map((item, index) => {
            return (
              <span
                key={index}
                className={`p-1 ${
                  watchedcategory.some(
                    (i) => i.categoryName === item.categoryName
                  )
                    ? "bg-green-600"
                    : " bg-red-900 "
                } rounded-2xl text-white hover:scale-110 transition-transform min-w-[40px] text-center`}
                onClick={() => {
                  if (
                    watchedcategory.some((cat) => {
                      console.log(item.categoryName, cat.categoryName);
                      return item.categoryName === cat.categoryName;
                    })
                  ) {
                    remove(index);
                    console.log("removeds");
                  }
                }}
              >
                {item.categoryName}
              </span>
            );
          })}
      </div>
      <Button text="submit" type="submit" />
    </form>
  );
};

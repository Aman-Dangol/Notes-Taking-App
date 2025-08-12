import { Button } from "@/components/Button";
import { CategoryBox } from "@/components/categoryBox";
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
  type?: "create" | "update";
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
      onError: (data) => {
        toast.error(data.message);
      },
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "category",
    control,
  });

  const formSubmit = (data: noteSchemaInput) => {
    console.log("object");
    createNote(data);
  };

  const watchedCategory = watch("category");

  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col items-center pb-6"
    >
      <InputField
        label="Title"
        {...register("title")}
        errorMessage={errors.title?.message}
      />
      <InputField
        label="Description"
        {...register("description")}
        errorMessage={errors.description?.message}
      />
      <InputField
        label="Category"
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
          <CategoryBox
            categoryName={item.name}
            key={index}
            className={`p-1 rounded-2xl text-white cursor-pointer hover:scale-110 transition-transform min-w-[40px] text-center ${
              watchedCategory.some((i) => i.categoryName === item.name)
                ? "!bg-green-600"
                : "!bg-red-900 "
            }`}
            onClick={() => {
              const index =
                watchedCategory?.findIndex((cat) => {
                  return cat.categoryName === item.name;
                }) ?? -1;

              if (index !== -1) {
                remove(index);
              } else {
                append({ categoryName: item.name });
              }
            }}
          />
        ))}

        {watchedCategory
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
              <CategoryBox
                categoryName={item.categoryName}
                className={`p-1 rounded-2xl text-white cursor-pointer hover:scale-110 transition-transform min-w-[40px] text-center ${
                  watchedCategory.some(
                    (i) => i.categoryName === item.categoryName
                  )
                    ? "!bg-green-600"
                    : "!bg-red-900 "
                }`}
                onClick={() => {
                  if (
                    watchedCategory.some((cat) => {
                      return item.categoryName === cat.categoryName;
                    })
                  ) {
                    remove(index);
                  }
                }}
              />
            );
          })}
      </div>
      <Button text="Submit" type="submit" />
    </form>
  );
};

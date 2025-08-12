import { Button } from "@/components/Button";
import { InputField } from "@/components/Input-field";
import type { Note } from "@/Pages/Home/home-types";
import {
  noteSchema,
  type noteSchemaInput,
  type noteSchemaOutput,
} from "@/Schema/note-schema";
import { useGet } from "@/utils/hooks/axios-hooks/useGet";
import { usePut } from "@/utils/hooks/axios-hooks/usePut";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface props {
  closeFn: () => void;
  initialData: Note;
}

export const UpdateNoteForm = ({ closeFn, initialData }: props) => {
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
  } = useForm<noteSchemaInput, unknown, noteSchemaOutput>({
    resolver: zodResolver(noteSchema),
    mode: "onSubmit",
    defaultValues: {
      id: initialData.id,
      title: initialData.title,
      category: initialData.category.map((cat) => ({ categoryName: cat.name })),
      description: initialData.description,
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "category",
    control,
  });

  const { mutate: updateFn } = usePut<{ message: string }>({
    url: "/note",
    options: {
      onSuccess: (data) => {
        toast.success(data.message);
        closeFn();
        qc.invalidateQueries({
          queryKey: ["note-list"],
        });
      },
    },
  });

  const formSubmit = (data: noteSchemaInput) => {
    updateFn(data);
  };

  const watchedCategory = watch("category");

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
            className={`p-1 rounded-md text-white cursor-pointer hover:scale-110 transition-transform min-w-[40px] text-center ${
              watchedCategory.some((i) => i.categoryName === item.name)
                ? "bg-green-600"
                : " bg-red-900 "
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
          >
            {item.name}
          </span>
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
              <span
                key={index}
                className={`p-1 ${
                  watchedCategory.some(
                    (i) => i.categoryName === item.categoryName
                  )
                    ? "bg-green-600"
                    : " bg-red-900 "
                } rounded-md text-white hover:scale-110 transition-transform min-w-[40px] text-center`}
                onClick={() => {
                  if (
                    watchedCategory.some((cat) => {
                      return item.categoryName === cat.categoryName;
                    })
                  ) {
                    remove(index);
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

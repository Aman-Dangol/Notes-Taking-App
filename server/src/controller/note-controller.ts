import { CustomRequest } from "@/utility/types/custom-request";
import { noteSchemaInput } from "@/zodSchema/note-schema";
import { Response } from "express";
import prisma from "../../prisma/connect";

export const createNote = async (
  req: CustomRequest<noteSchemaInput>,
  res: Response<unknown>
) => {
  const { category, ...rest } = req.body;

  const { user } = req.app.locals;

  console.log(user);

  if (user) {
    const data = await prisma.note.create({
      data: {
        userID: user.id,
        title: rest.title,
        description: rest.description,
        category: {
          connectOrCreate: category.map((e) => ({
            where: { name: e.categoryName },
            create: {
              name: e.categoryName,
              userID: user.id,
            },
          })),
        },
      },
    });

    console.log(data);
  }
  category.forEach((cat) => {});

  res.json({ message: "data achieved" });
};

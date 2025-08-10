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

  if (user) {
    await prisma.note.create({
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
  }

  res.status(200).json({ message: "note created" });
};

export const getNoteByUserID = async (
  req: CustomRequest<{}, { s: string }>,
  res: Response
) => {
  const search = req.query.s.split(":")[1];

  let filter;
  if (search) {
    filter = [
      {
        category: {
          some: {
            name: { contains: search },
          },
        },
      },
    ];
  } else {
    filter = [
      { description: { contains: req.query.s } },
      { title: { contains: req.query.s } },
    ];
  }

  console.log(search);
  const user = req.app.locals.user;
  const list = await prisma.note.findMany({
    where: {
      userID: user?.id,
      OR: filter,
    },
    include: {
      category: {
        omit: {
          userID: true,
        },
      },
    },
    omit: {
      userID: true,
    },
  });

  if (list.length === 0) {
    res.status(404).json({ message: "no notes!" });
    return;
  }
  res.json({ notes: list });
};

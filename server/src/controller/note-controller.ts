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
  const search = req.query.s.split(":");

  let filter;
  if (typeof search[1] !== "undefined") {
    if (search[0] === "cat") {
      filter = [
        {
          category: {
            some: {
              name: { contains: search[1] },
            },
          },
        },
      ];
    } else if (search[0] === "title") {
      filter = [
        {
          title: { contains: search[1] },
        },
      ];
    }
    if (search[0] === "desc") {
      filter = [
        {
          description: { contains: search[1] },
        },
      ];
    }
  } else {
    filter = [
      { description: { contains: req.query.s } },
      { title: { contains: req.query.s } },
      {
        category: {
          some: {
            name: { contains: req.query.s },
          },
        },
      },
    ];
  }

  const user = req.app.locals.user;
  console.log(user?.id);
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

export const getNoteByID = async (
  req: CustomRequest<{}, {}, {}, {}, { id: string }>,
  res: Response
) => {
  const { id } = req.params;

  let parsedId = parseInt(id);
  if (!parsedId) {
    res.json({
      message: "the value was not number e.g note/1",
    });
    return;
  }

  const note = await prisma.note.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      category: {
        omit: {
          userID: true,
        },
      },
    },
  });
  res.json(note);
};

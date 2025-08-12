import { CustomRequest } from "@/utility/types/custom-request";
import { noteSchemaInput } from "@/zodSchema/note-schema";
import { NextFunction, Response } from "express";
import prisma from "../../prisma/connect";
import { logger } from "@/utility/logger/winston";

/**
 * Creates a new note for the authenticated user.
 * - Connects or creates categories as needed.
 */
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

  res.status(200).json({ message: "Note created" });
};

/**
 * Retrieves notes for the authenticated user, optionally filtered by query string.
 * - Supports filters: category (`cat:`), title (`title:`), description (`desc:`).
 */
export const getNoteByUserID = async (
  req: CustomRequest<{}, { s: string; pageNo: string }>,
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
  const count = await prisma.note.count({
    where: {
      userID: user?.id,
    },
  });
  const list = await prisma.note.findMany({
    where: {
      userID: user?.id,
      OR: filter,
    },
    skip: parseInt(req.query.pageNo) * 5,
    take: 5,
    orderBy: {
      date: "desc",
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

  res.json({ notes: list, count });
};

/**
 * Retrieves a single note by ID.
 */
export const getNoteByID = async (
  req: CustomRequest<{}, {}, {}, {}, { id: string }>,
  res: Response
) => {
  const { id } = req.params;

  let parsedId = parseInt(id);
  if (!parsedId) {
    res.json({
      message: "Invalid note ID. Example: note/1",
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

/**
 * Middleware to check if a note exists by ID before proceeding.
 */
export const checkNoteExist = async (
  req: CustomRequest<noteSchemaInput | { id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const data = await prisma.note.findUnique({
    where: {
      id: req.body.id,
    },
  });
  if (!data) {
    res.status(404).json({ message: "Note doesn't exist" });
    return;
  }
  next();
};

/**
 * Deletes a note by ID.
 */
export const deleteNote = async (
  req: CustomRequest<{ id: number }>,
  res: Response
) => {
  await prisma.note.delete({
    where: {
      id: req.body.id,
    },
  });
  console.log("object");

  res.json({ message: "Data deleted successfully" });
};

export const updateNote = async (
  req: CustomRequest<noteSchemaInput>,
  res: Response
) => {
  console.log(req.body.category);
  const userID = req.app.locals.user?.id ?? "";
  await prisma.note.update({
    where: {
      id: req.body.id,
    },
    data: {
      title: req.body.title,
      date: new Date(),
      description: req.body.description,
      category: {
        connectOrCreate: req.body.category.map((e) => ({
          where: { name: e.categoryName },
          create: {
            name: e.categoryName,
            userID: userID,
          },
        })),
      },
    },
  });

  res.status(200).json({ message: "Data Updated Successfully" });
};

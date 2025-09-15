import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: {
          select: {
            name: true,
            avatarImage: true,
            socialMediaURL: true,
          },
        },
      },
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(`Error while getting users ${err}`);
  }
};

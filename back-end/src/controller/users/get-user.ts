import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      send: user,
    });
  } catch (error) {
    res.status(500).send(`Error while getting user: ${error}`);
  }
};

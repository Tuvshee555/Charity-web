import prisma from "../../prismaClient";
import { Response, Request } from "express";

export const getAllProfile = async (req: Request, res: Response) => {
  try {
    const allUser = await prisma.profile.findMany();
    res.status(200).send(allUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to get all user ${error}`,
    });
  }
};

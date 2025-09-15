import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        email,
      },
    });

    res.status(200).json({
      success: true,
      message: "Updated user successfully",
      user: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to update user: ${error.message}`,
    });
  }
};

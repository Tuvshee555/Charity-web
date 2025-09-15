import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Failed to delete user",
      error: error,
    });
  }
};

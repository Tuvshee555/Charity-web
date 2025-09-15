import bcrypt from "bcrypt";
import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const updateUserPassord = async (req: Request, res: Response) => {
  const { password, } = req.body;
  const { id } = req.params;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
       password: hashedPassword,
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

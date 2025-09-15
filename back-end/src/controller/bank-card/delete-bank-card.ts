import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const deleteBankCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCard = await prisma.bankCard.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Successfully deleted bankCard information",
      deletedCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete bankCard information",
      error: error,
    });
  }
};

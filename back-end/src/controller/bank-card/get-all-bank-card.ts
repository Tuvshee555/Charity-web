import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getAllBankCard = async (req: Request, res: Response) => {
  try {
    const bankCards = await prisma.bankCard.findMany();
    res.status(200).json({
      success: true,
      message: "Succesfully found all user",
      bankCards: bankCards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to find all user",
      error: error,
    });
  }
};

import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getBankCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bankCardData = await prisma.bankCard.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json({
      success: true,
      message: "Succesfully found bankcardData",
      bankCardData: bankCardData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to find bankcardData",
      error: error,
    });
  }
};

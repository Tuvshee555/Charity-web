 import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const updateBankCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    country,
    firstName,
    lastName,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    userId,
  } = req.body;
  try {
    const expiryDate = new Date(`${expiryYear}-${expiryMonth}-01`);
    const updatedCard = await prisma.bankCard.update({
      where: { id: Number(id) },
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate,
        year: parseInt(expiryYear, 10),
        cvc: parseInt(cvc, 10),
        user: {
          connect: { id: parseInt(userId, 10) },
        },
      },
    });
    res.status(201).json({
      success: true,
      message: "Successfully updated bankCard information",
      updatedCard: updatedCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated bankCard information",
      error: error,
    });
  }
};

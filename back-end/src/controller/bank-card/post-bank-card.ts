import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const postBankCard = async (req: Request, res: Response) => {
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

    const bankCard = await prisma.bankCard.create({
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
      message: "Successfully created bankCard information",
      bankCard: bankCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add bankCard information",
      error: error,
    });
  }
};
 
import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const postDonation = async (req: Request, res: Response) => {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeACoffee,
    donorId,
    recipientId,
  } = req.body;

  try {
    const donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donor: {
          connect: { id: donorId },
        },
        recipient: {
          connect: { id: recipientId },
        },
        // donorId: donorId,
        // recipientId: recipientId,
        // 2 uula ajilan
      },
    });

    res.status(201).json({
      success: true,
      message: "Successfully created donation",
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add donation",
      error,
    });
  }
};

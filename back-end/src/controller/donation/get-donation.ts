import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getDonation = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const donation = await prisma.donation.findUnique(id);
    res.status(200).json({
      message: "succesfully found donation",
      success: true,
      donation: donation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to find donation",
      success: false,
      error: error,
    });
  }
};

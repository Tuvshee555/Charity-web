import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const getAllDonation = async (req: Request, res: Response) => {
  try {
    const users = await prisma.donation.findMany();
    res.status(200).json({
      success: true,
      message: "Succesfully found all donation",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get donation",
    });
  }
};

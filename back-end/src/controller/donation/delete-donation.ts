import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const deleteDonation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const donation = await prisma.donation.delete({
      where: { id: Number(id) },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Succesffully deleted donation",
        data: donation,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

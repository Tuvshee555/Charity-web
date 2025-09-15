import prisma from "../../prismaClient.js";
import { Response, Request } from "express";

export const deleteUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProfile = await prisma.profile.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ success: true, data: deletedProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const getExploreProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const profileData = await prisma.profile.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!profileData) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully found user",
      profileData: profileData,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to find user",
      error: error,
    });
  }
};

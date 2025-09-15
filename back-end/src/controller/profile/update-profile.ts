import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const updateProfile = async (req: Request, res: Response) => {
  const { avatarImage, name, about, socialMediaURL, backgroundImage, ConfirmationMessage } = req.body;
  const { id } = req.params;

  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: Number(id) },
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: Number(id) },
      data: {
        avatarImage,
        name,
        about,
        socialMediaURL,
        backgroundImage: backgroundImage || "",
        ConfirmationMessage,
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileInfo: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
    });
  }
};

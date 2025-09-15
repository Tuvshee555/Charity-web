import { Request, Response } from "express";
import prisma from "../../prismaClient";

export const postProfile = async (req: Request, res: Response) => {
  const { avatarImage, name, about, socialMediaURL, backgroundImage, userId } =
    req.body;

  if (!avatarImage || !name || !about || !socialMediaURL || !userId) {
    res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      res.status(400).json({
        success: false,
        message: "Invalid userId. It should be a number.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userIdInt,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const newProfile = await prisma.profile.create({
      data: {
        avatarImage: avatarImage,
        userId: userIdInt,
        name: name,
        about: about,
        socialMediaURL: socialMediaURL,
        backgroundImage: backgroundImage || "",
        successMessage: "Profile created successfully",
        ConfirmationMessage:''
      },
    });

    res.status(201).json({
      success: true,
      message: "Successfully added profile data",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({
      success: false,
      message: `Failed to add profile data: ${error}`,
    });
  }
};

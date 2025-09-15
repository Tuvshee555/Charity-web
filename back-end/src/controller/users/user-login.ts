import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient";
import { Request, Response } from "express";

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email and password are required!",
    });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "This account does not exist!",
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || "your_default_secret_key",
      { expiresIn: "78h" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

import express from "express";
import { getAllProfile } from "../controller/profile/get-all-profile";
import { postProfile } from "../controller/profile/post-profile";
import { updateProfile } from "../controller/profile/update-profile";
import { getProfile } from "../controller/profile/get-profile";
import { getExploreProfile } from "../controller/profile/get-explore-profile";

export const profileRouter = express.Router();

profileRouter.get("/", getAllProfile);
profileRouter.get("/:id", getProfile);
profileRouter.post("/", postProfile);
profileRouter.put("/:id", updateProfile);
profileRouter.get("/d/:id", getExploreProfile);

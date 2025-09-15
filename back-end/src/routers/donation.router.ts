import express from "express";
import { getAllDonation } from "../controller/donation/get-all-donation";
import { postDonation } from "../controller/donation/post-donation";
import { deleteDonation } from "../controller/donation/delete-donation";

export const donationRouter = express.Router();

donationRouter.get("/", getAllDonation);
donationRouter.post("/", postDonation);
donationRouter.delete("/:id", deleteDonation);

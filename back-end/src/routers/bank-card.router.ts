import express from "express";
import { getAllBankCard } from "../controller/bank-card/get-all-bank-card";


import { getBankCard } from "../controller/bank-card/get-bank-card";
import { deleteBankCard } from "../controller/bank-card/delete-bank-card";
import { postBankCard } from "../controller/bank-card/post-bank-card";
import { updateBankCard } from "../controller/bank-card/update-bank-card";

export const bankCardRouter = express.Router();

bankCardRouter.get("/", getAllBankCard);
bankCardRouter.post("/", postBankCard); 
 bankCardRouter.put("/:id", updateBankCard); 
bankCardRouter.get("/:id", getBankCard);
bankCardRouter.delete("/:id", deleteBankCard);

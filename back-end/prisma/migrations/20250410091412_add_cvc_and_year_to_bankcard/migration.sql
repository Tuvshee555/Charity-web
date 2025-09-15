/*
  Warnings:

  - Added the required column `cvc` to the `BankCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `BankCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankCard" ADD COLUMN     "cvc" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

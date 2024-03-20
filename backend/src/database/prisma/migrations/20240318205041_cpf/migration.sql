/*
  Warnings:

  - Added the required column `cpf` to the `bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bet" ADD COLUMN     "cpf" TEXT NOT NULL;

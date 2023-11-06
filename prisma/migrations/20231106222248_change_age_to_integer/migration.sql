/*
  Warnings:

  - You are about to alter the column `age` on the `pets` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "age" SET DATA TYPE INTEGER;

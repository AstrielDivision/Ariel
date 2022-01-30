/*
  Warnings:

  - Added the required column `mod` to the `warnings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "warnings" ADD COLUMN     "mod" TEXT NOT NULL;

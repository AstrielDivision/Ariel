/*
  Warnings:

  - Made the column `prefix` on table `guild_settings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "guild_settings" ALTER COLUMN "prefix" SET NOT NULL;

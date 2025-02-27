/*
  Warnings:

  - Added the required column `brand` to the `Auctions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auctions" ADD COLUMN     "brand" TEXT NOT NULL;

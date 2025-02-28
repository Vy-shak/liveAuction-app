/*
  Warnings:

  - Changed the type of `registerdUsers` on the `Auctions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "registerdUsers",
ADD COLUMN     "registerdUsers" JSONB NOT NULL;

/*
  Warnings:

  - You are about to drop the column `registerdUsers` on the `Auctions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auctions" DROP COLUMN "registerdUsers";

-- CreateTable
CREATE TABLE "AuctionRegistration" (
    "auctionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AuctionRegistration_pkey" PRIMARY KEY ("auctionId","userId")
);

-- AddForeignKey
ALTER TABLE "AuctionRegistration" ADD CONSTRAINT "AuctionRegistration_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionRegistration" ADD CONSTRAINT "AuctionRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

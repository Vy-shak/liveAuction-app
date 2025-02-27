/*
  Warnings:

  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_OwnerId_fkey";

-- DropTable
DROP TABLE "Items";

-- CreateTable
CREATE TABLE "Auctions" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "auctionName" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "kmCovered" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "ownership" INTEGER NOT NULL,
    "discription" TEXT NOT NULL,
    "photos" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "registerdUsers" TEXT[],

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

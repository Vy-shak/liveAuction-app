-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auctions" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "auctionName" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "kmCovered" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "ownership" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "photos" TEXT[],
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionRegistration" (
    "auctionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AuctionRegistration_pkey" PRIMARY KEY ("auctionId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionRegistration" ADD CONSTRAINT "AuctionRegistration_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionRegistration" ADD CONSTRAINT "AuctionRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Device" (
    "assetTag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "purchaseYear" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("assetTag")
);

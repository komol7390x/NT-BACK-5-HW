-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "author" VARCHAR(128) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

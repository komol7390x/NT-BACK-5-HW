-- CreateTable
CREATE TABLE "public"."User2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Question2" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Question2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User3" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Game3" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "minRange" INTEGER NOT NULL DEFAULT 1,
    "maxRange" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Game3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Guess3" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Guess3_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Game3" ADD CONSTRAINT "Game3_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User3"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Guess3" ADD CONSTRAINT "Guess3_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game3"("id") ON DELETE CASCADE ON UPDATE CASCADE;

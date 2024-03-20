-- CreateTable
CREATE TABLE "BetEdition" (
    "id_e" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "finish" BOOLEAN NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BetEdition_pkey" PRIMARY KEY ("id_e")
);

-- CreateTable
CREATE TABLE "bet" (
    "id_e" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numbers" INTEGER[],
    "BetEdition_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bet_pkey" PRIMARY KEY ("id_e")
);

-- AddForeignKey
ALTER TABLE "bet" ADD CONSTRAINT "bet_BetEdition_id_fkey" FOREIGN KEY ("BetEdition_id") REFERENCES "BetEdition"("id_e") ON DELETE RESTRICT ON UPDATE CASCADE;

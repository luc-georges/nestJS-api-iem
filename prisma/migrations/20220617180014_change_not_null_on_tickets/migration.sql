-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "departure" DROP NOT NULL,
ALTER COLUMN "paid" SET DEFAULT false;

/*
  Warnings:

  - A unique constraint covering the columns `[id_github]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_github` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_github" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_github_key" ON "User"("id_github");

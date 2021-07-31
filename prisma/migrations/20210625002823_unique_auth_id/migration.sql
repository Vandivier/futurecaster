/*
  Warnings:

  - A unique constraint covering the columns `[fk_auth_id]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "app_users.fk_auth_id_unique" ON "app_users"("fk_auth_id");

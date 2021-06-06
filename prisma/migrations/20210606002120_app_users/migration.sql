-- CreateTable
CREATE TABLE "app_users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "fk_auth_id" UUID NOT NULL,
    "last_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

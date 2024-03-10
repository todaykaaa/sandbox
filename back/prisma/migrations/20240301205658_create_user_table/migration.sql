-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "create_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMPTZ(3),
    "login" VARCHAR(30) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "salt" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(25),
    "last_name" VARCHAR(25),
    "middle_name" VARCHAR(25),
    "phone_number" VARCHAR(25),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "create_date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMPTZ(3),
    "first_name" VARCHAR(25) NOT NULL,
    "last_name" VARCHAR(25),
    "middle_name" VARCHAR(25),
    "phone_number" VARCHAR(25) NOT NULL,
    "email" VARCHAR(30),
    "recalled" BOOLEAN NOT NULL DEFAULT false,
    "answered" BOOLEAN,
    "appointment" BOOLEAN,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "request_id_key" ON "request"("id");

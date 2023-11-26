-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTelegram" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "UserTelegram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "behavior" TEXT,
    "image" TEXT,
    "creator" TEXT,
    "count" TEXT,
    "message" TEXT,
    "userId" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "type" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordExpires" BIGINT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_chat" (
    "id" SERIAL NOT NULL,
    "chatid" TEXT,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "character_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users_character" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "users_character_pkey" PRIMARY KEY ("user_id","character_id")
);

-- CreateTable
CREATE TABLE "HealthPlan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthTracking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '_null',
    "dob" TEXT NOT NULL DEFAULT '_null',
    "gender" TEXT NOT NULL DEFAULT '_null',
    "email" TEXT NOT NULL DEFAULT '_null',
    "phone" TEXT NOT NULL DEFAULT '_null',
    "weight" TEXT NOT NULL DEFAULT '_null',
    "height" TEXT NOT NULL DEFAULT '_null',
    "bloodpressure" TEXT NOT NULL DEFAULT '_null',
    "pulse" TEXT NOT NULL DEFAULT '_null',
    "temperature" TEXT NOT NULL DEFAULT '_null',
    "oxysaturation" TEXT NOT NULL DEFAULT '_null',
    "bmi" TEXT NOT NULL DEFAULT '_null',
    "steps" TEXT NOT NULL DEFAULT '_null',
    "distance" TEXT NOT NULL DEFAULT '_null',
    "activeminutes" TEXT NOT NULL DEFAULT '_null',
    "calories" TEXT NOT NULL DEFAULT '_null',
    "exercisetype" TEXT NOT NULL DEFAULT '_null',
    "exeheartrate" TEXT NOT NULL DEFAULT '_null',
    "sleepduration" TEXT NOT NULL DEFAULT '_null',
    "sleepquality" TEXT NOT NULL DEFAULT '_null',
    "sleepstart" TEXT NOT NULL DEFAULT '_null',
    "sleepend" TEXT NOT NULL DEFAULT '_null',
    "sleepinter" TEXT NOT NULL DEFAULT '_null',
    "dailycalorie" TEXT NOT NULL DEFAULT '_null',
    "fbreakfast" TEXT NOT NULL DEFAULT '_null',
    "flunch" TEXT NOT NULL DEFAULT '_null',
    "fdinner" TEXT NOT NULL DEFAULT '_null',
    "fsnacks" TEXT NOT NULL DEFAULT '_null',
    "beverage" TEXT NOT NULL DEFAULT '_null',
    "chronichcond" TEXT NOT NULL DEFAULT '_null',
    "allergies" TEXT NOT NULL DEFAULT '_null',
    "symptoms" TEXT NOT NULL DEFAULT '_null',
    "hospitalize" TEXT NOT NULL DEFAULT '_null',
    "mood" TEXT NOT NULL DEFAULT '_null',
    "stress" TEXT NOT NULL DEFAULT '_null',
    "mentalsymptoms" TEXT NOT NULL DEFAULT '_null',
    "notes" TEXT NOT NULL DEFAULT '_null',
    "glucose" TEXT NOT NULL DEFAULT '_null',
    "cholesterol" TEXT NOT NULL DEFAULT '_null',
    "hemoglobin" TEXT NOT NULL DEFAULT '_null',
    "carbohydrate" TEXT NOT NULL DEFAULT '_null',
    "protiens" TEXT NOT NULL DEFAULT '_null',
    "fats" TEXT NOT NULL DEFAULT '_null',
    "vitamins" TEXT NOT NULL DEFAULT '_null',
    "minerals" TEXT NOT NULL DEFAULT '_null',
    "ecg" TEXT NOT NULL DEFAULT '_null',
    "goals" TEXT NOT NULL DEFAULT '_null',
    "bloodtype" TEXT NOT NULL DEFAULT '_null',
    "famimedical" TEXT NOT NULL DEFAULT '_null',
    "vaccrecord" TEXT NOT NULL DEFAULT '_null',
    "lifeassess" TEXT NOT NULL DEFAULT '_null',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "medicinename" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timeArray" TEXT[],
    "opted" BOOLEAN NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationMessage" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "smsId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "From" TEXT NOT NULL,
    "To" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_character_character_id_user_id_key" ON "users_character"("character_id", "user_id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_chat" ADD CONSTRAINT "character_chat_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_chat" ADD CONSTRAINT "character_chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_character" ADD CONSTRAINT "users_character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_character" ADD CONSTRAINT "users_character_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPlan" ADD CONSTRAINT "HealthPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthTracking" ADD CONSTRAINT "HealthTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

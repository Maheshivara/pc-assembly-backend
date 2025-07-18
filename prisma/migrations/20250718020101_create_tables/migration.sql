-- CreateTable
CREATE TABLE "CPU" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "cores" INTEGER,
    "threads" INTEGER,
    "speed" REAL,
    "turboSpeed" REAL,
    "tdp" INTEGER,
    "socket" TEXT,
    "graphics" TEXT,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "CPU_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "CPUCooler" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "upc" TEXT,
    "brand" TEXT,
    "sockets" TEXT,
    "height" INTEGER,
    "tdp" INTEGER,
    "eightMm" INTEGER,
    "nintyTwoMm" INTEGER,
    "oneHundredTwentyMm" INTEGER,
    "oneHundredFortyMm" INTEGER,
    "twoHundredMm" INTEGER,
    "adicionalFan" BOOLEAN,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "CPUCooler_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "CPU_Cooler" (
    "cpu_mpn" TEXT NOT NULL,
    "cooler_mpn" TEXT NOT NULL,

    CONSTRAINT "CPU_Cooler_pkey" PRIMARY KEY ("cpu_mpn","cooler_mpn")
);

-- CreateTable
CREATE TABLE "CPU_PlacaMae" (
    "cpu_mpn" TEXT NOT NULL,
    "placamae_mpn" TEXT NOT NULL,

    CONSTRAINT "CPU_PlacaMae_pkey" PRIMARY KEY ("cpu_mpn","placamae_mpn")
);

-- CreateTable
CREATE TABLE "FonteDeAlimentacao" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "power" INTEGER,
    "efficiency" TEXT,
    "type" TEXT,
    "eightPin" INTEGER,
    "sixPin" INTEGER,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "FonteDeAlimentacao_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "GPU" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "length" INTEGER,
    "widthSlots" REAL,
    "eightPin" INTEGER,
    "sixPin" INTEGER,
    "hdmi" INTEGER,
    "dp" INTEGER,
    "dvi" INTEGER,
    "vga" INTEGER,
    "boostClockSpeed" REAL,
    "vram" INTEGER,
    "memoryClockSpeed" REAL,
    "tdp" INTEGER,
    "sync" TEXT,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "GPU_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "HD" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "formFactor" TEXT,
    "capacity" INTEGER,
    "rpm" INTEGER,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "HD_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "MemoriaRAM" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "type" TEXT,
    "capacity" INTEGER,
    "clockSpeed" INTEGER,
    "timings" TEXT,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "MemoriaRAM_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "PlacaMae" (
    "name" TEXT,
    "brand" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "upc" TEXT,
    "socket" TEXT,
    "chipset" TEXT,
    "formFactor" TEXT,
    "memoryType" TEXT,
    "memoryCapacity" INTEGER,
    "memorySlots" INTEGER,
    "memorySpeed" TEXT,
    "sataSlots" INTEGER,
    "m2PCI3Slots" INTEGER,
    "m2PCI4Slots" INTEGER,
    "extensionPCI3x1" INTEGER,
    "extensionPCI3x4" INTEGER,
    "extensionPCI3x8" INTEGER,
    "extensionPCI3x16" INTEGER,
    "extensionPCI4x1" INTEGER,
    "extensionPCI4x4" INTEGER,
    "extensionPCI4x8" INTEGER,
    "extensionPCI4x16" INTEGER,
    "usb3Slots" INTEGER,
    "usb3Headers" INTEGER,
    "usb3CSlots" INTEGER,
    "vga" INTEGER,
    "dvi" INTEGER,
    "dp" INTEGER,
    "hdmi" INTEGER,
    "wifi" TEXT,
    "graphics" TEXT,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "PlacaMae_pkey" PRIMARY KEY ("mpn")
);

-- CreateTable
CREATE TABLE "PlacaMae_MemoriaRAM" (
    "placamae_mpn" TEXT NOT NULL,
    "memoriaram_mpn" TEXT NOT NULL,

    CONSTRAINT "PlacaMae_MemoriaRAM_pkey" PRIMARY KEY ("placamae_mpn","memoriaram_mpn")
);

-- CreateTable
CREATE TABLE "SSD" (
    "name" TEXT,
    "mpn" TEXT NOT NULL,
    "ean" TEXT,
    "brand" TEXT,
    "formFactor" TEXT,
    "protocol" TEXT,
    "capacity" INTEGER,
    "nandType" TEXT,
    "controller" TEXT,
    "imageUrl" TEXT,
    "originalUrl" TEXT,
    "productUrl" TEXT,

    CONSTRAINT "SSD_pkey" PRIMARY KEY ("mpn")
);

-- AddForeignKey
ALTER TABLE "CPU_Cooler" ADD CONSTRAINT "CPU_Cooler_cooler_mpn_fkey" FOREIGN KEY ("cooler_mpn") REFERENCES "CPUCooler"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CPU_Cooler" ADD CONSTRAINT "CPU_Cooler_cpu_mpn_fkey" FOREIGN KEY ("cpu_mpn") REFERENCES "CPU"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CPU_PlacaMae" ADD CONSTRAINT "CPU_PlacaMae_cpu_mpn_fkey" FOREIGN KEY ("cpu_mpn") REFERENCES "CPU"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CPU_PlacaMae" ADD CONSTRAINT "CPU_PlacaMae_placamae_mpn_fkey" FOREIGN KEY ("placamae_mpn") REFERENCES "PlacaMae"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlacaMae_MemoriaRAM" ADD CONSTRAINT "PlacaMae_MemoriaRAM_memoriaram_mpn_fkey" FOREIGN KEY ("memoriaram_mpn") REFERENCES "MemoriaRAM"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlacaMae_MemoriaRAM" ADD CONSTRAINT "PlacaMae_MemoriaRAM_placamae_mpn_fkey" FOREIGN KEY ("placamae_mpn") REFERENCES "PlacaMae"("mpn") ON DELETE NO ACTION ON UPDATE NO ACTION;

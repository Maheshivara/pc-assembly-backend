CREATE SCHEMA IF NOT EXISTS desktop
  AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA desktop
  IS 'standard public schema';

GRANT USAGE ON SCHEMA desktop TO postgres;

GRANT ALL ON SCHEMA desktop TO pg_database_owner;

CREATE TABLE IF NOT EXISTS desktop."CPUCooler" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "upc" text,
  "brand" text,
  "sockets" text,
  "height" integer,
  "tdp" integer,
  "eightMm" integer,
  "nintyTwoMm" integer,
  "oneHundredTwentyMm" integer,
  "oneHundredFortyMm" integer,
  "twoHundredMm" integer,
  "adicionalFan" boolean,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."CPU" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "cores" integer,
  "threads" integer,
  "speed" real,
  "turboSpeed" real,
  "tdp" integer,
  "socket" text,
  "graphics" text,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."GPU" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "length" integer,
  "widthSlots" real,
  "eightPin" integer,
  "sixPin" integer,
  "hdmi" integer,
  "dp" integer,
  "dvi" integer,
  "vga" integer,
  "boostClockSpeed" real,
  "vram" integer,
  "memoryClockSpeed" real,
  "tdp" integer,
  "sync" text,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."HD" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "formFactor" text,
  "capacity" integer,
  "rpm" integer,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."MemoriaRAM" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "type" text,
  "capacity" integer,
  "clockSpeed" integer,
  "timings" text,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."PlacaMae" (
  "name" text,
  "brand" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "upc" text,
  "socket" text,
  "chipset" text,
  "formFactor" text,
  "memoryType" text,
  "memoryCapacity" integer,
  "memorySlots" integer,
  "memorySpeed" text,
  "sataSlots" integer,
  "m2PCI3Slots" integer,
  "m2PCI4Slots" integer,
  "extensionPCI3x1" integer,
  "extensionPCI3x4" integer,
  "extensionPCI3x8" integer,
  "extensionPCI3x16" integer,
  "extensionPCI4x1" integer,
  "extensionPCI4x4" integer,
  "extensionPCI4x8" integer,
  "extensionPCI4x16" integer,
  "usb3Slots" integer,
  "usb3Headers" integer,
  "usb3CSlots" integer,
  "vga" integer,
  "dvi" integer,
  "dp" integer,
  "hdmi" integer,
  "wifi" text,
  "graphics" text,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."FonteDeAlimentacao" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "power" integer,
  "efficiency" text,
  "type" text,
  "eightPin" integer,
  "sixPin" integer,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."SSD" (
  "name" text,
  "mpn" text PRIMARY KEY,
  "ean" text,
  "brand" text,
  "formFactor" text,
  "protocol" text,
  "capacity" integer,
  "nandType" text,
  "controller" text,
  "imageUrl" text,
  "originalUrl" text,
  "productUrl" text
);

CREATE TABLE IF NOT EXISTS desktop."CPU_Cooler" (
  "cpu_mpn" text,
  "cooler_mpn" text,
  PRIMARY KEY ("cpu_mpn", "cooler_mpn")
);

CREATE TABLE IF NOT EXISTS desktop."CPU_PlacaMae" (
  "cpu_mpn" text,
  "placamae_mpn" text,
  PRIMARY KEY ("cpu_mpn", "placamae_mpn")
);

CREATE TABLE IF NOT EXISTS desktop."PlacaMae_MemoriaRAM" (
  "placamae_mpn" text,
  "memoriaram_mpn" text,
  PRIMARY KEY ("placamae_mpn", "memoriaram_mpn")
);

ALTER TABLE desktop."CPU_Cooler" ADD FOREIGN KEY ("cpu_mpn") REFERENCES desktop."CPU" ("mpn");

ALTER TABLE desktop."CPU_Cooler" ADD FOREIGN KEY ("cooler_mpn") REFERENCES desktop."CPUCooler" ("mpn");

ALTER TABLE desktop."CPU_PlacaMae" ADD FOREIGN KEY ("cpu_mpn") REFERENCES desktop."CPU" ("mpn");

ALTER TABLE desktop."CPU_PlacaMae" ADD FOREIGN KEY ("placamae_mpn") REFERENCES desktop."PlacaMae" ("mpn");

ALTER TABLE desktop."PlacaMae_MemoriaRAM" ADD FOREIGN KEY ("placamae_mpn") REFERENCES desktop."PlacaMae" ("mpn");

ALTER TABLE desktop."PlacaMae_MemoriaRAM" ADD FOREIGN KEY ("memoriaram_mpn") REFERENCES desktop."MemoriaRAM" ("mpn");

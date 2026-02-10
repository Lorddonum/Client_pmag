import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, int, index, boolean, json } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  modelNumber: text("model_number").notNull(),
  description: text("description").notNull(),
  series: json("series").$type<string[]>().notNull().default([]),
  brand: text("brand").notNull(),
  application: text("application"),
  finish: text("finish"),
  material: text("material"),
  wattage: text("wattage"),
  dimensions: text("dimensions"),
  voltage: text("voltage"),
  color: text("color"),
  cri: text("cri"),
  cct: text("cct"),
  beamAngle: text("beam_angle"),
  image: text("image"),
  images: json("images").$type<string[]>(),
  catalogueUrl: text("catalogue_url"),
  technicalDrawingUrl: text("technical_drawing_url"),
  technicalDrawings: json("technical_drawings").$type<string[]>(),
  // Paralight-specific fields
  subSeries: json("sub_series").$type<string[]>().default([]),
  standardLength: text("standard_length"),
  diffuserFinish: text("diffuser_finish"),
  diffuserMaterial: text("diffuser_material"),
  accessories: text("accessories"),
  ledStripSize: text("led_strip_size"),
  installationMethod: text("installation_method"),
  // Packaging Information
  packagingMethodADesc: text("packaging_method_a_desc"),
  packagingMethodASpec: text("packaging_method_a_spec"),
  packagingMethodBDesc: text("packaging_method_b_desc"),
  packagingMethodBSpec: text("packaging_method_b_spec"),
  packagingMethodImage: text("packaging_method_image"),
  // Accessories Specification (JSON string for table data)
  accessoriesSpec: text("accessories_spec"),
  // Maglinear-specific fields
  mountingTrack: text("mounting_track"),
  conductionMethod: text("conduction_method"),
  maglinearName: text("maglinear_name"),
  inputVoltage: text("input_voltage"),
  outputVoltage: text("output_voltage"),
  wallThickness: text("wall_thickness"),
  cutOutSize: text("cut_out_size"),
  oneCct: text("one_cct"),
  threeCct: text("three_cct"),
  protectionRating: text("protection_rating"),
  bluetoothVersion: text("bluetooth_version"),
  adjustableAngle: text("adjustable_angle"),
  // Technical Specifications (JSON string for table data)
  technicalSpecs: text("technical_specs"),
  // Hot Selling flag
  hotSelling: boolean("hot_selling").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  modelNumber: text("model_number").notNull(),
  description: text("description").notNull(),
  series: text("series").array().notNull().default([]),
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
  image: text("image"),           // PostgreSQL text has no size limit — no mediumtext needed
  images: text("images").array(),
  catalogueUrl: text("catalogue_url"),
  technicalDrawingUrl: text("technical_drawing_url"),
  technicalDrawings: text("technical_drawings").array(),
  // Paralight-specific fields
  subSeries: text("sub_series").array().default([]),
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

// ── Analytics ─────────────────────────────────────────────────────────────────

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  productId: integer("product_id"),          // null = non-product page
  productName: text("product_name"),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const visitorEvents = pgTable("visitor_events", {
  id: serial("id").primaryKey(),
  country: text("country"),
  city: text("city"),
  ip: text("ip"),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type PageView = typeof pageViews.$inferSelect;
export type VisitorEvent = typeof visitorEvents.$inferSelect;

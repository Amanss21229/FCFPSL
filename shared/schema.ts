import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  gender: text("gender").notNull(),
  grade: text("grade").notNull(),
  fatherName: text("father_name").notNull(),
  motherName: text("mother_name").notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 15 }).notNull(),
  parentMobileNumber: varchar("parent_mobile_number", { length: 15 }).notNull(),
  alternateNumber: varchar("alternate_number", { length: 15 }),
  address: text("address").notNull(),
  photo: text("photo"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  whatsappNumber: z.string().min(10, "Valid number required"),
  parentMobileNumber: z.string().min(10, "Valid number required"),
  alternateNumber: z.string().optional(),
  photo: z.string().optional(),
});

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

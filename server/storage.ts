import { db } from "./db";
import {
  registrations,
  type InsertRegistration,
  type Registration
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistrations(): Promise<Registration[]>;
  deleteRegistration(id: number): Promise<void>;
  getRegistration(id: number): Promise<Registration | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await db
      .insert(registrations)
      .values(insertRegistration)
      .returning();
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations).orderBy(desc(registrations.createdAt));
  }

  async deleteRegistration(id: number): Promise<void> {
    await db.delete(registrations).where(eq(registrations.id, id));
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    const [registration] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, id));
    return registration;
  }
}

export const storage = new DatabaseStorage();

"use server";
import { query } from "@/libs/db";

export const createPatient = async (lastname: string, firstname: string) => {
  try {
    await query({
      query: `INSERT INTO patients (LastName, FirstName) VALUES (?, ?)`,
      values: [lastname, firstname],
    });
  } catch (error) {
    console.log("Failed to get patients ", error);
  }
};

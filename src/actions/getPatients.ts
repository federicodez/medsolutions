"use server";
import { query } from "@/libs/db";

export const getPatients = async () => {
  try {
    const patients = await query({
      query: "SELECT * FROM patients",
      values: [],
    });
    return patients;
  } catch (error) {
    console.log("Failed to get patients ", error);
  }
};

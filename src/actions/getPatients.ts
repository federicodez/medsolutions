"use server";
import prisma from "@/db";

export const getPatients = async () => {
  try {
    const patients = await prisma.patient.findMany();
    return patients;
  } catch (error) {
    console.log("Failed to get patients ", error);
  }
};

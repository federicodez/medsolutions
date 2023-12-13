"use server";
import prisma from "@/db";

export const createPatient = async (lastname: string, firstname: string) => {
  try {
    const name = `${firstname} ${lastname}`;
    await prisma.patient.create({
      data: { name },
    });
  } catch (error) {
    console.log("Failed to get patients ", error);
  }
};

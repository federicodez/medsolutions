"use client";

import type {
  Allergy,
  Note,
  Patient,
  PastMedicalHistory,
  PastSurgicalHistory,
  CurrentMedication,
  ProcedureDone,
  FamilyHistory,
  PainManagement,
} from "@/types";
import {
  Allergies,
  Notes,
  MedicalHistory,
  SurgicalHistory,
  CurrentMedical,
  SocialHist,
  ProcedureList,
  FamilyHist,
  PainManage,
} from ".";
import { useState, useEffect, Suspense } from "react";
import { getPatientNotes } from "@/actions/notes";
import { getPatientAllergies } from "@/actions/allergy";
import { getMedicalHistory } from "@/actions/medical-history";
import { getSurgicalHistory } from "@/actions/surgical-history";
import { getCurrentMedications } from "@/actions/current-medication";
import { getSocialHistory } from "@/actions/social-history";
import { getProceduresDone } from "@/actions/procedures-list";
import { getFamilyHistory } from "@/actions/family-history";
import { getPainManagement } from "@/actions/pain-management";
import moment from "moment";
import { HiX, HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { SocialHistory } from "@prisma/client";

type PatientDetailsProps = {
  patient: Patient;
};

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [medical, setMedical] = useState<PastMedicalHistory[]>([]);
  const [surgical, setSurgical] = useState<PastSurgicalHistory[]>([]);
  const [currentMedication, setCurrentMedication] = useState<
    CurrentMedication[]
  >([]);
  const [socialHistory, setSocialHistory] = useState<SocialHistory[]>([]);
  const [procedureDone, setProcedureDone] = useState<ProcedureDone[]>([]);
  const [familyHistory, setFamilyHistory] = useState<FamilyHistory[]>([]);
  const [painManagement, setPainManagement] = useState<PainManagement[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const allergies = await getPatientAllergies(patient.patient_id);
      if (allergies) {
        setAllergies(allergies);
      }
      const notes = await getPatientNotes(patient.patient_id);
      if (notes) {
        setNotes(notes);
      }
      const medical = await getMedicalHistory(patient.patient_id);

      if (medical) {
        setMedical(medical);
      }

      const surgical = await getSurgicalHistory(patient.patient_id);

      if (surgical) {
        setSurgical(surgical);
      }

      const medication = await getCurrentMedications(patient.patient_id);

      if (medication) {
        setCurrentMedication(medication);
      }

      const social = await getSocialHistory(patient.patient_id);

      if (social) {
        setSocialHistory(social);
      }

      const procedure = await getProceduresDone(patient.patient_id);

      if (procedure) {
        setProcedureDone(procedure);
      }

      const family = await getFamilyHistory(patient.patient_id);

      if (family) {
        setFamilyHistory(family);
      }

      const pain = await getPainManagement(patient.patient_id);

      if (pain) {
        setPainManagement(pain);
      }
    };
    getData();
  }, [patient.patient_id]);

  return (
    <div className="absolute top-0 left-0 pb-20 md:pb-0 md:left-20 w-full bg-gray-300 p-2 md:px-20 rounded-md">
      <div className="flex flex-col md:flex-row justify-between gap-2 border-2 border-black rounded-md p-2">
        <div className="flex flex-col">
          <div className="capitalize">
            {patient.name.split(" ").reverse().join(", ")}
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">dob:</span>
            <div>{moment(patient.dob).format("MMMM Do YYYY")}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Last Visit:</span>
            <div>{moment(patient.last_visit).format("L")}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Primary Insurance:</span>
            <div>{patient.primary_insurance}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">Provider:</span>
            <div>{patient.provider}</div>
          </div>
          <div className="flex flex-row gap-2">
            <span className="font-bold">Next Appt:</span>
            <div>{patient.next_appt}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        <Suspense fallback={<p>...loading</p>}>
          <Allergies
            patient={patient}
            allergies={allergies}
            setAllergies={setAllergies}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <MedicalHistory
            patient={patient}
            medical={medical}
            setMedical={setMedical}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <SurgicalHistory
            patient={patient}
            surgical={surgical}
            setSurgical={setSurgical}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <CurrentMedical
            patient={patient}
            currentMedication={currentMedication}
            setCurrentMedication={setCurrentMedication}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <SocialHist
            patient={patient}
            socialHistory={socialHistory}
            setSocialHistory={setSocialHistory}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <Notes patient={patient} notes={notes} setNotes={setNotes} />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <ProcedureList
            patient={patient}
            procedureDone={procedureDone}
            setProcedureDone={setProcedureDone}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <FamilyHist
            patient={patient}
            familyHistory={familyHistory}
            setFamilyHistory={setFamilyHistory}
          />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <PainManage
            patient={patient}
            painManagement={painManagement}
            setPainManagement={setPainManagement}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default PatientDetails;

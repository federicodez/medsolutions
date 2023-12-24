import { getPatient } from "@/actions/patients";
import { PatientDetails } from "../components";

const Patient = async ({ params }: { params: { patient_id: number } }) => {
  const { patient_id } = params;

  const patient = await getPatient(Number(patient_id));
  return patient ? <PatientDetails patient={patient} /> : null;
};

export default Patient;

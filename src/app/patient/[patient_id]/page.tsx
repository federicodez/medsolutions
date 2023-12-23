import { getPatient } from "@/actions/patients";
import PatientDetails from "./components/PatientDetails";

const Patient = async ({ params }: { params: { patient_id: number } }) => {
  const { patient_id } = params;

  const patient = await getPatient(patient_id);
  return <PatientDetails patient={patient} />;
};

export default Patient;

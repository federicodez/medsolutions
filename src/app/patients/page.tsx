import { CreatePatientForm, PatientList } from "./components";
import { getPatients } from "@/actions";

const Patients = async () => {
  try {
    const patients = await getPatients();

    return <PatientList patients={patients} />;
  } catch (error) {
    console.log("Failed to fetch patients ", error);
  }
  return <CreatePatientForm />;
};

export default Patients;

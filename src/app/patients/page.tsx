import { PatientList } from "./components";
import { getPatients } from "@/actions/patients";

const Patients = async () => {
  try {
    const patients = await getPatients();

    return patients ? <PatientList patients={patients} /> : null;
  } catch (error) {
    console.log("Failed to fetch patients ", error);
  }
};

export default Patients;

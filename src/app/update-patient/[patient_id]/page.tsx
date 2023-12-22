import UpdatePatientForm from "../components/UpdatePatientForm";
import { getPatient } from "@/actions/patients";

const UpdatePatient = async ({
  params,
}: {
  params: { patient_id: number };
}) => {
  const { patient_id } = params;
  try {
    const patient = await getPatient(Number(patient_id));
    return patient ? <UpdatePatientForm patient={patient} /> : null;
  } catch (err) {
    console.log("Failed to get patient ", err);
  }
};

export default UpdatePatient;

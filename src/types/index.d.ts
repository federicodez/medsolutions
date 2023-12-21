export type Patient = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  dob: DateTime;
  last_visit: DateTime;
  primary_insurance?: string;
  next_appt?: DateTime;
  allergy: string;
  past_medical_history?: string;
  past_surgical_history: string;
  current_medication?: string;
  social_history?: string;
  family_history?: string;
  pain_management?: string;
  procedure_list?: string;
};

export type SelectedPatient = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
};

export type Notes = {
  notes_id: number;
  note: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
}[];

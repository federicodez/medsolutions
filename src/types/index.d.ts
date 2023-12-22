export type Patient = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  dob: DateTime;
  last_visit: DateTime;
  primary_insurance?: string | null;
  next_appt?: DateTime | null;
  allergy: string;
  past_medical_history: string;
  past_surgical_history?: string | null;
  current_medication?: string | null;
  social_history?: string | null;
  family_history?: string | null;
  pain_management?: string | null;
  procedure_list?: string | null;
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

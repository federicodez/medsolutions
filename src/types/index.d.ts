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
};

export type Allergy = {
  allergy_id: number;
  allergy: string | null;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
  patient_id: number | null;
};

export type Past_Medical_History = {
  pmh_id: number;
  history: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Past_Surgical_History = {
  psh_id: number;
  history: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Current_Medication = {
  cm_id: number;
  medication: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Social_History = {
  sh_id: number;
  history: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Family_History = {
  fh_id: number;
  history: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Pain_Management = {
  pm_id: number;
  pain: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

export type Procedure_Done = {
  pd_id: number;
  procedure?: string | null;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
  patient_id: number | null;
};

export type Notes = {
  notes_id: number;
  note: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  patient_id: number;
};

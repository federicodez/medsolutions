export type Patient = {
  patient_id: number;
  name: string;
  provider: string;
  visit_status: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}[];

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

export type Patient = {
  id: number;
  name: string;
  provider?: string;
  visit_status?: string;
  createdAt: DateTime;
  updatedAt?: DateTime;
}[];

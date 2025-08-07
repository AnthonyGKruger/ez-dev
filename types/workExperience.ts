export interface IWorkExperience {
  id: string;
  company: string;
  role: string;
  summary: string | null;
  dateFrom: string;
  dateTo: string;
  comments: string[];
}

export interface IQualification {
  id: string;
  institution: string;
  qualification: string;
  dateFrom: string;
  dateTo: string;
  comments: string[];
  link?: string;
}

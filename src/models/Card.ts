export interface Card {
  id: string;
  name: string;
  desc: string;
  descLines?: string[];
  due: Date | null;
  dateLastActivity: Date;
  labels: [];
}

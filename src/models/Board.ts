import type { List } from "./List";
export interface Board {
  id: string;
  desc: string;
  name: string;
  url: string;
  dateLastActivity: Date;
  descLines?: string[];
  lists: List[];
}

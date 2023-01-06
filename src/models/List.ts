import { Card } from "./Card";
export interface List {
  cards: Card[];
  cloased: boolean;
  id: string;
  name: string;
}

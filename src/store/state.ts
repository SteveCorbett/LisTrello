import { List } from "./../models/List";
import { Board } from "@/models/Board";

export interface State {
  appName: string;
  trelloKey: string;
  trelloApiUrl: string;
  trelloUserToken: string | null;
  boards: Board[];
  background: string;
  currentBoard: Board | null;
  currentLists: List[];
}

// Yes, I know my Trello API key is here but any web jockey could find
// it in 2 seconds by examining the API calls from the browser!
export function state(): State {
  return {
    appName: "LisTrello",
    trelloKey: "8eb145825a2805f8c4861ccb66312d23",
    trelloApiUrl: "https://api.trello.com/1",
    trelloUserToken: null,
    boards: [],
    background: "#2238c9",
    currentBoard: null,
    currentLists: [],
  };
}

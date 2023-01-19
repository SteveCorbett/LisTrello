import { Organization } from "./../models/Organization";
import { User } from "./../models/User";
import { List } from "./../models/List";
import { Board } from "@/models/Board";

export interface State {
  appName: string;
  drawer: {
    drawerWidth: number;
    showDrawer: boolean;
    showTitle: boolean;
  };
  trelloKey: string;
  trelloApiUrl: string;
  trelloUserToken: string | null;
  boards: Board[];
  background: string;
  currentBoard: Board | null;
  currentLists: List[];
  organizations: Organization[];
  currentOrganisation: Organization | null;
  user: User | null;
}

// Yes, I know my Trello API key is here but any web jockey could find
// it in 2 seconds by examining the API calls from the browser!
export function state(): State {
  return {
    appName: "LisTrello",
    drawer: {
      drawerWidth: 256,
      showDrawer: false,
      showTitle: true,
    },
    trelloKey: "8eb145825a2805f8c4861ccb66312d23",
    trelloApiUrl: "https://api.trello.com/1",
    trelloUserToken: null,
    boards: [],
    background: "#2238c9",
    currentBoard: null,
    currentLists: [],
    organizations: [],
    currentOrganisation: null,
    user: null,
  };
}

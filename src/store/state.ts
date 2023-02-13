import type { Organization } from "./../models/Organization";
import type { User } from "./../models/User";
import type { List } from "./../models/List";
import type { Board } from "@/models/Board";
import { isMobile } from "is-mobile";

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
  isMobile: boolean;
  organizations: Organization[];
  currentOrganisation: Organization | null;
  user: User | null;
}

const mobile: boolean = isMobile();
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
    isMobile: mobile,
    organizations: [],
    currentOrganisation: null,
    user: null,
  };
}

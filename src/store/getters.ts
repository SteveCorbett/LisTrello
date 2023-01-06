import { Board } from "@/models/Board";
import { State } from "./state";

export const getters = {
  isAuthenticated(state: State): boolean {
    return state.trelloUserToken != null;
  },
  trelloUserToken(state: State): string | null {
    return state.trelloUserToken;
  },
  boards(state: State) {
    return state.boards;
  },
  currentLists(state: State) {
    return state.currentLists;
  },
  getBoardForId:
    (state: State) =>
    (id: string): Board | undefined => {
      const result = state.boards.find((board) => {
        return board.id === id;
      });
      return result;
    },
};

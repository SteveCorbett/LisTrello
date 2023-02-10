import type { User } from "./../models/User";
import { Organization } from "./../models/Organization";
import type { Board } from "@/models/Board";
import type { List } from "@/models/List";
import type { ActionContext } from "vuex";
import { boards, board, organizations, user } from "../utils/httpApi";
import type { State } from "./state";

const localStorageUserToken = "lisTrelloHash";

const clearCurrentBoard = (commit: any): void => {
  commit("SET_CURRENT_BOARD", null);
  commit("SET_CURRENT_LISTS", []);
};

export const actions = {
  login({ commit }: ActionContext<State, State>, token: string) {
    localStorage.setItem(localStorageUserToken, token);
    commit("LOGIN", token);
  },
  logout({ commit }: ActionContext<State, State>) {
    commit("LOGOUT");
    localStorage.removeItem(localStorageUserToken);
  },
  loadToken({ commit }: ActionContext<State, State>) {
    const trelloUserToken = localStorage.getItem(localStorageUserToken);
    commit("LOGIN", trelloUserToken);
  },
  get_boards(context: ActionContext<State, State>, organizationId: string) {
    context.commit("SET_BOARDS", null);
    context.commit("SET_CURRENT_BOARD", null);
    context.commit("SET_CURRENT_LISTS", []);
    boards.get(organizationId).then((data: Board[]) => {
      if (data) {
        data.forEach((board) => {
          board.descLines = board.desc.split("\n");
        });
        context.commit("SET_BOARDS", data);
        if (data.length > 0) {
          actions.get_lists_for_board(context, data[0].id);
        }
      }
    });
  },
  clear_current_board({ commit }: ActionContext<State, State>) {
    clearCurrentBoard(commit);
  },
  get_lists_for_board(
    { commit, getters }: ActionContext<State, State>,
    boardId: string
  ) {
    const inputBoard = getters["getBoardForId"](boardId);
    commit("SET_CURRENT_BOARD", inputBoard);
    commit("SET_CURRENT_LISTS", []);
    board.getLists(boardId).then((data: List[]) => {
      data.forEach((list) => {
        list.cards.forEach((card) => {
          card.descLines = card.desc.split("\n");
        });
      });
      commit("SET_CURRENT_LISTS", data);
    });
  },
  is_submitting_form({ commit }: ActionContext<State, State>, value: string) {
    commit("SET_IS_SUBMITTING_FORM", value);
  },
  setShowingTitle(
    { commit }: ActionContext<State, State>,
    value: { showTitle: boolean; drawerWidth: number }
  ) {
    commit("SET_SHOWING_TITLE", {
      showTitle: value.showTitle,
      drawerWidth: value.drawerWidth,
    });
  },
  get_user_orgs(context: ActionContext<State, State>) {
    Promise.all([user.get(), organizations.get()]).then(
      (values: [user: User, orgs: Organization[]]) => {
        if (values) {
          const user: User = values[0];
          let orgs: Organization[] = values[1];
          if (!orgs || typeof orgs === undefined) {
            orgs = [];
          }

          context.commit("SET_USER", user);
          context.commit("SET_ORGANIZATIONS", orgs);

          const currentOrg: Organization =
            orgs.find((org) => org.creationMethod === "teamify-auto") ||
            orgs.find((org) => org.idMemberCreator !== null) ||
            new Organization();
          const currentOrgId = currentOrg.id;

          if (currentOrgId !== "") {
            context.commit("SET_CURRENT_ORGANIZATION", currentOrg);
            actions.get_boards(context, currentOrgId);
          } else {
            clearCurrentBoard(context);
          }
        }
      }
    );
  },
};

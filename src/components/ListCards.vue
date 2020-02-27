<template>
  <v-row class="fill-height">
    <v-col cols="12" md="6">
      <v-select
        :items="boardList"
        :label="boardSelectLabel"
        :disabled="(boardList.length == 0)"
        item-text="name"
        item-value="id"
        @change="onSelectBoard"
        solo
      ></v-select>
      <v-select
        :disabled="!listAvailable"
        :items="boardsLists()"
        :label="listSelectLabel"
        item-text="name"
        item-value="id"
        solo
      ></v-select>
    </v-col>
    <v-col cols="12" md="6" height="100%">
      <v-card outlined class="pa-2" height="100%">
        <div v-if="trelloObj" id="trelloOutput">
          <h1>{{trelloObj.name}}</h1>
          <a :href="trelloObj.url">{{trelloObj.url}}</a>
          <br />
          <span v-if="trelloObj.dateLastActivity">
            Last Updated: {{trelloObj.dateLastActivity}}
            <br />
          </span>
          <div v-for="list in trelloObj.lists" v-bind:key="list.id">
            <h2>{{list.name}}</h2>
            <div v-for="card in trelloObj.cards" v-bind:key="card.id">
              <span v-if="card.idList == list.id">
                {{card.name}}
                <br />
              </span>
            </div>
          </div>
        </div>
        <div v-else>{{message}}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data: () => ({
    inputJSON: "",
    message: "",
    selectAll: [{ name: "Select All", id: "0" }]
  }),
  mounted() {
    this.LOADTOKEN();
    this.GET_BOARDS();
  },
  computed: {
    ...mapState({
      boardList: "boards",
      trelloObj: "currentBoard"
    }),
    ...mapGetters({
      stateBoardsLists: "lists"
    }),
    boardSelectLabel() {
      return this.boardList.length == 0
        ? "No boards available"
        : "Select board";
    },
    listAvailable() {
      return this.currentBoard && this.currentBoard.lists.length > 0;
    },
    listSelectLabel() {
      return this.listAvailable ? "Select list" : "No lists available";
    }
  },
  methods: {
    ...mapActions(["LOADTOKEN", "GET_BOARDS", "GET_LISTS_FOR_BOARD"]),

    onSelectBoard(boardId) {
      //console.log("onSelectBoard :", boardId);
      this.GET_LISTS_FOR_BOARD(boardId);
    },
    boardsLists() {
      switch (this.stateBoardsLists.length) {
        case 0:
          return [];
        case 1:
          return this.stateBoardsLists;
        case 2:
          this.selectAll[0].name = `Select Both Lists`;
          return this.selectAll.concat(this.stateBoardsLists);
        default:
          this.selectAll[0].name = `Select All ${this.stateBoardsLists.length} Lists`;
          return this.selectAll.concat(this.stateBoardsLists);
      }
    },
    onChangeInput(newText) {
      this.trelloObj = null;
      this.message = "";
      if (newText == "") return;
      try {
        var newTrelloObj = JSON.parse(newText);
        //console.log('It worked!', newTrelloObj);
        if (
          !newTrelloObj.name ||
          !newTrelloObj.url ||
          !newTrelloObj.lists ||
          !newTrelloObj.cards
        ) {
          this.message = "The input JSON does not appear to be from Trello";
          return;
        }
        this.message = JSON.stringify(newTrelloObj, null, "\t").replace(
          "\n",
          "</br>"
        );
        this.trelloObj = newTrelloObj;
      } catch (error) {
        this.message = "The input does not appear to be valid JSON: " + error;
        // console.log("Do-oh", error);
      }
    }
  }
};
</script>

<template>
  <v-container>
    <v-row class="noprint d-print-none">
      <v-col xd="12" sm="12" md="6">
        <v-select
          :items="boardList"
          :label="boardSelectLabel"
          :disabled="(boardList.length == 0)"
          item-text="name"
          item-value="id"
          @change="onSelectBoard"
          solo
        >
          <template v-slot:item="{ item }">
            <span v-if="item.desc != ''">{{ item.name }}: {{item.desc}}</span>
            <span v-else>{{ item.name }}</span>
          </template>
        </v-select>
        <v-select
          :disabled="!listAvailable"
          :items="boardsLists()"
          :label="listSelectLabel"
          :value="listValue"
          item-text="name"
          item-value="id"
          @change="onSelectList"
          solo
        ></v-select>

        <v-card class="mx-auto">
          <v-toolbar :color="background" dark dense>
            <v-toolbar-title>Options</v-toolbar-title>
          </v-toolbar>

          <v-list subheader flat>
            <v-list-item-group multiple>
              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="optionLabels"
                      color="primary"
                      @click.native="++updateSequence"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Show Labels</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="optionDescriptions"
                      color="primary"
                      @click.native="++updateSequence"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Show Card Descriptions</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="optionNumberLists"
                      color="primary"
                      @click.native="doNumbering(trelloObj.lists)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Number Lists</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="optionNumberCards"
                      color="primary"
                      @click.native="doNumbering(trelloObj.lists)"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Number Cards</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <v-card class="mt-3">
          <v-toolbar :color="background" dark dense>
            <v-toolbar-title>Print Options</v-toolbar-title>
          </v-toolbar>

          <v-list subheader flat>
            <v-list-item-group multiple>
              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox v-model="optionTitles" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Print Title</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ }">
                  <v-list-item-action>
                    <v-checkbox v-model="optionNewPage" color="primary"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Start List on New Page</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col v-if="trelloObj" xs="12" sm="12" md="6" height="100%" class="noprint">
        <v-card outlined class="pa-2 noprint" height="100%" :key="updateKey">
          <div id="trelloOutput">
            <h1>{{trelloObj.name}}</h1>
            <a :href="trelloObj.url">{{trelloObj.url}}</a>
            <br />
            <span v-if="trelloObj.dateLastActivity">
              Last Updated: {{trelloObj.dateLastActivity}}
              <br />
            </span>
            <div v-if="trelloObj.lists && trelloObj.lists.length == 0 && trelloObj.name > ''">
              <h3>This board has no lists</h3>
            </div>
            <div v-for="list in trelloObj.lists" :key="list.id">
              <h2>{{list.listNo}}{{list.name}}</h2>
              <div v-for="card in list.cards" :key="card.id">
                {{card.cardNo}}{{card.name}}
                <br />
                <div v-if="optionLabels">
                  <div
                    v-for="label in card.labels"
                    v-bind:key="label.id"
                    :class="label.color + 'Text ml-4 indented'"
                  >{{label.name}}</div>
                </div>
                <div v-if="optionDescriptions && card.desc != ''" class="ml-4 mb-3 indented">
                  <span v-html="card.desc"></span>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="printonly">
      <div v-if="trelloObj" id="trelloOutput" class="print" :key="updatePrintKey">
        <div v-if="optionTitles">
          <h1>{{trelloObj.name}}</h1>
          <a :href="trelloObj.url">{{trelloObj.url}}</a>
          <br />
          <span v-if="trelloObj.dateLastActivity">
            Last Updated: {{trelloObj.dateLastActivity}}
            <br />
          </span>
        </div>
        <div v-if="trelloObj.lists && trelloObj.lists.length == 0 && trelloObj.name > ''">
          <h3>This board has no lists</h3>
        </div>
        <div v-for="(list, index) in trelloObj.lists" v-bind:key="list.id">
          <div v-if="optionNewPage && index > 0" style="page-break-before:always;" />
          <h2>{{list.listNo}}{{list.name}}</h2>
          <div v-for="card in list.cards" v-bind:key="card.id">
            {{card.cardNo}}{{card.name}}
            <br />
            <div v-if="optionLabels">
              <div
                v-for="label in card.labels"
                v-bind:key="label.id"
                :class="label.color + 'Text ml-4 indented'"
              >{{label.name}}</div>
            </div>
            <div v-if="optionDescriptions && card.desc != ''" class="ml-4 mb-3 indented">
              <span v-html="card.desc"></span>
              <br />
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    listValue: null,
    selectAll: [{ name: "Select All", id: "0" }],
    optionLabels: true,
    optionDescriptions: true,
    optionNumberLists: false,
    optionNumberCards: false,
    optionTitles: true,
    optionNewPage: false,
    updateSequence: 1,
  }),
  mounted() {
    this.LOADTOKEN();
    if (this.trelloUserToken == null) {
      this.$router.push("login");
    }
    this.GET_BOARDS();
  },
  created() {
    this.CLEAR_CURRENT_BOARD();
    this.$watch(
      function() {
        return this.currentLists;
      },
      function() {
        //console.log("currentLists changed: ", newVal, " | was: ", oldVal);
        if (this.trelloObj) {
          this.trelloObj.lists = this.currentLists;
          this.doNumbering(this.trelloObj.lists);
        }
      }
    );
  },
  computed: {
    ...mapState({
      boardList: "boards",
      trelloObj: "currentBoard",
      currentLists: "currentLists",
      background: "background",
      trelloUserToken: "trelloUserToken"
    }),
    boardSelectLabel() {
      return this.boardList.length == 0
        ? "No boards available"
        : "Select board";
    },
    listAvailable() {
      return this.trelloObj && this.currentLists.length > 0;
    },
    listSelectLabel() {
      switch (this.currentLists.length) {
        case 0:
          return "No lists available";
        case 1:
          return this.currentLists[0].name;
        case 2:
          return "Select Both Lists";
        default:
          return `Select All ${this.currentLists.length} Lists`;
      }
    },
    updateKey() {
      return "UpdateKey" + this.updateSequence;
    },
    updatePrintKey() {
      return "PrintKey" + this.updateSequence;
    }
  },
  methods: {
    ...mapActions([
      "LOADTOKEN",
      "CLEAR_CURRENT_BOARD",
      "GET_BOARDS",
      "GET_LISTS_FOR_BOARD"
    ]),
    doNumbering(boardList) {
      if (boardList == null) return;
      var listNo = 0;
      boardList.forEach(list => {
        list.listNo = this.optionNumberLists ? ++listNo + ". " : "";
        var cardNo = 0;
        list.cards.forEach(card => {
          const cardNoPrefix = this.optionNumberLists ? listNo + "." : "";
          card.cardNo = this.optionNumberCards
            ? cardNoPrefix + ++cardNo + ". "
            : "";
        });
      });
      ++this.updateSequence;
    },
    onSelectBoard(boardId) {
      this.GET_LISTS_FOR_BOARD(boardId);
    },
    onSelectList(listId) {
      if (listId == "0") {
        this.trelloObj.lists = this.currentLists;
      } else {
        this.trelloObj.lists = this.currentLists.filter(list => {
          return list.id === listId;
        });
      }
      this.doNumbering(this.trelloObj.lists);
    },
    boardsLists() {
      switch (this.currentLists.length) {
        case 0:
          this.listValue = null;
          return [];
        case 1:
          this.listValue = this.currentLists[0].id;
          return this.currentLists;
        case 2:
          this.selectAll[0].name = "Select Both Lists";
          this.selectAll[0].id = "0";
          this.listValue = "0";
          return this.selectAll.concat(this.currentLists);
        default:
          this.selectAll[0].name = `Select All ${this.currentLists.length} Lists`;
          this.selectAll[0].id = "0";
          this.listValue = "0";
          return this.selectAll.concat(this.currentLists);
      }
    }
  }
};
</script>

<style>
@media print {
  h2 {
    margin-top: 4mm;
  }
}
@media all {
  .indented {
    margin-left: 10mm;
  }
  .blackText {
    color: black;
  }
  .blueText {
    color: blue;
  }
  .greenText {
    color: green;
  }
  .limeText {
    color: lime;
  }
  .orangeText {
    color: orange;
  }
  .pinkText {
    color: pink;
  }
  .purpleText {
    color: purple;
  }
  .redText {
    color: red;
  }
  .skyText {
    color: skyblue;
  }
  .yellowText {
    color: yellow;
  }
}
</style>

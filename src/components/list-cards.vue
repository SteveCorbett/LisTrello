<template>
  <v-container>
    <v-row class="noprint d-print-none">
      <v-col xd="12" sm="12" md="6">
        <v-select :items="boardList" :label="boardSelectLabel" :disabled="boardList.length == 0" item-title="name"
          item-value="id" @update:model-value="onSelectBoard" variant="solo">
        </v-select>

        <v-select :disabled="!listAvailable" :items="boardsLists()" :label="listSelectLabel" item-title="name"
          item-value="id" v-model="listValue" @update:model-value="onSelectList" variant="solo">
        </v-select>

        <v-card class="mx-auto">
          <v-toolbar :color="background" theme="dark" density="compact">
            <v-toolbar-title density="compact">Options</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionLabels" :color="background" @click="setCardOptions()" label="Show Labels"
                  density="compact"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionDescriptions" :color="background" @click="setCardOptions()"
                  label="Show Descriptions" density="compact"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionNumberLists" :color="background"
                  @click="doNumbering(trelloObj ? trelloObj.lists : [])" label="Number Lists"
                  density="compact"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionNumberCards" :color="background"
                  @click="doNumbering(trelloObj ? trelloObj.lists : [])" label="Number Cards"
                  density="compact"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionShowDates" :color="background" @click="setCardOptions()"
                  label="Show dates" density="compact"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item class="ml-6" density="compact">
              <template v-slot:default="{}">
                <v-list-item-action class="mr-2">
                  <v-checkbox-btn v-model="optionLocalDateFormat" :color="background" @click="setCardOptions()"
                    :disabled="!optionShowDates" label="Use local date format" density="compact"></v-checkbox-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mt-2">
          <v-toolbar :color="background" theme="dark" density="compact">
            <v-toolbar-title>Print Options</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionTitles" :color="background" density="compact"
                  label="Print Title"></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template v-slot:default="{}">
                <v-checkbox-btn v-model="optionNewPage" :color="background" density="compact"
                  label="Start List on New Page"></v-checkbox-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col v-if="trelloObj" xs="12" sm="12" md="6" height="100%" class="noprint">
        <CardView v-bind:board="trelloObj" :options="cardOptions" :key="updateKey + 'X'"></CardView>
      </v-col>
    </v-row>

    <v-row dense class="printonly">
      <div v-if="trelloObj" class="print" :key="updatePrintKey">
        <div v-if="optionTitles">
          <h1>{{ trelloObj.name }}</h1>
          <a :href="trelloObj.url">{{ trelloObj.url }}</a>
          <br />
          <span v-if="trelloObj.dateLastActivity && optionShowDates">
            Last Updated:
            {{ $filters.dateDisplay(trelloObj.dateLastActivity, optionLocalDateFormat) }}
            <br />
          </span>
          <div v-if="optionDescriptions && trelloObj.desc != null && trelloObj.desc != ''">
            <span v-for="(descLine, ix) in trelloObj.descLines" :key="trelloObj.id + 'P' + ix">
              {{ descLine }}
              <br />
            </span>
          </div>
        </div>
        <div v-if="trelloObj.lists && trelloObj.lists.length == 0 && trelloObj.name > ''">
          <h3>This board has no lists</h3>
        </div>
        <div v-for="(list, index) in trelloObj.lists" v-bind:key="list.id">
          <div v-if="optionNewPage && index > 0" style="page-break-before: always" />
          <h2>{{ list.listNo }}{{ list.name }}</h2>
          <div v-for="card in list.cards" v-bind:key="card.id">
            {{ card.cardNo }}{{ card.name }}
            <div v-if="optionShowDates && card.dateLastActivity" class="Text ml-5 indented">
              - Last Activity:
              {{ $filters.dateDisplay(card.dateLastActivity, optionLocalDateFormat) }}
            </div>
            <div v-if="optionShowDates && card.due" class="Text ml-5 indented">
              - Due Date: {{ $filters.dateDisplay(card.due, optionLocalDateFormat) }}
            </div>
            <div v-if="optionLabels">
              <div v-for="label in card.labels" v-bind:key="label.id" :class="label.color + 'Text ml-4 indented'">
                {{ label.name }}
              </div>
            </div>
            <div v-if="optionDescriptions && card.desc != ''" class="ml-4 mb-3 indented">
              <span v-for="(descLine, ix) in card.descLines" :key="card.id + 'P' + ix">
                {{ descLine }}
                <br />
              </span>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardView from "./cards-view.vue";

export default {
  components: { CardView },
  data: () => ({
    listValue: null,
    optionDescriptions: true,
    optionLabels: true,
    optionLocalDateFormat: true,
    optionNumberLists: false,
    optionNumberCards: false,
    optionShowDates: true,
    optionTitles: true,
    optionNewPage: false,
    selectAll: [{ name: "Select All", id: "0" }],
    updateSequence: 1,
    cardOptions: {},
  }),
  mounted() {
    this.loadToken();
    if (this.trelloUserToken == null) {
      this.$router.push("login");
    }
    this.get_boards();
  },
  created() {
    this.clear_current_board();
    this.$watch(
      function () {
        return this.currentLists;
      },
      function () {
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
      trelloUserToken: "trelloUserToken",
    }),
    boardSelectLabel() {
      return this.boardList.length == 0 ? "No boards available" : "Select board";
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
    },
  },
  methods: {
    ...mapActions([
      "loadToken",
      "clear_current_board",
      "get_boards",
      "get_lists_for_board",
    ]),
    doNumbering(boardList) {
      if (boardList == null) return;
      var listNo = 0;
      setTimeout(() => {
        boardList.forEach((list) => {
          list.listNo = this.optionNumberLists ? ++listNo + ". " : "";
          var cardNo = 0;
          list.cards.forEach((card) => {
            const cardNoPrefix = this.optionNumberLists ? listNo + "." : "";
            card.cardNo = this.optionNumberCards ? cardNoPrefix + ++cardNo + ". " : "";
          });
        });
        this.setCardOptions();
      }, 0);
    },
    onSelectBoard(boardId) {
      this.get_lists_for_board(boardId);
    },
    onSelectList(listId) {
      if (listId === "0") {
        this.trelloObj.lists = this.currentLists;
      } else {
        this.trelloObj.lists = this.currentLists.filter((list) => {
          return list.id === listId;
        });
      }
      this.doNumbering(this.trelloObj.lists);
    },
    boardsLists() {
      switch (this.currentLists.length) {
        case 0:
          this.listValue = "";
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
    },
    setCardOptions() {
      this.updateSequence++;
      setTimeout(() => {
        this.cardOptions = {
          showDescriptions: this.optionDescriptions,
          showLabels: this.optionLabels,
          useLocalDateFormat: this.optionLocalDateFormat,
          numberLists: this.optionNumberLists,
          numberCards: this.optionNumberCards,
          showDates: this.optionShowDates,
          showTitles: this.optionTitles,
          newPagePerList: this.optionNewPage
        }
      }, 0);
    },
  },
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

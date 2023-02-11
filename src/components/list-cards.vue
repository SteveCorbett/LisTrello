<template>
  <v-container class="fill-height">
    <v-row
      class="noprint d-print-none fill-height phoneScroll d-block d-md-flex"
    >
      <v-col xs="12" sm="12" md="6" class="screenScroll">
        <v-select
          v-model="currentOrgId"
          :items="organizations"
          :label="organisationSelectLabel"
          :disabled="organizations.length == 0"
          item-title="displayName"
          item-value="id"
          variant="solo"
          @update:model-value="onSelectOrg"
        >
        </v-select>

        <v-select
          v-model="currentBoardId"
          :items="boardList"
          :label="boardSelectLabel"
          :disabled="boardList.length == 0"
          item-title="name"
          item-value="id"
          variant="solo"
          @update:model-value="onSelectBoard"
        >
        </v-select>

        <v-select
          v-model="listValue"
          :disabled="!listAvailable"
          :items="boardsLists()"
          :label="listSelectLabel"
          item-title="name"
          item-value="id"
          variant="solo"
          @update:model-value="onSelectList"
        >
        </v-select>

        <v-card class="mx-auto">
          <v-toolbar :color="background" theme="dark" density="compact">
            <v-toolbar-title density="compact">Options</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionLabels"
                  :color="background"
                  label="Show Labels"
                  density="compact"
                  @click="setCardOptions()"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionDescriptions"
                  :color="background"
                  label="Show Descriptions"
                  density="compact"
                  @click="setCardOptions()"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionNumberLists"
                  :color="background"
                  label="Number Lists"
                  density="compact"
                  @click="doNumbering(currentBoard ? currentBoard.lists : [])"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionNumberCards"
                  :color="background"
                  label="Number Cards"
                  density="compact"
                  @click="doNumbering(currentBoard ? currentBoard.lists : [])"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionShowDates"
                  :color="background"
                  label="Show dates"
                  density="compact"
                  @click="setCardOptions()"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item class="ml-6" density="compact">
              <template #default="{}">
                <v-list-item-action class="mr-2">
                  <v-checkbox-btn
                    v-model="optionLocalDateFormat"
                    :color="background"
                    :disabled="!optionShowDates"
                    label="Use local date format"
                    density="compact"
                    @click="setCardOptions()"
                  ></v-checkbox-btn>
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
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionTitles"
                  :color="background"
                  density="compact"
                  label="Print Title"
                ></v-checkbox-btn>
              </template>
            </v-list-item>

            <v-list-item density="compact">
              <template #default="{}">
                <v-checkbox-btn
                  v-model="optionNewPage"
                  :color="background"
                  density="compact"
                  label="Start Each List on a New Page"
                ></v-checkbox-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col xs="12" sm="12" md="6" class="noprint screenScroll">
        <CardView
          v-if="currentBoard"
          :key="updateKey"
          :board="currentBoard"
          :options="cardOptions"
        ></CardView>
      </v-col>
    </v-row>

    <v-row dense class="printonly">
      <div v-if="currentBoard" class="print">
        <div v-if="optionTitles">
          <h1>{{ currentBoard.name }}</h1>
          <a :href="currentBoard.url">{{ currentBoard.url }}</a>
          <br />
          <span v-if="currentBoard.dateLastActivity && optionShowDates">
            Last Updated:
            {{
              $filters.dateDisplay(
                currentBoard.dateLastActivity,
                optionLocalDateFormat
              )
            }}
            <br />
          </span>
          <div
            v-if="
              optionDescriptions &&
              currentBoard.desc != null &&
              currentBoard.desc != ''
            "
          >
            <span
              v-for="(descLine, ix) in currentBoard.descLines"
              :key="currentBoard.id + 'P' + ix"
            >
              {{ descLine }}
              <br />
            </span>
          </div>
        </div>
        <div
          v-if="
            currentBoard.lists &&
            currentBoard.lists.length === 0 &&
            currentBoard.name > ''
          "
        >
          <h3>This board has no lists</h3>
        </div>
        <div v-for="(list, index) in currentBoard.lists" :key="list.id">
          <div
            v-if="optionNewPage && index > 0"
            style="page-break-before: always"
          />
          <h2>{{ list.listNo }}{{ list.name }}</h2>
          <div v-for="card in list.cards" :key="card.id">
            {{ card.cardNo }}{{ card.name }}
            <div
              v-if="optionShowDates && card.dateLastActivity"
              class="Text ml-5 indented"
            >
              - Last Activity:
              {{
                $filters.dateDisplay(
                  card.dateLastActivity,
                  optionLocalDateFormat
                )
              }}
            </div>
            <div v-if="optionShowDates && card.due" class="Text ml-5 indented">
              - Due Date:
              {{ $filters.dateDisplay(card.due, optionLocalDateFormat) }}
            </div>
            <div v-if="optionLabels">
              <div
                v-for="label in card.labels"
                :key="label.id"
                :class="label.color + 'Text ml-4 indented'"
              >
                {{ label.name }}
              </div>
            </div>
            <div
              v-if="optionDescriptions && card.desc != ''"
              class="ml-4 mb-3 indented"
            >
              <span
                v-for="(descLine, ix) in card.descLines"
                :key="card.id + 'P' + ix"
              >
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
    listSelectLabel: "",
    listValue: "",
    currentBoardId: "",
    currentOrgId: "",
    optionDescriptions: true,
    optionLabels: true,
    optionLocalDateFormat: true,
    optionNumberLists: false,
    optionNumberCards: false,
    optionShowDates: true,
    optionTitles: true,
    optionNewPage: false,
    organisationSelectLabel: "Finding workspaces...",
    boardSelectLabel: "",
    selectAll: [{ name: "Select All", id: "0" }],
    updateSequence: 1,
    cardOptions: {},
  }),
  computed: {
    ...mapState({
      boardList: "boards",
      currentBoard: "currentBoard",
      currentLists: "currentLists",
      currentOrganisation: "currentOrganisation",
      background: "background",
      organizations: "organizations",
      trelloUserToken: "trelloUserToken",
    }),
    listAvailable() {
      return this.currentBoard && this.currentLists.length > 0;
    },
    updateKey() {
      return "UKey" + this.updateSequence;
    },
  },
  mounted() {
    this.loadToken();
    if (this.trelloUserToken == null) {
      this.$router.push("login");
    }
    this.get_user_orgs();
  },
  created() {
    this.clear_current_board();
    this.$watch("organizations", () => {
      this.organisationSelectLabel =
        this.organizations.length === 0
          ? "No workspaces available"
          : "Select workspace";
    });
    this.$watch("currentOrganisation", (newVal) => {
      this.currentOrgId = newVal.id || "";
    });
    this.$watch("boardList", () => {
      this.boardSelectLabel =
        this.boardList.length === 0 ? "No boards available" : "Select board";
    });
    this.$watch("currentLists", () => {
      this.listSelectLabel = "No lists available";
      if (this.currentBoard) {
        this.currentBoard.lists = this.currentLists || [];
        this.listValue = "0";

        switch (this.currentBoard.lists.length) {
          case 0:
            break;
          case 1:
            this.listSelectLabel = this.currentLists[0].name;
            this.listValue = this.currentLists[0].id;
            break;
          case 2:
            this.listSelectLabel = "Select Both Lists";
            break;
          default:
            this.listSelectLabel = `Select All ${this.currentLists.length} Lists`;
        }
      }
    });
    this.$watch("currentBoard", (newVal) => {
      if (newVal) {
        this.currentBoardId = newVal.id;
        this.doNumbering(this.currentBoard.lists);
      } else {
        this.currentBoardId = "";
      }
    });
  },
  methods: {
    ...mapActions([
      "loadToken",
      "clear_current_board",
      "get_boards",
      "get_lists_for_board",
      "get_user_orgs",
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
            card.cardNo = this.optionNumberCards
              ? cardNoPrefix + ++cardNo + ". "
              : "";
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
        this.currentBoard.lists = this.currentLists;
      } else {
        this.currentBoard.lists = this.currentLists.filter((list) => {
          return list.id === listId;
        });
      }
      this.doNumbering(this.currentBoard.lists);
    },
    onSelectOrg(orgId) {
      this.get_boards(orgId);
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
          return this.selectAll.concat(this.currentLists);
        default:
          this.selectAll[0].name = `Select All ${this.currentLists.length} Lists`;
          this.selectAll[0].id = "0";
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
          newPagePerList: this.optionNewPage,
        };
      }, 0);
    },
  },
};
</script>

<style>
@media screen and (max-device-width: 960px) {
  .phoneScroll {
    overflow-y: auto;
  }
}

@media screen and (min-device-width: 961px) {
  .screenScroll {
    overflow-y: auto;
    height: 100%;
  }
}

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

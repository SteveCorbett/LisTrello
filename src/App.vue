<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row class="fill-height">
          <v-col cols="12" md="6">
            <v-textarea
              filled
              name="input"
              label="Paste Trello JSON Here"
              v-model="inputJSON"
              v-on:input="onChangeInput"
            ></v-textarea>
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
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020 Corbett Technologies Pty Limited</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    inputJSON: "",
    trelloObj: null,
    message: ""
  }),
  methods: {
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
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

    <v-app-bar app color="#02F" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="#02F" app>
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

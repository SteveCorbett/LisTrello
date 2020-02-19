<template>
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
</template>

<script>
export default {
  data: () => ({
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

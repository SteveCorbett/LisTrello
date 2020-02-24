<template>
  <v-content>
    <v-container>
      <v-card class="mx-auto" max-width="400">
        <v-card-text>
          <div>Welcome to</div>
          <p class="display-1 text--primary">LisTrello</p>
          <p>The Trello Card List Utility</p>
          <div class="text--primary">
            <p>
              So that we can list your cards you will need to
              sign in to your Trello account. Your details are not 
              available to us apart from a unique token that Trello
              provides us to read your boards, lists and cards.
            </p>
            <p>Selecting the button below will re-direct you to Trello.com.</p>
            <p>Once you have signed in to Trello you will be re-directed back here.</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn block rounded @click.native="Login">Sign In To Trello</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import store from "../store";

export default {
  mounted() {
    console.log(
      `Mounted: this.$route.query: ${this.$route.query}`,
      this.$route
    );
  },
  methods: {
    Login() {
      window.location = "https://trello.com/1" +
        "/authorize?expiration=1hour&name=" + store.state.appName +
        "&scope=read&response_type=token&key=" +
        store.state.trelloToken +
        "&return_url=http://localhost:8080/return&response_type=fragment";
    }
  }
};
</script>

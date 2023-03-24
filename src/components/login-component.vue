<template>
  <div class="d-flex align-center flex-column mx-4 my-4" data-cy="view-login">
    <v-card class="mx-auto" max-width="400" border>
      <v-card-text class="d-flex flex-column w-100">
        <div>Welcome to</div>
        <div class="text-h4 text--primary">LisTrello</div>
        <div>The Trello Card List Utility</div>
        <div class="text--primary overflow-y-auto">
          <p>
            So that we can list your cards you will need to sign in to your
            Trello account and grant us read only access. Your details are not
            available to us apart from a unique token that Trello provides us to
            read your boards, lists and cards for one hour only.
          </p>
          <p>Selecting the button below will re-direct you to Trello.com.</p>
          <p class="text-subtitle-1 font-weight-medium mb-0">Important!</p>
          <p>
            You will need to scroll down to the bottom of the Trello.com page to
            see the see the see the button to allow us to read your boards. Once
            you have signed in to Trello and granted us access you will be
            re-directed back to the goodies awaiting you here.
          </p>
        </div>
      </v-card-text>
      <v-card-actions class="w-100">
        <v-btn block class="button__full rounded-pill lt-grey" @click="Login"
          >Sign In To Trello</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import store from "../store";

export default {
  methods: {
    Login() {
      const expiration = import.meta.env.DEV ? "1day" : "1hour";
      window.location =
        "https://trello.com/1" +
        "/authorize?expiration=" +
        expiration +
        "&name=" +
        store.state.appName +
        "&scope=read&response_type=token&key=" +
        store.state.trelloKey +
        "&return_url=" +
        window.location.protocol +
        "//" +
        window.location.host +
        "&response_type=fragment";
    },
  },
};
</script>

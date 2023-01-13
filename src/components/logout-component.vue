<template>
  <v-main>
    <v-container>
      <v-row align="center">
        <v-card class="mx-auto" max-width="400">
          <v-card-text xs-12>
            <div>Log Out</div>
            <p class="text-h4 text--primary">LisTrello</p>
            <p>The Trello Card List Utility</p>
            <div class="text--primary">
              <p>
                Thank you for looking at LisTrello. When you select the button
                to log out we will discard the unique token that Trello provided
                to us when you logged in.
              </p>
              <p>
                You will be able to log back in and resume using this or another
                Trello account.
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-btn block rounded @click="LogOut" class="button__full mb-4">Log out from your Trello account</v-btn>
                <v-btn block rounded @click="ListBoards" class="button__full">Oops, don't log me out</v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["logout"]),
    ListBoards() {
      this.$router.push("listcards");
    },
    LogOut() {
      this.logout();
      this.$router.push("login");
    },
  },
};
</script>

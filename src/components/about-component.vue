<template>
  <v-container class="d-flex align-center flex-column fill-height">
    <v-card class="mx-auto fill-height mb-3 pb-13" border>
      <v-card-text flex-row xs-12 class="d-flex flex-column fill-height">
        <div flex-row class="mb-2">About LisTrello
          <p class="text-h4 text--primary">LisTrello</p>
          The Trello Card List Utility
        </div>
        <div flex-row class="text--primary fill-height overflow-y-auto pr-2">
          <p>
            Trello is a popular implementation of a "Kanban" board which is
            available with both free and commercial account options. More
            information regarding Kanban boards and Trello can be found by
            following the links in the references below.
          </p>
          <p>
            LisTrello provides the functionality of listing cards from a
            Trello board in a format suitable for printing or converting to
            PDF from either desktop or mobile devices using most popular
            browsers. It is possible to copy the listed cards into many
            third party applications, such as Word or Google Docs, for
            customised formatting.
          </p>
          <p>
            Unfortunately, all browsers are not created equal when it comes
            to printing. Some are more equal than others, and most display
            their own "personality" when generating printed output. There
            can even be differences between the same brand of browser on a
            desktop and mobile device. LisTrello works with most popular
            browsers but let us know if you have any issues via the contact
            us page.
          </p>
          <p>
            For those with a technical bent, Listrello is written in Vue.js
            and uses the Vuetify presentation library. The source code is
            available on GitHub, see the references below.
          </p>
          <p>
            You can send any comments, ideas, suggestions (good or bad) from
            our
            <a href="/#/contactUs" class="normal">Contact Us</a> page.
          </p>
          <p class="text-subtitle-1 font-weight-medium">References</p>
          <v-list density="compact" rounded class="pa-0">
            <v-list-item @click="OpenUrl('https://www.trello.com')">
              <v-list-item-title>The main Trello.com landing page</v-list-item-title>
            </v-list-item>
            <v-list-item @click="
              OpenUrl('https://en.wikipedia.org/wiki/Kanban_board')
            ">
              <v-list-item-title>The explaination of Kanban boards on
                Wikipedia</v-list-item-title>
            </v-list-item>
            <v-list-item @click="
              OpenUrl('https://github.com/SteveCorbett/LisTrello')
            ">
              <v-list-item-title>The source code for LisTrello on
                GitHub</v-list-item-title>
            </v-list-item>
            <v-list-item @click="OpenUrl('https://trello.com/b/VqWfpxIi/listrello')">
              <v-list-item-title>The Trello board we use to manage
                LisTrello</v-list-item-title>
            </v-list-item>
            <v-list-item @click="OpenUrl('https://vuejs.org/')">
              <v-list-item-title>The landing page for Vue.js</v-list-item-title>
            </v-list-item>
            <v-list-item @click="OpenUrl('https://www.vuetifyjs.com')">
              <v-list-item-title>The landing page for Vuetify</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions flex-row>
        <v-btn block rounded @click="DoReturn()" class="button__full">Home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    DoReturn() {
      this.$router.push("home");
    },
    OpenUrl(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped>
a.normal {
  color: #1976d2 !important;
}
</style>
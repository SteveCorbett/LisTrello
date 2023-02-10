<template>
  <v-container class="d-flex align-center flex-column fill-height">
    <v-card class="mx-auto fill-height mb-3 pb-13" border>
      <v-card-text flex-row xs-12 class="d-flex flex-column fill-height">
        <div flex-row class="mb-2">
          About LisTrello
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
            LisTrello provides the functionality of listing cards from a Trello
            board in a format suitable for printing or converting to PDF from
            either desktop or mobile devices using most popular browsers. It is
            possible to copy the listed cards into many third party
            applications, such as Word or Google Docs, for customised
            formatting.
          </p>
          <p>
            Unfortunately, all browsers are not created equal when it comes to
            printing. Some are more equal than others, and most display their
            own "personality" when generating printed output. There can even be
            differences between the same brand of browser on a desktop and
            mobile device. LisTrello works with most popular browsers but let us
            know if you have any issues via the contact us page.
          </p>
          <p>
            For those with a technical bent, Listrello is written in Vue.js and
            uses the Vuetify presentation library. The source code is available
            on GitHub, see the references below.
          </p>
          <p>
            You can send any comments, ideas, suggestions (good or bad) from our
            <a href="/#/contactUs" class="normal">Contact Us</a> page.
          </p>
          <p class="text-subtitle-1 font-weight-medium">References:</p>
          <v-list density="compact" class="pa-0">
            <v-list-item
              v-for="(link, ix) in links"
              :key="'link' + ix"
              class="rounded-pill"
              @click="openUrl(link.url)"
              v-tooltip="{
                content: link.hint,
                delay: { show: 500, hide: 500 },
              }"
              v-close-popper
            >
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions flex-row class="mx-4 mb-4">
        <v-btn block rounded @click="goHome()" class="button__full">Home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";

interface Link {
  text: string;
  hint: string;
  url: string;
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "About",
  setup() {
    const goHome = () => {
      console.log("Go home!");
      router.push("home");
    };
    const openUrl = (url: string) => {
      // hideHint = true;
      setTimeout(() => {
        hideHint = false;
        window.open(url, "_blank");
      }, 2500);
    };

    var hideHint: boolean = false;

    const links: Link[] = [
      {
        text: "The main Trello.com landing page!!",
        hint: "You can sign up here for a free or subscription account.",
        url: "https://www.trello.com",
      },
      {
        text: "The explaination of Kanban boards on Wikipedia",
        hint: "This is a good resourcs to find out more about Kanban boards.",
        url: "https://en.wikipedia.org/wiki/Kanban_board",
      },
      {
        text: "The source code for LisTrello on GitHub",
        hint: "Here's where you'll find all the juicy coding stuff that makes LisTrello tick!",
        url: "https://github.com/SteveCorbett/LisTrello",
      },
      {
        text: "The Trello board we use to manage LisTrello",
        hint: "Here's where we store our ideas on how to improve LisTrello and keep track of any issues we know about.",
        url: "https://trello.com/b/VqWfpxIi/listrello",
      },
      {
        text: "The landing page for Vue.Js, the framework we use to develop LisTrello",
        hint: "If you want to know about Vue.js, here's the place to start.",
        url: "https://vuejs.org/",
      },
      {
        text: "The landing page for Vuetify 3",
        hint: "We use Vuetify to implement the Material Design visual theme.",
        url: "https://next.vuetifyjs.com/",
      },
    ];

    return { goHome, hideHint, links, openUrl };
  },
});
</script>

<style scoped>
a.normal {
  color: #1976d2 !important;
}
</style>

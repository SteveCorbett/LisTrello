<template>
  <div class="d-flex align-center flex-column fill-height">
    <div class="text-h4 text--primary mb-2 mt-3 mt-md-0 align-content-center">
      What's New?
    </div>
    <div class="overflow-y-auto d-flex flex-column align-center">
      <v-card
        v-for="(release, index) in releases"
        :key="index"
        class="w-75 mb-2 py-1 flex-shrink-0"
        :title="release.description"
        :subtitle="release.date + ' ' + release.version"
        border
      >
        <v-card-text>
          <ul>
            <li
              v-for="(detail, ix) in release.details"
              :key="'rel' + release.version + ix"
            >
              {{ detail }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Release {
  date: string;
  version: string;
  description: string;
  details: string[];
}

export default defineComponent({
  name: "WhatsNew",
  setup() {
    const releases: Release[] = [
      {
        date: "June 2025",
        version: "3.0.6",
        description: "Maintenance Release",
        details: ["Technical Improvement: Various package updates"],
      },
      {
        date: "April 2025",
        version: "3.0.5",
        description: "Maintenance Release",
        details: ["Technical Improvement: Various package updates"],
      },
      {
        date: "February 2025",
        version: "3.0.4",
        description: "Maintenance Release",
        details: [
          "Minor visual updates",
          "Technical Improvement: Various package updates",
        ],
      },
      {
        date: "January 2025",
        version: "3.0.3",
        description: "Package Updates",
        details: ["Technical Improvement: Various package updates"],
      },
      {
        date: "February 2023",
        version: "3.0.2",
        description: "Handle Workspaces",
        details: [
          "Workspaces can now be selected",
          "Fixed printing a large gap on the first page on OSX Safari",
          "Fixed issue with only printing the first page (introduced in 3.0.1)",
          "Fixed various display issues introduced in 3.0.1",
          "Technical Improvement: Replace Webpack with Vite",
        ],
      },
      {
        date: "January 2023",
        version: "3.0.1",
        description: "Version 3 Upgrade",
        details: [
          "Added button to copy formatted lists to the clipboard on desktop devices. This enables formatted lists to be posted directly into applications, including Excel and Word",
          "Independent scrolling on options and lists view",
          "Improved layout on hand held devices",
          "Technical Improvement: Upgrade from Vue 2 to Vue 3",
          "Technical Improvement: Upgrade Vuex from 3.6.2 to 4.1.0",
          "Technical Improvement: Upgrade Vuetify from 2.5.8 to 3.1.1",
        ],
      },
      {
        date: "March 2020",
        version: "1.0.1",
        description: "Initial release",
        details: [],
      },
    ];

    return { releases };
  },
});
</script>

<style scoped>
.release {
  width: 98%;
}

li {
  margin-left: 1rem;
}
</style>

<template>
  <v-app>
    <v-layout>
      <v-app-bar :color="background" theme="dark" class="noprint d-print-none" app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon icon="mdi-menu" color="white" size="large"></v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
      </v-app-bar>

      <v-app-bar location="bottom" :color="background" class="noprint" app>
        <span class="text-white ml-6"><a href="https://www.corbtech.com.au" target="_blank">&copy; 2020-2023 Corbett
            Technologies Pty Limited</a></span>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" class="noprint d-print-none" temporary :width="drawerWidth" app>
        <Menu_Items></Menu_Items>
      </v-navigation-drawer>

      <v-main app>
        <router-view class="pt-xs-0 pt-md-0 mt-xs-0 mt-sm-4" />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Menu_Items from "./components/side-menu/menu-items.vue";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiEmailOutline,
  mdiHomeOutline,
  mdiInformationOutline,
  mdiMenu,
  mdiRepeat,
} from "@mdi/js";

export default {
  name: "App",
  components: {
    Menu_Items,
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapGetters(["drawerWidth"]),
    ...mapState({
      background: "background",
    }),
  },
};
</script>

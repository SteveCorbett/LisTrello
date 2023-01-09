<template>
  <v-app>


    <v-app-bar :color="background" theme="dark" class="noprint d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon icon="mdi-menu" color="white" size="large"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-main dense>
      <v-container>
        <v-navigation-drawer v-model="drawer" class="noprint d-print-none" temporary :width="drawerWidth">
          <v-list dense>
            <Menu_Items></Menu_Items>
          </v-list>
        </v-navigation-drawer>
        <router-view class="pt-xs-0 pt-md-8 mt-xs-0 mt-sm-4" />
      </v-container>
    </v-main>

    <v-footer :color="background" app class="noprint">
      <span class="text-white"><a href="https://www.corbtech.com.au" target="_blank">&copy; 2020-2023 Corbett
          Technologies Pty Limited</a></span>
    </v-footer>
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

<style>
a:link {
  color: white !important;
}

a:visited {
  color: white !important;
}

footer {
  z-index: 1020 !important;
}
</style>

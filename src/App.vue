<template>
  <v-app>
    <v-layout class="vh100 flex-grow-0">
      <v-app-bar
        :color="background"
        theme="dark"
        class="noprint d-print-none"
        app
        density="comfortable"
      >
        <v-app-bar-nav-icon
          id="nav-bar-icon"
          aria-label="Open or close the menu"
          class="border-md border-white"
          @click.stop="drawer = !drawer"
        >
          <v-icon icon="mdi-menu" color="white" size="large"></v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
      </v-app-bar>

      <v-app-bar
        location="bottom"
        :color="background"
        class="noprint"
        app
        density="compact"
      >
        <span class="text-white ml-6 scale-h">
          <a href="https://www.corbtech.com.au" target="_blank" class="footer">
            © 2020-{{ new Date().getFullYear() }} Corbett Technologies Pty Limited
          </a>
        </span>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        class="noprint d-print-none"
        temporary
        :width="drawerWidth"
        app
        aria-label="Menu"
        role="menu"
        data-cy="nav-drawer"
      >
        <Menu_Items></Menu_Items>
      </v-navigation-drawer>

      <v-main app data-cy="main-outlet">
        <router-view class="pt-xs-0 pt-md-0 mt-xs-0 mt-sm-4" />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Menu_Items from "./components/side-menu/menu-items.vue";

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

<style scoped>
@media print and (min-width: 600px) {
  .mt-sm-4 {
    margin-top: 0 !important;
  }
}
</style>

<style>
a.footer:link {
  color: white !important;
}

a.footer:visited {
  color: white !important;
}

.scale-h:hover {
  scale: 1.04;
}

@media print {
  .v-main {
    padding-top: 0;
    padding-bottom: 0;
  }

  .v-container {
    width: 100%;
    padding: 16px;
    margin-right: auto;
    margin-left: auto;
  }

  .v-row + .v-row--dense {
    margin-top: 0;
  }
}
</style>

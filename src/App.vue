<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" class="noprint d-print-none" temporary>
      <v-list dense>
        <v-list-item link @click="Home">
          <v-icon icon="mdi-home-outline" size="large"></v-icon>
          Home
          <v-tooltip location="right" activator="parent" offset="-100">
            Back to your lists.
          </v-tooltip>
        </v-list-item>

        <v-list-item link @click="LogOut" :disabled="!isAuthenticated">
          <v-icon icon="mdi-repeat" size="large"></v-icon>
          Log Out/Switch Account
          <v-tooltip location="right" activator="parent" offset="-100">
            <p>
              When you log in to Trello, we are given read only access to your account's
              boards for one hour only. Select this to log out immediately.
            </p>
            You may need to do this to switch to using a different Trello account.
          </v-tooltip>
        </v-list-item>

        <v-list-item link @click="miniVariant = !miniVariant">
          <v-icon v-if="miniVariant" icon="mdi-chevron-right" size="large"></v-icon>
          <v-icon v-else icon="mdi-chevron-left" size="large"></v-icon>
          Change menu size
          <v-tooltip location="right" activator="parent" offset="-100">
            {{ miniVariant? "Show the menu text": "Hide the menu text" }}
          </v-tooltip>
        </v-list-item>

        <v-list-item link @click="ContactUs">
          <v-icon icon="mdi-email-outline" size="large"></v-icon>
          Contact Us
          <v-tooltip location="right" activator="parent" offset="-100">
            Need to send us a comment, suggestion or idea? Click here...
          </v-tooltip>
        </v-list-item>

        <v-list-item link @click="About">
          <v-icon icon="mdi-information-outline" size="large"></v-icon>
          About
          <v-tooltip location="right" activator="parent" offset="-100">
            Wondering what LisTrello is all about? Click here...
          </v-tooltip>
        </v-list-item>

        <Menu_Item :item="menuItems[0]"> </Menu_Item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :color="background" theme="dark" class="noprint d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon icon="mdi-menu" color="white" size="large"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-main dense>
      <v-container>
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
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiEmailOutline,
  mdiHomeOutline,
  mdiInformationOutline,
  mdiMenu,
  mdiRepeat,
} from "@mdi/js";
import Menu_Item from "./components/menu_item";

export default {
  name: "App",
  components: {
    Menu_Item,
  },
  data: () => ({
    drawer: false,
    miniVariant: false,
    mdiChevronLeft,
    mdiChevronRight,
    mdiEmailOutline,
    mdiHomeOutline,
    mdiInformationOutline,
    mdiMenu,
    mdiRepeat,
    menuItems: [
      {
        target: "test",
        title: "test Item",
        tooltips: ["first line", "Second Line"],
        iconName: "mdi-email-outline",
      },
    ],
  }),
  computed: {
    ...mapGetters({ isAuthenticated: "isAuthenticated", atest: "atest" }),
    ...mapState({
      background: "background",
    }),
  },
  methods: {
    About() {
      this.drawer = false;
      this.$router.push("about");
    },
    ContactUs() {
      this.drawer = false;
      this.$router.push("contactUs");
    },
    Home() {
      this.drawer = false;
      this.$router.push("home");
    },
    LogOut() {
      this.drawer = false;
      this.$router.push("logout");
    },
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

header.v-app-bar {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 99999 !important;
}

footer {
  z-index: 99999 !important;
}

nav {
  margin-top: 4rem !important;
}
</style>

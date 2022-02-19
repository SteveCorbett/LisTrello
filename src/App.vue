<template>
  <v-app id="lisTrello">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="noprint d-print-none"
      :mini-variant="miniVariant"
      temporary
    >
      <template>
        <v-list dense>
          <v-tooltip right nudge-left="170" nudge-bottom="20">
            <template v-slot:activator="{ on }">
              <v-list-item link v-on="on" @click="Home">
                <v-list-item-action>
                  <custom-icon>{{ mdiHomeOutline }}</custom-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            Back to your lists.
          </v-tooltip>

          <v-tooltip
            right
            nudge-left="170"
            nudge-bottom="20"
            max-width="500"
            :disabled="!isAuthenticated"
          >
            <template v-slot:activator="{ on }">
              <v-list-item
                link
                v-on="on"
                @click="LogOut"
                :disabled="!isAuthenticated"
              >
                <v-list-item-action>
                  <custom-icon>{{ mdiRepeat }}</custom-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Log Out/Switch Account</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <p>
              When you log in to Trello, we are given read only access to your
              account's boards for one hour only. Select this to log out
              immediately.
            </p>
            You may need to do this to switch to using a different Trello
            account.
          </v-tooltip>

          <v-tooltip right nudge-left="170" nudge-bottom="20" class="noprint">
            <template v-slot:activator="{ on }">
              <v-list-item link v-on="on" @click="miniVariant = !miniVariant">
                <v-list-item-action>
                  <custom-icon v-if="miniVariant">{{
                    mdiChevronRight
                  }}</custom-icon>
                  <custom-icon v-else>{{ mdiChevronLeft }}</custom-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Change menu size</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            {{ miniVariant ? "Show the menu text" : "Hide the menu text" }}
          </v-tooltip>

          <v-tooltip right nudge-left="170" nudge-bottom="20" class="noprint">
            <template v-slot:activator="{ on }">
              <v-list-item link v-on="on" @click="ContactUs">
                <v-list-item-action>
                  <custom-icon>{{ mdiEmailOutline }}</custom-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Contact Us</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            Need to send us a comment, suggestion or idea? Click here.
          </v-tooltip>

          <v-tooltip right nudge-left="170" nudge-bottom="20" class="noprint">
            <template v-slot:activator="{ on }">
              <v-list-item link v-on="on" @click="About">
                <v-list-item-action>
                  <custom-icon>{{ mdiInformationOutline }}</custom-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>About</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            Wondering what LisTrello is all about? Click here..
          </v-tooltip>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app :color="background" dark class="noprint d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <custom-icon>{{ mdiMenu }}</custom-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-main dense>
      <v-container>
        <router-view class="pt-xs-0 pt-md-8 mt-xs-0 mt-sm-4" />
      </v-container>
    </v-main>

    <v-footer :color="background" app class="noprint">
      <span class="white--text"
        ><a href="https://www.corbtech.com.au" target="_blank"
          >&copy; 2020-2022 Corbett Technologies Pty Limited</a
        ></span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CustomIcon from "./components/CustomIcon";
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
  components: {
    CustomIcon,
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
  }),
  computed: {
    ...mapGetters(["isAuthenticated"]),
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
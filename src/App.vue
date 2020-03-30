<template>
  <v-app id="lisTrello">
    <v-navigation-drawer v-model="drawer" app class="noprint d-print-none">
      <v-list dense>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on" @click="Home">
              <v-list-item-action>
                <v-icon>mdi-home-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <p>Back to your lists.</p>
        </v-tooltip>

        <v-tooltip bottom :disabled="!isAuthenticated">
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on" @click="LogOut" :disabled="!isAuthenticated">
              <v-list-item-action>
                <v-icon>mdi-repeat</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Log Out/Switch Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <p>
            When you log in to Trello, we are given read only access to your account's boards
            for one hour only. Select this to log out immediately.
          </p>
          <p>
            You may need to do this
            to switch to using a different Trello account.
          </p>
        </v-tooltip>

        <v-tooltip bottom class="noprint">
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on" @click="ContactUs">
              <v-list-item-action>
                <v-icon>mdi-email-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Contact Us</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          Need to send us a comment, suggestion or idea? Click here.
        </v-tooltip>

        <v-tooltip bottom class="noprint">
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on" @click="About">
              <v-list-item-action>
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>About</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          Wondering what LisTrello is all about? Click here..
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :color="background" dark class="noprint d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>LisTrello - List Trello Cards</v-toolbar-title>
    </v-app-bar>

    <v-content dense>
      <v-container>
        <router-view class="pt-xs-0 pt-md-8 mt-xs-0 mt-sm-4" />
      </v-container>
    </v-content>
    <v-footer :color="background" app class="noprint">
      <span class="white--text">&copy; 2020 Corbett Technologies Pty Limited</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      background: "background"
    })
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
    }
  }
};
</script>

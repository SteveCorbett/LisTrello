<template>
  <div>Loading...</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    token: String,
  },
  mounted() {
    this.TokenHandler(this.$route);
  },
  methods: {
    ...mapActions(["login", "loadToken"]),
    ...mapGetters(["trelloUserToken"]),
    TokenHandler(route) {
      if (route.path != null && route.path.startsWith("/token=")) {
        const token = route.path.substr(7);
        this.login(token);
      } else {
        this.loadToken();
      }
      var token = this.trelloUserToken();

      if (!token) {
        this.$router.push("login");
      } else {
        this.$router.push("listcards");
      }
    },
  },
};
</script>

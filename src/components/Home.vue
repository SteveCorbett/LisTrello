<template>
  <div>Loading...</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    token: String
  },
  mounted() {
    this.TokenHandler(this.$route);
  },
  methods: {
    ...mapActions(["LOGIN", "LOADTOKEN"]),
    ...mapGetters(["trelloUserToken"]),
    TokenHandler(route) {
      if (route.hash != null && route.hash.startsWith("#token=")) {
        const token = route.hash.substr(7);
        this.LOGIN(token);
      } else {
        this.LOADTOKEN();
      }
      var token = this.trelloUserToken();
      
      if (!token) {
        this.$router.push("login");
      } else {
        this.$router.push("listcards");
      }
    }
  }
};
</script>

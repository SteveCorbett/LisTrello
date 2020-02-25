<template>
  <div>Loading...</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    token: String
  },
  watch: {
    token: function(newVal, oldVal) {
      // watch it
      console.log("token changed: ", newVal, " | was: ", oldVal);
      this.TokenHandler(this.$route);
    }
  },
  mounted() {
    //console.log(`Mounted: this.$route`, this.$route);
    this.TokenHandler(this.$route);
  },
  methods: {
    ...mapActions(["LOGIN", "LOADTOKEN"]),
    ...mapGetters(["trelloUserToken"]),
    TokenHandler(route) {
      if (route.hash != null && route.hash.startsWith("#token=")) {
        const token = route.hash.substr(7);
        console.log("Setting token = " + token);
        this.LOGIN(token);
      } else {
        console.log("No token, try loading from local storage!");
        this.LOADTOKEN();
      }
      var token = this.trelloUserToken();
      //console.log("token = " + token);

      if (!token) {
        this.$router.push("login");
      } else {
        this.$router.push("listcards");
      }
    }
  }
};
</script>

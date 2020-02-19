<template>
  <div>
    Home found!
    <v-btn @click.native="DoIt">Do-It!</v-btn>
    <v-btn @click.native="Login">Login</v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(`Mounted: this.$route.query: ${this.$route.query}`, this.$route);
  },
  methods: {
    DoIt() {
      console.log(`this.$route.query: ${this.$route.query}`, this.$route);
    },
    Login() {
        const token = "";
        window.location = "https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=" + token + "&return_url=http://localhost:8080/home&response_type=token"
    }
  }
};
</script>

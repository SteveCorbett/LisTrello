<template>
  <v-content>
    <v-container>
      <v-row align="center">
        <v-card class="mx-auto" max-width="500">
          <v-card-text xs-12>
            <div>Contact Us</div>
            <p class="display-1 text--primary">LisTrello</p>
            <p>The Trello Card List Utility</p>
            <div class="text--primary">
              <p>
                Thank you for looking at LisTrello. If you have any comments, ideas,
                suggestions (good or bad) or find a bug please let us know.
                Leave your email address if your would like me to reply, or just post
                anonymously.
              </p>
              <v-form
                name="LisTrello-comment"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="LisTrello-comment" />
                <v-text-field outlined name="email" label="E-mail" placeholder="Optional" xs="12"></v-text-field>
                <v-textarea
                  outlined
                  name="comments"
                  label="Comments"
                  xs="12"
                  v-model="comment"
                  required
                ></v-textarea>
                <v-btn
                  block
                  rounded
                  type="submit"
                  class="button__full mb-4"
                  :disabled="comment.length == 0"
                  @click="onSubmit"
                >Send Comment</v-btn>
                <v-btn block rounded @click.native="ListBoards" class="button__full">Cancel</v-btn>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {
    const isSubmittingForm = sessionStorage.getItem("isSubmittingForm");
    if (isSubmittingForm == "true") {
      this.IS_SUBMITTING_FORM("false");
      this.LOADTOKEN();
      if (this.trelloUserToken == null) {
        this.$router.push("login");
      } else {
        this.$router.push("listcards");
      }
    }
  },
  computed: {
    ...mapState({
      trelloUserToken: "trelloUserToken"
    })
  },
  methods: {
    ...mapActions(["IS_SUBMITTING_FORM", "LOADTOKEN"]),
    ListBoards() {
      this.$router.push("listcards");
    },
    onSubmit() {
      this.IS_SUBMITTING_FORM("true");
    }
  },
  data: () => ({
    comment: ""
  })
};
</script>
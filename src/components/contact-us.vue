<template>
  <v-main>
    <v-container>
      <v-row align="center">
        <v-card class="mx-auto overflow-y-auto" max-width="500" border>
          <v-card-text xs-12>
            <div>
              Contact Us
              <p class="text-h4 text--primary">LisTrello</p>
              The Trello Card List Utility
            </div>
            <div class="text--primary">
              <p>
                Thank you for looking at LisTrello. If you have any comments,
                ideas, suggestions (good or bad) or find a bug please let us
                know. Leave your email address if your would like me to reply,
                or just post anonymously.
              </p>
              <v-form
                name="LisTrello-comment"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="LisTrello-comment"
                />
                <v-text-field
                  variant="outlined"
                  name="email"
                  label="E-mail"
                  placeholder="Optional"
                  density="compact"
                  class="mt-2"
                  xs="12"
                ></v-text-field>
                <v-textarea
                  variant="outlined"
                  name="comments"
                  label="Comments"
                  xs="12"
                  v-model="comment"
                  density="compact"
                  required
                ></v-textarea>
                <v-btn
                  block
                  rounded
                  type="submit"
                  class="button__full mb-3"
                  :disabled="comment.length < 10"
                  @click="onSubmit"
                  >Send Comment</v-btn
                >
                <v-btn block rounded v-on:click="DoCancel" class="button__full"
                  >Cancel</v-btn
                >
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    const isSubmittingForm = sessionStorage.getItem("isSubmittingForm");
    if (isSubmittingForm == "true") {
      this.IS_SUBMITTING_FORM("false");
      this.$router.push("home");
    }
  },
  methods: {
    ...mapActions(["IS_SUBMITTING_FORM", "LOADTOKEN"]),
    DoCancel() {
      this.$router.push("home");
    },
    onSubmit() {
      this.IS_SUBMITTING_FORM("true");
    },
  },
  data: () => ({
    comment: "",
  }),
};
</script>

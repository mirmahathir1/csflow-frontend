<template>
  <PaddedContainer>
    <v-card :height="$isMobile() ?'100px':'100px'" class>
      <v-row class="pa-5 mt-2">
        <v-card-text class>
          <p class="text-center font-weight-normal text-h6 black--text">
            SignUp
          </p>
        </v-card-text>
      </v-row>
    </v-card>
    <v-card
      height="120px"
      class="mb-4 mt-4 mx-auto"
      :max-width="$isMobile()?'30vw':'30vw'"
      :min-width="$isMobile()?'30vw':'30vw'"
    >
      <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
        <v-card-text class>
          <p class="text-center">
            We have sent a link to your mail.
            Click the link to continue sign up.
          </p>
        </v-card-text>
      </v-row>
    </v-card>
    <!-- <v-card :height="$isMobile() ?'100px':'100px'" class="mb-4"></v-card> -->
  </PaddedContainer>
</template>

<script>
import PaddedContainer from "../../components/PaddedContainer1";
export default {
  title() {
    return "Sign up confirmation";
  },
  components: {
    PaddedContainer
  }
};
</script>

<style>
</style>
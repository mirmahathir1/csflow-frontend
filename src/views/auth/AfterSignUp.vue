<template>
  <PaddedContainer>
    <v-card :height="$isMobile() ?'60px':'100px'" class></v-card>
    <v-card height="100px" class>
      <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
        <v-card-text class>
          <p class="text-center">
            We have sent a link to your mail.
            Click the link to continue sign up.
          </p>
        </v-card-text>
      </v-row>
    </v-card>
    <v-card :height="$isMobile() ?'60px':'100px'" class></v-card>
  </PaddedContainer>
</template>

<script>
import PaddedContainer from "../../components/PaddedContainer";
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
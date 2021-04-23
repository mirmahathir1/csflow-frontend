<template>
  <v-card
    color="white"
    elevation="2"
    class="rounded-lg px-5 pt-8 pb-4 mt-6"
  >
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Title:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Title:</v-card-text>
            <v-text-field
                outlined
                class="rounded-lg"
                dense
                v-model="title"
                :error-messages="titleErrors"
                @blur="$v.title.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Post Type:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Post Type:</v-card-text>
            <v-radio-group
                v-model="type"
                mandatory
                class=""
            >
                <v-radio
                    label="Discussion"
                    value="discussion"
                ></v-radio>
                <v-radio
                    label="Question"
                    value="question"
                ></v-radio>
            </v-radio-group>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
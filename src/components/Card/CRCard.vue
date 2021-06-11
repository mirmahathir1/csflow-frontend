<template>
  <v-card
      v-if="!getLoaderFlag('crs')"
      class="rounded-lg px-5 pt-8 pb-4 mt-6"
  >
    <v-card-text class="text-h6 black--text text-center">CRs</v-card-text>
    <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="2" class="text-center" v-if="!$isMobile()">
        <v-card-text class="text-h6">Student ID</v-card-text>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-card-text class="text-h6">Profile</v-card-text>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <div class="mx-6">
      <hr class="my-divider">
    </div>

    <v-row
        v-for="cr in crs" :key="cr.id"
        class="my-2"
    >
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="3" md="3" class="text-center" v-if="!$isMobile()">
        <v-card-text class="text-body-2 text-md-body-1">
          {{ cr['studentId'] }}
        </v-card-text>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="9">
            <user-card
                :small="$isMobile()"
                :name="cr['name']"
                :ID="cr['studentId']"
                :karma="parseInt(cr['karma'])"
                class="mx-auto"
                :image="cr['image']"
                @click.native="$router.push('/user/' + cr['studentId'])"
            ></user-card>
          </v-col>
          <v-col cols="3" class="pt-8">
            <icon-button
                @click.native="onRemoveClicked(cr['studentId'])"
            >mdi-delete-outline</icon-button>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

<!--    Remove Dialog-->
    <v-dialog
        v-model="removeDialog"
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Demote user?
        </v-card-title>
        <v-card-text>Are you sure you want to remove privileged access from {{ removeItem }}?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="removeDialog = false"
          >
            No
          </v-btn>
          <v-btn
              color="red darken-1"
              text
              @click="onRemoveConfirmed"
              :loading="getLoaderFlag('crSubmission')"
              :disabled="getLoaderFlag('crSubmission')"
          >
            Yes
          </v-btn>
        </v-card-actions>
        <v-row class="justify-center" v-if="submitted && getCRSubmitError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getCRSubmitMessage }}
          </v-alert>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
  <details-loader v-else></details-loader>
</template>

<script>
import DetailsLoader from "@/components/DetailsLoader";
import UserCard from "@/components/Card/UserCard";
import {mapActions, mapGetters} from "vuex";
import IconButton from "@/components/IconButton";
export default {
  name: "CRCard",
  components: {IconButton, UserCard, DetailsLoader},
  props: {
    batch: {
      type: Number,
      default: -1,
    }
  },
  data() {
    return {
      removeDialog: false,
      removeItem: -1,
      submitted: false,
    };
  },
  computed: {
    ...mapGetters('admin', ['getLoaderFlag', 'getCRs', 'getCRSubmitMessage', 'getCRSubmitError']),
    crs() {
      return this.getCRs;
    }
  },
  methods: {
    ...mapActions('admin', ['loadCRs', 'submitCR']),
    onRemoveClicked(id) {
      this.removeItem = id;
      this.submitted = false;
      this.removeDialog = true;
    },
    onRemoveConfirmed() {
      const payload = {'promote': false};

      this.submitCR({id: this.removeItem, payload: payload})
          .then(response => {
            this.removeDialog = false;
            this.loadCRs(this.batch);
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.submitted = true;
          });
    }
  },
  mounted() {
    this.loadCRs(this.batch);
  }
}
</script>

<style scoped>

</style>
<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/thesis/">Theses Explorer</page-header>
    <page-subheader v-if="theses">Batch {{ batch }} Theses</page-subheader>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'" v-if="isMyBatch">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Create New Thesis</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click="logMe">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-container class="my-5" v-if="!getLoaderFlag('theses')">
      <v-row>
        <v-col
            :v-if="theses"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(thesis, index) in theses"
            :key="index"
        >
          <v-tooltip top :disabled="thesis['Title'].length <= 40">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <resource-card
                    type="school"
                    @click.native="$router.push('/archive/thesis/' + thesis['ID'])"
                >
                  {{ thesis['Title'] | shorten }}
                </resource-card>
              </div>
            </template>

            <v-container>
              <span class="caption">{{ thesis['Title'] }}</span>
            </v-container>
          </v-tooltip>
        </v-col>
        <v-col
            cols="12"
            class="justify-content-center"
            v-if="!theses || Object.keys(theses).length === 0"
        >
          <error-card v-if="!theses">No such batch exists</error-card>
          <error-card v-else>No theses found</error-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageSubheader from "@/components/PageSubheader";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "@/components/PaddedContainer";
import ErrorCard from "@/components/ErrorCard";

export default {
  name: "ThesesBatch",
  title() {
    return 'Theses';
  },
  data() {
    return {
      batch: this.$route.params.batch
    }
  },
  computed: {
    ...mapGetters('archive', ['getTheses', 'getLoaderFlag']),
    ...mapGetters('user', ['getLoadedUser']),
    theses() {
      if (this.getTheses) {
        return this.getTheses.payload;
      }

      return null;
    },
    isMyBatch() {
      if (this.getLoadedUser) {
        if (this.getLoadedUser['batchID'] === Number(this.batch)) {
          return true;
        }
      }

      return false;
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesesBatch']),
    ...mapActions('user', ['getProfile']),
    logMe() {
      this.$router.push('/archive/thesis/new');
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
      this.loadThesesBatch(this.batch);
    }
  },
  components: {
    ErrorCard,
    PaddedContainer,
    FoldersLoader,
    ResourceCard,
    PageHeader,
    PageSubheader
  },
  mixins: [mixins],
  mounted() {
    this.loadThesesBatch(this.batch);
    this.getProfile('me');
  },
}
</script>

<style scoped>

</style>
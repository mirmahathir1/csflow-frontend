<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/thesis/">Theses Explorer</page-header>
    <page-subheader>Batch {{ batch }} Theses</page-subheader>

    <v-container class="my-5" v-if="!getLoaderFlag('theses')">
      <v-row>
        <v-col
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

export default {
  name: "ThesesBatch",
  data() {
    return {
      batch: this.$route.params.batch
    }
  },
  computed: {
    ...mapGetters('archive', ['getTheses', 'getLoaderFlag']),
    theses() {
      if (this.getTheses) {
        return this.getTheses.payload;
      } else {
        return {};
      }
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesesBatch'])
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
      this.loadThesesBatch(this.batch);
    }
  },
  components: {
    PaddedContainer,
    FoldersLoader,
    ResourceCard,
    PageHeader,
    PageSubheader
  },
  mixins: [mixins],
  mounted() {
    this.loadThesesBatch(this.batch);
  },
}
</script>

<style scoped>

</style>
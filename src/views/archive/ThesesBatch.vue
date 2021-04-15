<template>
  <v-col
      cols="12"
      md="8"
  >
    <page-header>Theses Explorer</page-header>
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
          <v-tooltip bottom :disabled="thesis['Title'].length <= 40">
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

            <span class="caption">{{ thesis['Title'] }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>

  </v-col>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageSubheader from "@/components/PageSubheader";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';

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
    ...mapActions('archive', ['loadThesesBatch']),
    navigateTo(link) {
      window.open(link);
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
      this.loadThesesBatch(this.batch);
    }
  },
  components: {
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
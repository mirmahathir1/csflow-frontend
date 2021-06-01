<template>
  <padded-container>
    <page-header>Resource Manager / Batch {{ batch }}</page-header>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250" v-if="!getLoaderFlag('resources')">
        <v-card-text class="text-center text-body-2">Delete Resource Drive Link</v-card-text>
        <v-card-text class="pb-1 pl-6">Select Level-Term:</v-card-text>
        <v-select
            outlined
            dense
            rounded
            color="primary lighten-2"
            class="mx-3"
            clearable
            v-model="deleteLT"
            :items="levelTermsDelete"
        ></v-select>
        <v-card-actions class="mx-2">
          <v-btn
              block color="red darken-1 white--text" small
              @click="deleteLink"
              :disabled="!deleteLT || getDeleteFlag"
              :loading="getDeleteFlag"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
      <regular-loader v-else class="mt-8"></regular-loader>
    </template>

    <v-container class="my-5" v-if="!getLoaderFlag('resources')">
      <resource-form
          :levelTerms="levelTerms"
          @created="loadResources"
          class="mb-10"
      ></resource-form>

      <v-row>
        <v-col
            v-if="resources"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(resource, index) in resources"
            :key="index"
        >
          <resource-card
              type="folder"
              @click.native="navigateTo(resource['Link'])"
          >
            Level {{ resource["Level"]}} Term {{ resource["Term"]}}
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import {mapActions, mapGetters} from "vuex";
import ResourceCard from "@/components/ResourceCard";
import FoldersLoader from "@/components/FoldersLoader";
import ResourceForm from "@/components/Form/ResourceForm";
import RegularLoader from "@/components/Loader/RegularLoader";
export default {
  name: "ResourceManager",
  components: {RegularLoader, ResourceForm, FoldersLoader, ResourceCard, PageHeader, PaddedContainer},
  data() {
    return {
      deleteLT: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['getMe']),
    ...mapGetters('archive', ['getResources', 'getLoaderFlag']),
    getDeleteFlag() {
      return this.$store.getters['privileged/getLoaderFlag']('resourceDeletion');
    },
    batch() {
      return this.getMe['batchID'];
    },
    resources() {
      let ret = this.getResources(this.batch);
      if (ret) {
        return ret.sort((a, b) => {
          if (a["Level"] === b["Level"]) {
            return a["Term"] <= b["Term"] ? -1 : 1;
          } else {
            return a["Level"] < b["Level"] ? -1 : 1;
          }
        });
      }

      return null;
    },
    levelTerms() {
      let ret = []
      if (this.getResources(this.batch)) {
        let upper = (this.getMe['level']-1)*2 + this.getMe['term'];

        for (let idx = 0; idx < upper; idx++) {
          let level = Math.floor(idx/2) + 1;
          let term = idx % 2 === 0 ? 1 : 2;

          if (!this.resources.some(e => e['Level'] === level && e['Term'] === term)) {
            ret.push(level.toString() + '-' + term.toString());
          }
        }
      }

      return ret;
    },
    levelTermsDelete() {
      let ret = [];
      if (this.resources) {
        this.resources.forEach(e => {
          ret.push(e['Level'].toString() + '-' + e['Term'].toString());
        });
      }

      return ret;
    }
  },
  methods: {
    ...mapActions('archive', ['loadResources']),
    ...mapActions('privileged', ['deleteResource']),
    navigateTo(link) {
      window.open(link);
    },
    deleteLink() {
      this.deleteResource(this.deleteLT)
        .then(response => {
          this.loadResources();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.deleteLT = null;
        });
    },
  },
  mounted() {
    this.loadResources();
  },
}
</script>

<style scoped>

</style>
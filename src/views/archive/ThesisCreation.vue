<template>
  <padded-container>
    <page-header :back-button="batchID > 0" :back-route="'/archive/thesis/batch/' + batchID">Create New Thesis</page-header>

    <thesis-form
        v-if="loadForm"
        type="create"
        :prevTitle="title"
        :prevDescription="description"
        :prevLink="link"
        :prevAuthors="authors"
        :prevOwners="owners"
        :prevUserIndex="userIndex"
        :batchID="batchID"
        :tagAutocompleteItems="getThesisTags"
    ></thesis-form>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import ThesisForm from "@/components/ThesisForm";
import { mapGetters, mapActions } from 'vuex';
import DetailsLoader from "@/components/DetailsLoader";

export default {
  name: "ThesisCreation",
  title() {
    return 'Create Thesis';
  },
  data() {
    return {
      title: '',
      description: '',
      link: '',
      authors: [],
      owners: [],
      userIndex: 0,
      loadForm: false,
    };
  },
  computed: {
    ...mapGetters('archive', ['getThesisTags']),
    ...mapGetters('user', ['getLoadedUser', 'getUserLoaderFlag']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
  },
  methods: {
    ...mapActions('archive', ['createThesis', 'loadThesisTags']),
    ...mapActions('user', ['getProfile']),
  },
  components: {DetailsLoader, PageHeader, PaddedContainer, ThesisForm},
  async mounted() {
    await this.getProfile('me');
    await this.loadThesisTags(false);
    this.owners.push({id: this.getLoadedUser['id'].toString()});

    this.loadForm = true;
  }
}
</script>

<style scoped>

</style>
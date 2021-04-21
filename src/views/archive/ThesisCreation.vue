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
    ...mapGetters('user', ['getLoadedUser', 'getUserLoaderFlag']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
  },
  methods: {
    ...mapActions('archive', ['createThesis']),
    ...mapActions('user', ['getProfile']),
  },
  components: {DetailsLoader, PageHeader, PaddedContainer, ThesisForm},
  async mounted() {
    await this.getProfile('me');
    this.owners.push({id: this.getLoadedUser['id'].toString()});

    this.loadForm = true;
  }
}
</script>

<style scoped>

</style>
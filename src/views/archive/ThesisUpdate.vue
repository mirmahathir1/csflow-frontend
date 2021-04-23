<template>
  <padded-container>
    <page-header :back-button="batchID > 0" :back-route="'/archive/thesis/batch/' + batchID">Update Thesis</page-header>

    <thesis-form
        v-if="loadForm && authorized"
        type="update"
        :prevTitle="title"
        :prevDescription="description"
        :prevLink="link"
        :prevAuthors="authors"
        :prevOwners="owners"
        :prevUserIndex="userIndex"
        :batchID="batchID"
        :thesisID="thesisID"
    ></thesis-form>
    <error-card v-else-if="loadForm && !authorized" class="mt-5">
      You are not authorized to edit this thesis
    </error-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import ThesisForm from "@/components/ThesisForm";
import { mapGetters, mapActions } from 'vuex';
import DetailsLoader from "@/components/DetailsLoader";
import ErrorCard from "@/components/ErrorCard";

export default {
  name: "ThesisUpdate",
  data() {
    return {
      title: '',
      description: '',
      link: '',
      authors: [],
      owners: [],
      userIndex: 0,
      loadForm: false,
      authorized: true,
      thesisID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getThesisDetails']),
    ...mapGetters('user', ['getLoadedUser', 'getUserLoaderFlag']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
    userID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['id'];
      }

      return -1;
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails']),
    ...mapActions('user', ['getProfile']),
    async updateProps() {
      this.loadForm = false;
      this.userIndex = -1;

      await this.getProfile('me');
      this.loadThesisDetails({id: this.thesisID, force: false})
        .then(response => {
          const details = this.getThesisDetails.payload;

          this.title = details['title'];
          this.description = details['description'];
          this.link = details['link'];

          this.authors = [];
          details['writers'].forEach(writer => {
            this.authors.push({name: writer});
          });

          this.owners = [];
          details['owners'].forEach(owner => {
            this.owners.push({id: owner['ID'].toString()});

            if (owner['ID'] === this.userID) {
              this.userIndex = details['owners'].indexOf(owner);
            }
          });

          if (this.userIndex === -1) {
            this.authorized = false;
          }
        })
        .catch(e => {
          console.log(e.response);
          this.$router.push('/archive/thesis');
        })
        .finally(() => {
          this.loadForm = true;
        });
    }
  },
  watch: {
    '$route'(to, from) {
      this.thesisID = to.params.id;
      this.updateProps();
    }
  },
  components: {ErrorCard, DetailsLoader, PageHeader, PaddedContainer, ThesisForm},
  mounted() {
    this.updateProps();
  }
}
</script>

<style scoped>

</style>
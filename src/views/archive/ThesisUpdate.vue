<template>
  <padded-container>
    <page-header :back-button="true" :back-route="'/archive/thesis/' + thesisID">Update Thesis</page-header>

    <thesis-form
        v-if="loadForm && authorized && !error"
        type="update"
        :prevTitle="title"
        :prevDescription="description"
        :prevLink="link"
        :prevAuthors="authors"
        :prevOwners="owners"
        :prevTags="tags"
        :tagAutocompleteItems="getThesisTags"
        :prevUserIndex="userIndex"
        :batchID="batchID"
        :thesisID="thesisID"
    ></thesis-form>
    <error-card v-else-if="loadForm && error" class="mt-5">
      Thesis not found
    </error-card>
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
  title() {
    return 'Update Thesis';
  },
  data() {
    return {
      title: '',
      description: '',
      link: '',
      authors: [],
      owners: [],
      tags: [],
      userIndex: 0,
      loadForm: false,
      authorized: true,
      error: false,
      thesisID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getThesisDetails', 'getThesisTags']),
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
    ...mapActions('archive', ['loadThesisDetails', 'loadThesisTags']),
    ...mapActions('user', ['getProfile']),
    async updateProps() {
      this.loadForm = false;
      this.error = false;
      this.authorized = true;
      this.userIndex = -1;

      await this.getProfile('me');
      await this.loadThesisTags(false);
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
          details['requested_owners'].forEach(req => {
            this.owners.push({id: req['UserID'].toString()});
          });

          this.tags = [];
          details['tags'].forEach(tag => {
            this.tags.push({name: tag});
          });

          if (this.userIndex === -1) {
            this.authorized = false;
          }
        })
        .catch(e => {
          console.log(e.response);
          this.error = true;
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
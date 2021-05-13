<template>
  <padded-container>
    <page-header>Tag Manager / Existing Tags</page-header>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Create New Tag</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click="onCreateClicked">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-card
        v-if="!getLoaderFlag('tags')"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
    >
      <v-row class="justify-center">
        <v-col :cols="selectCols">
          <v-select
              v-model="course"
              :class="{'mx-2': $vuetify.breakpoint.mdAndUp}"
              :items="courses"
              label="Select Course"
              outlined
              rounded
              dense
              clearable
              color="primary lighten-2"
          ></v-select>
          <v-radio-group v-model="type" class="mt-0">
            <v-radio
                class="ml-6"
                v-for="name in types"
                :key="name"
                :label="name"
                :value="name"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row class="justify-center" :class="$vuetify.breakpoint.mdAndUp ? 'mx-3' : ''">
        <v-col cols="12">
          <v-card
              class="mx-auto"
              elevation="1"
              outlined
              rounded
              min-height="100"
          >
            <template v-for="item in tags">
              <v-list-item :key="item.id" :class="'mx-' + margins + ' pb-0'">
                <v-list-item-content class="text-left py-0 mr-3">
                  <v-card-text :class="'ml-' + margins + ' py-0 text-body-1'">
                    {{ item.name }}
                  </v-card-text>
                </v-list-item-content>

                <icon-button
                    @click.native="onEditClicked(item)"
                    size="30"
                    class="mx-1"
                >
                  mdi-square-edit-outline
                </icon-button>

                <icon-button
                    @click.native="onDeleteClicked(item.id)"
                    size="30"
                    class="mx-1"
                >
                  mdi-delete-outline
                </icon-button>
              </v-list-item>
              <v-divider :class="'mx-' + margins + ' my-0'"></v-divider>
            </template>

<!--            Update Form Dialog-->
            <v-dialog
                v-model="editDialog"
                max-width="600"
                :retain-focus="false"
            >
              <tag-form
                  :key="editItem.id"
                  @cancel="editDialog = false"
                  @updated="afterUpdate"
                  type="edit"
                  :id="editItem.id"
                  :prevTagType="capitalizeFirstLetter(editItem.type)"
                  :prevTagText="editItem.name"
                  :prevCourse="editItem.courseId"
                  :prevCourses="courses"
              ></tag-form>
            </v-dialog>

<!--            Create Form Dialog-->
            <v-dialog
                v-model="createDialog"
                max-width="600"
                :retain-focus="false"
            >
              <tag-form
                  :key="createCounter"
                  @cancel="createDialog = false"
                  @created="afterCreate"
                  type="create"
                  :prevCourses="courses"
              ></tag-form>
            </v-dialog>

<!--            Delete Tag Dialog-->
            <v-dialog
                v-model="deleteDialog"
                max-width="290"
            >
              <v-card>
                <v-card-title class="headline">
                  Delete this tag?
                </v-card-title>
                <v-card-text>Are you sure you want to delete this tag?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="green darken-1"
                      text
                      @click="deleteDialog = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                      color="red darken-1"
                      text
                      @click="onDeleteConfirmed"
                      :loading="getLoaderFlag('tagDeletion')"
                      :disabled="getLoaderFlag('tagDeletion')"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
                <v-row class="justify-center" v-if="getTagDeleteError">
                  <v-alert
                      type="error"
                      outlined
                      dense
                  >
                    {{ getTagDeleteMessage }}
                  </v-alert>
                </v-row>
              </v-card>
            </v-dialog>

          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import PaddedContainer from "@/components/PaddedContainer";
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
import IconButton from "@/components/IconButton";
import TagForm from "@/components/Form/TagForm";
export default {
  name: "TagExisting",
  components: {TagForm, IconButton, DetailsLoader, PaddedContainer, PageHeader},
  title() {
    return 'Existing Tags';
  },
  data() {
    return {
      course: null,
      type: 'Topics',
      types: ['Topics', 'Books'],
      editDialog: false,
      editItem: {},
      createDialog: false,
      createCounter: 0,
      deleteDialog: false,
      deleteItem: null,
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getTags', 'getTagsUnwrapped', 'getTagDeleteError', 'getTagDeleteMessage']),
    courses() {
      if (this.getTags) {
        let ret = [];
        this.getTags.forEach(tag => {
          ret.push(tag['courseId']);
        });

        return ret.sort((a, b) => a < b ? -1 : 1);
      }


      return [];
    },
    tags() {
      let ret = [];

      if (this.getTagsUnwrapped) {
        let type = this.type === 'Topics' ? 'topic' : 'book';
        ret = this.getTagsUnwrapped.filter(e => e['type'] === type);
        ret = ret.filter(e => e.type === type);
        if (this.course) {
          ret = ret.filter(e => e.courseId === this.course);
        }
        ret.sort((a, b) => a.name < b.name ? -1 : 1);
      }

      return ret;
    },
    selectCols() {
      if (this.$isMobile())
        return '9';

      return this.$vuetify.breakpoint.mdAndUp ? '4' : '6';
    },
    margins() {
      return this.$vuetify.breakpoint.mdAndUp ? '10' : '1';
    },
  },
  methods: {
    ...mapActions('privileged', ['loadTags', 'deleteTag']),
    capitalizeFirstLetter(text) {
      if (text || text !== undefined)
        return text.charAt(0).toUpperCase() + text.slice(1);
      return '';
    },
    onEditClicked(item) {
      this.editItem = item;
      this.editDialog = true;
    },
    afterUpdate() {
      this.editDialog = false;
      this.loadTags();
    },
    onCreateClicked() {
      this.createCounter ^= 1;
      this.createDialog = true;
    },
    afterCreate() {
      this.createDialog = false;
      this.loadTags();
    },
    onDeleteClicked(tagID) {
      this.deleteItem = tagID;
      this.deleteDialog = true;
    },
    onDeleteConfirmed() {
      this.deleteTag(this.deleteItem)
        .then(response => {
          this.deleteDialog = false;
          this.loadTags();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
        });
    },
  },
  mounted() {
    this.loadTags();
  }
}
</script>

<style scoped>

</style>
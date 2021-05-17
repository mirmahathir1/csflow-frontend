<template>
  <padded-container>
    <page-header>Tag Manager / Requested Tags</page-header>

    <v-card
        v-if="!getLoaderFlag('requestedTags')"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
    >
      <v-card
          v-if="!small"
          class="mx-3 pl-5"
          elevation="1"
          outlined
          rounded
      >
        <v-row :class="'mx-' + margins + ' py-2'">
          <v-col cols="2"><v-card-text class="text-body-2 px-0 font-weight-bold">Type</v-card-text></v-col>
          <v-col cols="3"><v-card-text class="text-body-2 px-0 font-weight-bold">Name</v-card-text></v-col>
          <v-col cols="2"><v-card-text class="text-body-2 px-0 font-weight-bold">Course</v-card-text></v-col>
          <v-col cols="2"><v-card-text class="text-body-2 px-0 font-weight-bold">Requester</v-card-text></v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card>

      <v-card
          class="mx-3 pl-5 mt-6 pt-3"
          elevation="1"
          outlined
          rounded
          min-height="100"
      >
        <template v-for="item in getRequestedTags">
          <v-row :key="item.id" :class="'mx-' + margins + ' py-2'">
            <v-col :cols="small ? '12' : '2'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Type: </span>
                {{ $capitalizeFirstLetter(item.type) }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '3'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Name: </span>
                {{ item.name }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '2'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Course: </span>
                {{ item.courseId }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '2'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Requester: </span>
                {{ item.requester }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '3'" :class="small ? 'py-0' : 'py-1'">
              <v-card-actions class="pl-2">
                <icon-button
                    @click.native.stop="onAcceptClicked(item.id)"
                    :size="iconSize"
                    class="mx-1"
                >
                  mdi-check
                </icon-button>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <icon-button
                          @click.native.stop="onEditClicked(item)"
                          :size="iconSize"
                          class="mx-2"
                      >
                        mdi-square-edit-outline
                      </icon-button>
                    </div>
                  </template>
                  <span>Edit & Accept</span>
                </v-tooltip>

                <icon-button
                    @click.native.stop="onRejectClicked(item.id)"
                    :size="iconSize"
                    class="mx-1"
                >
                  mdi-close
                </icon-button>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-divider :class="'mx-' + margins + ' mb-1 mt-1'"></v-divider>
        </template>

<!--        Accept Dialog-->
        <v-dialog
            v-model="acceptDialog"
            max-width="290"
        >
          <v-card :key="'accept'+ acceptKey">
            <v-card-title class="headline">
              Accept this tag?
            </v-card-title>
            <v-card-text>Are you sure you want to accept this tag?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-1"
                  text
                  @click="acceptDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="green darken-1"
                  text
                  @click="onAcceptConfirmed"
                  :loading="getLoaderFlag('tagSubmission')"
                  :disabled="getLoaderFlag('tagSubmission')"
              >
                Accept
              </v-btn>
            </v-card-actions>
            <v-alert
                type="error"
                outlined
                dense
                v-if="submitted && getTagSubmitError"
            >
              {{ getTagSubmitMessage }}
            </v-alert>
          </v-card>
        </v-dialog>

<!--        Edit & Accept Dialog-->
        <v-dialog
            v-model="editDialog"
            max-width="600"
            :retain-focus="false"
        >
          <tag-form
              v-if="!getLoaderFlag('tagCourses')"
              :key="'edit' + editItem.id"
              @cancel="editDialog = false"
              @accepted="afterUpdate"
              type="editAndAccept"
              :id="editItem.id"
              :prevTagType="$capitalizeFirstLetter(editItem.type)"
              :prevTagText="editItem.name"
              :prevCourse="editItem.courseId"
              :prevCourses="getTagCourses"
          ></tag-form>
          <regular-loader v-else></regular-loader>
        </v-dialog>

<!--        Reject Dialog-->
        <v-dialog
            v-model="rejectDialog"
            max-width="290"
        >
          <v-card :key="'delete'+ rejectItem.id">
            <v-card-title class="headline">
              Reject this request?
            </v-card-title>
            <v-card-text>Are you sure you want to reject this tag request?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="rejectDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="red darken-1"
                  text
                  @click="onRejectConfirmed"
                  :loading="getLoaderFlag('tagDeletion')"
                  :disabled="getLoaderFlag('tagDeletion')"
              >
                Reject
              </v-btn>
            </v-card-actions>
            <v-alert
                type="error"
                outlined
                dense
                v-if="submitted && getTagDeleteError"
            >
              {{ getTagDeleteMessage }}
            </v-alert>
          </v-card>
        </v-dialog>
      </v-card>
    </v-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import IconButton from "@/components/IconButton";
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
import RegularLoader from "@/components/Loader/RegularLoader";
import TagForm from "@/components/Form/TagForm";
export default {
  name: "TagRequested",
  components: {TagForm, RegularLoader, DetailsLoader, IconButton, PageHeader, PaddedContainer},
  data() {
    return {
      acceptDialog: false,
      acceptItem: -1,
      acceptKey: 0,
      editDialog: false,
      editItem: {},
      rejectDialog: false,
      rejectItem: -1,
      submitted: false,
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getRequestedTags', 'getTagSubmitError', 'getTagSubmitMessage', 'getTagCourses',
                  'getTagDeleteError', 'getTagDeleteMessage']),
    small() {
      return this.$isMobile() || !this.$vuetify.breakpoint.smAndUp;
    },
    margins() {
      if (this.small) return '1';

      return this.$vuetify.breakpoint.sm ? '5' : '10';
    },
    iconSize() {
      return this.$vuetify.breakpoint.mdOnly ? 20 : 30;
    }
  },
  methods: {
    ...mapActions('privileged', ['loadRequestedTags', 'acceptRequestedTag', 'loadTagCourses', 'rejectRequestedTag']),
    onAcceptClicked(id) {
      this.submitted = false;
      this.acceptItem = id;
      this.acceptDialog = true;
      this.acceptKey ^= 1;
    },
    onAcceptConfirmed() {
      this.acceptRequestedTag(this.acceptItem)
        .then(response => {
          this.acceptItem = -1;
          this.acceptDialog = false;
          this.loadRequestedTags();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
    onEditClicked(item) {
      this.loadTagCourses();
      this.editItem = item;
      this.editDialog = true;
      this.editKey ^= 1;
    },
    afterUpdate() {
      this.editDialog = false;
      this.editItem = {};
      this.loadRequestedTags();
    },
    onRejectClicked(id) {
      this.rejectItem = id;
      this.submitted = false;
      this.rejectDialog = true;
    },
    onRejectConfirmed() {
      this.rejectRequestedTag(this.rejectItem)
        .then(response => {
          this.rejectItem = -1;
          this.rejectDialog = false;
          this.loadRequestedTags();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
  },
  mounted() {
    this.loadRequestedTags();
    // this.loadTagCourses();
  }
}
</script>

<style scoped>

</style>
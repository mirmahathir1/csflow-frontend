<template>
  <padded-container>
    <page-header>Course Manager</page-header>
    <page-subheader>List of All Courses</page-subheader>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Create New Course</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click.stop="onCreateClicked">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-card v-if="!getLoaderFlag('courses')" class="mx-2 rounded-lg px-5 pt-8 pb-4 mt-4">
      <v-card
          v-if="!small"
          class="mx-3 pl-5"
          elevation="1"
          outlined
          rounded
      >
        <v-row :class="'mx-' + margins + ' py-2'">
          <v-col cols="3"><v-card-text class="text-body-2 px-0 font-weight-bold">Course Number</v-card-text></v-col>
          <v-col cols="5"><v-card-text class="text-body-2 px-0 font-weight-bold">Course Title</v-card-text></v-col>
          <v-col cols="2"><v-card-text class="text-body-2 px-0 font-weight-bold text-center">L/T</v-card-text></v-col>
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
        <template v-for="course in coursesCurrentPage">
          <v-row :key="course['courseId']" :class="'mx-' + margins + ' py-2'">
            <v-col :cols="small ? '12' : '3'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Course Number: </span>
                {{ course['courseId'] }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '5'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text class="text-body-1 px-0">
                <span v-if="small" class="font-weight-bold">Course Title: </span>
                {{ course['title'] }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '2'" :class="small ? 'py-0' : 'py-1'">
              <v-card-text :class="'text-body-1 px-0 ' + textCenter">
                <span v-if="small" class="font-weight-bold">L/T: </span>
                {{ course['level'] }}/{{ course['term'] }}
              </v-card-text>
            </v-col>
            <v-col :cols="small ? '12' : '2'" :class="small ? 'py-0' : 'py-1'">
              <v-card-actions class="pl-2">
                <icon-button
                    @click.native.stop="onEditClicked(course)"
                    :size="iconSize"
                    class="mx-2"
                >
                  mdi-square-edit-outline
                </icon-button>

                <icon-button
                    @click.native.stop="onDeleteClicked(course['courseId'])"
                    :size="iconSize"
                    class="mx-1"
                >
                  mdi-delete-outline
                </icon-button>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-divider :class="'mx-' + margins + ' mb-1 mt-1'"></v-divider>
        </template>

        <v-row>
          <v-col cols="12" class="px-0">
            <div class="mx-auto mb-3 mt-5">
              <v-pagination
                  v-model="page"
                  :length="coursePages"
                  circle
                  :total-visible="$isMobile() ? 5 : 7"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>

<!--        Create Course Dialog-->
        <v-dialog
            v-model="createDialog"
            max-width="600"
            :retain-focus="false"
        >
          <course-form
              :key="createFlag"
              @cancel="createDialog = false"
              @created="afterCreate"
          ></course-form>
        </v-dialog>

<!--        Edit Course Dialog-->
        <v-dialog
            v-model="editDialog"
            max-width="600"
            :retain-focus="false"
        >
          <course-form
              :key="editItem['courseId']"
              @cancel="editDialog = false"
              @edited="afterEdit"
              type="edit"
              :prevCourseNumber="editItem['courseId']"
              :prevCourseTitle="editItem['title']"
              :prevLT="editItem['level']+'-'+editItem['term']"
          ></course-form>
        </v-dialog>

<!--        Delete Course Dialog-->
        <v-dialog
            v-model="deleteDialog"
            max-width="290"
            :key="deleteItem"
        >
          <v-card>
            <v-card-title class="headline">
              Delete this course?
            </v-card-title>
            <v-card-text>Are you sure you want to delete this course? This will delete all the posts, projects related to this
            course as well.</v-card-text>
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
                  :loading="getLoaderFlag('courseDeletion')"
                  :disabled="getLoaderFlag('courseDeletion')"
              >
                Yes
              </v-btn>
            </v-card-actions>
            <v-row class="justify-center" v-if="getCourseDeleteError">
              <v-alert
                  type="error"
                  outlined
                  dense
              >
                {{ getCourseDeleteMessage }}
              </v-alert>
            </v-row>
          </v-card>
        </v-dialog>

      </v-card>
    </v-card>
    <details-loader v-else class="mx-4"></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import PageSubheader from "@/components/PageSubheader";
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
import IconButton from "@/components/IconButton";
import CourseForm from "@/components/Form/CourseForm";
export default {
  name: "CourseManager",
  title() {
    return 'Course Manager';
  },
  components: {CourseForm, IconButton, DetailsLoader, PageSubheader, PageHeader, PaddedContainer},
  data() {
    return {
      page: 1,
      pageSize: 10,
      createFlag: 0,
      createDialog: false,
      editDialog: false,
      editItem: {},
      deleteDialog: false,
      deleteItem: '',
    };
  },
  computed: {
    ...mapGetters('admin', ['getLoaderFlag', 'getCourses', 'getCourseDeleteError', 'getCourseDeleteMessage']),
    small() {
      return this.$isMobile() || !this.$vuetify.breakpoint.smAndUp;
    },
    margins() {
      if (this.small) return '1';

      return this.$vuetify.breakpoint.sm ? '5' : '10';
    },
    textCenter() {
      return this.small ? '' : 'text-center';
    },
    iconSize() {
      return this.$vuetify.breakpoint.mdOnly ? 20 : 30;
    },
    courses() {
      let ret = [];

      if (this.getCourses) {
        ret = this.getCourses.sort((a, b) => a['courseId'] <= b['courseId'] ? -1 : 1);
      }

      return ret;
    },
    coursePages() {
      return Math.ceil(this.courses.length/this.pageSize);
    },
    coursesCurrentPage() {
      this.page = Math.min(this.page, this.coursePages);

      return this.courses.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    },
  },
  methods: {
    ...mapActions('admin', ['loadCourses', 'deleteCourse']),
    onCreateClicked() {
      this.createFlag ^= 1;
      this.createDialog = true;
    },
    afterCreate() {
      this.createDialog = false;
      this.loadCourses();
    },
    onEditClicked(item) {
      this.editItem = item;
      this.editDialog = true;
    },
    afterEdit() {
      this.editDialog = false;
      this.loadCourses();
    },
    onDeleteClicked(item) {
      this.deleteItem = item.replace(' ', '-');
      this.deleteDialog = true;
    },
    onDeleteConfirmed() {
      this.deleteCourse(this.deleteItem)
          .then(response => {
            this.deleteDialog = false;
            this.loadCourses();
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
          });
    }
  },
  mounted() {
    this.loadCourses();
  }
}
</script>

<style scoped>

</style>
<template>
  <v-card
      color="white"
      elevation="2"
      class="rounded-lg px-5 pt-8 pb-4 mt-6"
  >
    <v-card-text class="text-h6 text-center black--text">
      Enter relevant info for project
    </v-card-text>
    <div class="mx-10">
      <hr class="my-divider">
    </div>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Title:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Title:</v-card-text>
            <v-text-field
                outlined
                class="rounded-lg"
                dense
                v-model="title"
                :error-messages="titleErrors"
                @blur="$v.title.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Description:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Description:</v-card-text>
            <v-textarea
                outlined
                class="rounded-lg"
                dense
                v-model="description"
                :error-messages="descriptionErrors"
                @blur="$v.description.$touch()"
            ></v-textarea>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
<!--        <v-row>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-col cols="12" md="3" v-if="!$isMobile()">-->
<!--            <v-card-text class="text-left text&#45;&#45;black text-body-1 pt-3 pl-7">Course:</v-card-text>-->
<!--          </v-col>-->
<!--          <v-col cols="12" md="5">-->
<!--            <v-card-text v-if="$isMobile()" class="text-left text&#45;&#45;black text-body-1 pb-3 pl-4">Course:</v-card-text>-->
<!--            <v-text-field-->
<!--                outlined-->
<!--                class="rounded-lg"-->
<!--                dense-->
<!--                v-model="course"-->
<!--                :error-messages="courseErrors"-->
<!--                @blur="$v.course.$touch()"-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
<!--          <v-spacer></v-spacer>-->
<!--        </v-row>-->
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Course Select:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Course:</v-card-text>
            <v-select
                outlined
                dense
                clearable
                class="rounded-lg"
                v-model="course"
                :items="courses"
                :error-messages="courseErrors"
                @blur="$v.course.$touch()"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Youtube Link:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Youtube Link:</v-card-text>
            <v-text-field
                outlined
                class="rounded-lg"
                dense
                v-model="youtubeLink"
                :error-messages="youtubeLinkErrors"
                @blur="$v.youtubeLink.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Git Repository Link:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Git Repository Link:</v-card-text>
            <v-text-field
                outlined
                class="rounded-lg"
                dense
                v-model="gitLink"
                :error-messages="gitLinkErrors"
                @blur="$v.gitLink.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <!--          Owners-->
        <v-row class="mt-0">
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" class="py-0">
            <v-card-text class="text-left text--black text-body-1 pl-7">Owners:</v-card-text>
          </v-col>
          <v-col cols="12" md="7" v-if="!$isMobile()"></v-col>

          <v-col cols="1" md="3"></v-col>
          <v-col cols="10" md="5">
            <v-text-field
                v-for="(owner, index) in owners" :key="index"
                outlined
                class="rounded-lg"
                dense
                v-model="owners[index].id"
                @blur="$v.owners.$each[index].id.$touch()"
                :error-messages="ownerErrors[index]"
                :disabled="index === userIndex"
            >
              <template v-slot:append-outer>
                <v-btn
                    icon
                    color="red lighten-1"
                    @click="removeOwner(index)"
                    small
                    :disabled="index === userIndex"
                >
                  <v-icon>
                    mdi-minus-circle
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-text-field
                outlined
                class="rounded-lg"
                dense
                v-model="newOwner"
            >
              <template v-slot:append-outer>
                <v-btn
                    icon
                    color="primary"
                    @click="addOwner()"
                    small
                >
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1" md="4"></v-col>
        </v-row>

        <!--          Tags-->
        <v-row class="mt-0">
          <v-spacer></v-spacer>
          <v-col cols="12" md="5" class="py-0">
            <v-card-text class="text-left text--black text-body-1 pl-7">
              Tags:
            </v-card-text>
          </v-col>
          <v-col cols="12" md="5" v-if="!$isMobile()"></v-col>

          <v-col cols="1" md="3"></v-col>
          <v-col cols="10" md="5">
            <v-combobox
                v-for="(tag, index) in tags" :key="index"
                outlined
                class="rounded-lg"
                dense
                v-model="tags[index].name"
                :items="tagAutocompleteItems"
                @input.native="tags[index].name = $event.target.value"
                @blur="$v.tags.$each[index].name.$touch()"
                :error-messages="tagErrors[index]"
            >
              <template v-slot:append-outer>
                <v-btn
                    icon
                    color="red lighten-1"
                    @click="removeTag(index)"
                    small
                >
                  <v-icon>
                    mdi-minus-circle
                  </v-icon>
                </v-btn>
              </template>
            </v-combobox>
            <v-combobox
                outlined
                class="rounded-lg"
                dense
                :search-input.sync="newTag"
                :items="tagAutocompleteItems"
            >
              <template v-slot:append-outer>
                <v-btn
                    icon
                    color="primary"
                    @click="addTag()"
                    small
                >
                  <v-icon>
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="1" md="4"></v-col>
        </v-row>

        <v-row>
          <v-col cols="7"></v-col>
          <v-col cols="5" align="center">
            <v-btn
                color="primary"
                :block="$isMobile()"
                :disabled="$v.$invalid || getLoaderFlag('projectSubmission')"
                :loading="getLoaderFlag('projectSubmission')"
                @click="submit"
            >Submit</v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-alert
              type="error"
              outlined
              dense
              v-if="submitted && getProjectSubmitError"
          >
            {{ getProjectSubmitMessage }}
          </v-alert>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required, minLength, url, integer } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ProjectForm",
  props: {
    prevTitle: {
      type: String,
      default: '',
    },
    prevDescription: {
      type: String,
      default: '',
    },
    prevYoutubeLink: {
      type: String,
      default: '',
    },
    prevGitLink: {
      type: String,
      default: '',
    },
    prevCourse: {
      type: String,
      default: '',
    },
    prevOwners: {
      type: Array,
      default: () => [],
    },
    prevUserIndex: {
      type: Number,
      default: -1,
    },
    prevTags: {
      type: Array,
      default: () => [],
    },
    tagAutocompleteItems: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required,
    },
    projectID: {
      type: String,
      default: '',
    },
    batchID: {
      type: Number,
      required,
    },
    propCourses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: this.prevTitle,
      description: this.prevDescription,
      youtubeLink: this.prevYoutubeLink,
      gitLink: this.prevGitLink,
      course: this.prevCourse,
      owners: this.prevOwners,
      newOwner: '',
      tags: this.prevTags,
      newTag: '',
      userIndex: this.prevUserIndex,
      submitted: false,
      courseMap: {},
    };
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
      minLength: minLength(50),
    },
    youtubeLink: {
      required,
      url,
    },
    gitLink: {
      required,
      url,
    },
    owners: {
      required,
      minLength: minLength(1),
      $each: {
        id: {
          required,
          unique(val) {
            return this.owners.filter(element => element.id === val).length < 2;
          },
          len(val) {
            return val.length === 7;
          },
          integer,
          positive(val) {
            return val[0] !== '-';
          }
        }
      }
    },
    course: {
      required,
      valid(val) {
        return true;
      }
    },
    tags: {
      required,
      minLength: minLength(1),
      $each: {
        name: {
          required,
          unique(val) {
            if (val) {
              return this.tags.filter(element => element.name.toLowerCase() === val.toLowerCase()).length < 2;
            }
            return true;
          },
        }
      }
    },
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getProjectSubmitError', 'getProjectSubmitMessage']),
    ...mapGetters('user', ['getLoadedUser']),
    courses() {
      let ret = [];
      this.courseMap = {};

      this.propCourses.forEach(course => {
        if ((this.getLoadedUser['level']*10+this.getLoadedUser['term']) >= (course['Level']*10+course['Term'])) {
          ret.push(course['courseId'] + ' (' + course['name'] + ')');
          this.courseMap[course['courseId'] + ' (' + course['name'] + ')'] = course['courseId'];
        }
      });

      ret.sort((a, b) => {
        return this.courseMap[a] < this.courseMap[b] ? -1 : 1;
      })

      return ret;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) {
        return errors;
      }

      !this.$v.title.required && errors.push('Title is required');

      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }

      !this.$v.description.required && errors.push('Description is required');
      !this.$v.description.minLength && errors.push('Must be at least 50 characters');

      return errors;
    },
    youtubeLinkErrors() {
      const errors = [];
      if (!this.$v.youtubeLink.$dirty) {
        return errors;
      }

      !this.$v.youtubeLink.required && errors.push('Youtube link is required');
      !this.$v.youtubeLink.url && errors.push('Must be a valid url');

      return errors;
    },
    gitLinkErrors() {
      const errors = [];
      if (!this.$v.gitLink.$dirty) {
        return errors;
      }

      !this.$v.gitLink.required && errors.push('Git repository link is required');
      !this.$v.gitLink.url && errors.push('Must be a valid url');

      return errors;
    },
    ownerErrors() {
      const errors = [];

      for (let index=0; index < this.owners.length; index++) {
        const element = this.$v.owners.$each[index.toString()];
        const temp = [];

        !element.id.required && temp.push('Please enter a student id');
        !element.id.integer && temp.push('Student id must be a number');
        !element.id.positive && temp.push('Student id cannot be negative');
        !element.id.len && temp.push('Student id must be of 7 digits');
        !element.id.unique && temp.push('Same id cannot be used more than once');

        errors.push(temp);
      }

      return errors;
    },
    courseErrors() {
      const errors = [];
      if (!this.$v.course.$dirty) {
        return errors;
      }

      !this.$v.course.required && errors.push('Course is required');
      !this.$v.course.valid && errors.push('Invalid course id format');

      return errors
    },
    tagErrors() {
      const errors = [];

      for (let index=0; index < this.tags.length; index++) {
        const element = this.$v.tags.$each[index.toString()];
        const temp = [];

        !element.name.required && temp.push('Please enter a tag');
        !element.name.unique && temp.push('Same tag cannot be used more than once');

        errors.push(temp);
      }

      return errors;
    },
  },
  methods: {
    ...mapActions('archive', ['createProject', 'updateProject']),
    ...mapActions('user', ['getProfile']),
    removeOwner(index) {
      this.owners.splice(index, 1);

      if (index < this.userIndex) {
        this.userIndex--;
      }
    },
    addOwner() {
      this.owners.push({id: this.newOwner});
      this.newOwner = '';
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    addTag() {
      this.tags.push({name: this.newTag});
      this.newTag = '';
    },
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {};
      payload.title = this.$replaceFirstQuote(this.title);
      payload.description = this.$replaceFirstQuote(this.description);
      payload.youtube = this.youtubeLink;
      payload.github = this.gitLink;
      payload.course = this.courseMap[this.course];

      payload.owners = [];
      this.owners.forEach(element => {
        payload.owners.push(parseInt(element.id));
      });

      payload.tags = [];
      this.tags.forEach(tag => {
        payload.tags.push(this.$replaceFirstQuote(tag.name));
      });

      if (this.type === 'create') {
        this.createProject(payload)
            .then(response => {
              this.$router.push('/archive/project/batch/' + this.batchID + '/' + payload.course.replace(' ', '-'));
            })
            .catch(e => {
              console.log(e.response);
            })
            .finally(() => {
              this.submitted = true;
            });
      } else {
        this.updateProject({payload, projectID: this.projectID})
            .then(response => {
              this.$router.push('/archive/project/' + this.projectID);
            })
            .catch(e => {
              console.log(e.response);
            })
            .finally(() => {
              this.submitted = true;
            });

      }
    }
  },
}
</script>

<style scoped>

</style>
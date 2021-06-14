<template>
  <v-card
      rounded
      class="px-auto"
  >
    <v-card-title>Create New Course</v-card-title>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Course Number:</v-card-text>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
                class="rounded-lg ml-1 mr-8"
                outlined
                dense
                label="Course Number"
                v-model="courseNumber"
                @input="$v.courseNumber.$touch()"
                @blur="$v.courseNumber.$touch()"
                :error-messages="courseNumberErrors"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Course Title:</v-card-text>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-text-field
                class="rounded-lg ml-1 mr-8"
                outlined
                dense
                label="Course Title"
                v-model="courseTitle"
                @input="$v.courseTitle.$touch()"
                @blur="$v.courseTitle.$touch()"
                :error-messages="courseTitleErrors"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Level/Term:</v-card-text>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-select
                outlined
                rounded
                dense
                color="primary lighten-2"
                class="mr-10"
                v-model="LT"
                :items="levelTerms"
                label="Level/Term"
                required
                @change="$v.LT.$touch()"
                @blur="$v.LT.$touch()"
                :error-messages="LTErrors"
            ></v-select>
          </v-col>
        </v-row>
        <v-card-actions class="mr-5">
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="$emit('cancel')"
          >
            Cancel
          </v-btn>
          <v-btn
              color="primary"
              :disabled="$v.$invalid || !changed || getLoaderFlag('courseSubmission')"
              :loading="getLoaderFlag('courseSubmission')"
              @click="submit"
          >Submit</v-btn>
        </v-card-actions>

        <v-row class="justify-center" v-if="submitted && getCourseSubmitError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getCourseSubmitMessage }}
          </v-alert>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CourseForm",
  props: {
    type: {
      type: String,
      default: 'create',
    },
    prevCourseNumber: {
      type: String,
      default: '',
    },
    prevCourseTitle: {
      type: String,
      default: '',
    },
    prevLT: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      courseNumber: this.prevCourseNumber,
      courseTitle: this.prevCourseTitle,
      LT: this.prevLT,
      levelTerms: ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'],
      submitted: false,
    };
  },
  validations: {
    courseNumber: {
      required,
    },
    courseTitle: {
      required,
      minLength: minLength(6),
    },
    LT: {
      required,
    }
  },
  computed: {
    ...mapGetters('admin', ['getLoaderFlag', 'getCourseSubmitError', 'getCourseSubmitMessage']),
    courseNumberErrors() {
      const errors = [];
      if (!this.$v.courseNumber.$dirty) {
        return errors;
      }

      !this.$v.courseNumber.required && errors.push('Course number is required');
      return errors;
    },
    courseTitleErrors() {
      const errors = [];
      if (!this.$v.courseTitle.$dirty) {
        return errors;
      }

      !this.$v.courseTitle.required && errors.push('Course title is required');
      !this.$v.courseTitle.minLength && errors.push('Course title must be at least 6 characters long');
      return errors;
    },
    LTErrors() {
      const errors = [];
      if (!this.$v.LT.$dirty) {
        return errors;
      }

      !this.$v.LT.required && errors.push('Level & Term is required');
      return errors;
    },
    changed() {
      return this.courseTitle !== this.prevCourseTitle || this.courseNumber !== this.prevCourseNumber || this.LT !== this.prevLT;
    }
  },
  methods: {
    ...mapActions('admin', ['createCourse', 'updateCourse']),
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {};
      payload.courseId = this.$replaceFirstQuote(this.courseNumber);
      payload.title = this.$replaceFirstQuote(this.courseTitle);
      payload.level = Number(this.LT.substring(0, 1));
      payload.term = Number(this.LT.substring(2, 3));

      if (this.type === 'create') {
        payload.batch = 16;

        this.createCourse(payload)
          .then(response => {
            this.$emit('created');
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.submitted = true;
          });
      } else if (this.type === 'edit') {
        this.updateCourse({payload: payload, courseID: this.prevCourseNumber.replace(' ', '-')})
            .then(response => {
              this.$emit('edited');
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
  mounted() {
    this.submitted = false;
    this.$refs.form.resetValidation();
  }
}
</script>

<style scoped>

</style>
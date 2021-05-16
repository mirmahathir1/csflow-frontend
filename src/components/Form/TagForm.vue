<template>
  <v-card
      rounded
      class="px-auto"
  >
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Tag Type:</v-card-text>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-select
                outlined
                rounded
                dense
                color="primary lighten-2"
                class="mr-10"
                v-model="tagType"
                :items="types"
                label="Select Tag Type"
                required
                @change="$v.tagType.$touch()"
                @blur="$v.tagType.$touch()"
                :error-messages="tagTypeErrors"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Tag Text:</v-card-text>
          </v-col>
          <v-col cols="12" md="5" class="py-0">
            <v-text-field
                class="rounded-lg ml-1"
                outlined
                dense
                label="Tag Text"
                v-model="tagText"
                @input="$v.tagText.$touch()"
                @blur="$v.tagText.$touch()"
                :error-messages="tagTextErrors"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" v-if="!$isMobile()" class="py-0">
            <v-card-text class="pl-15 pt-2 text-body-1">Related Course:</v-card-text>
          </v-col>
          <v-col cols="12" md="6" class="py-0">
            <v-select
                outlined
                rounded
                dense
                color="primary lighten-2"
                class="mr-10"
                v-model="course"
                :items="courses"
                label="Select Course"
                required
                @change="$v.course.$touch()"
                @blur="$v.course.$touch()"
                :error-messages="courseErrors"
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
              :disabled="$v.$invalid || !changed || getLoaderFlag('tagSubmission')"
              :loading="getLoaderFlag('tagSubmission')"
              @click="submit"
          >Submit</v-btn>
        </v-card-actions>

        <v-row class="justify-center" v-if="getTagSubmitError && submitted">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getTagSubmitMessage }}
          </v-alert>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TagForm",
  props: {
    type: {
      type: String,
      default: 'edit',
    },
    prevTagType: {
      type: String,
      default: '',
    },
    prevTagText: {
      type: String,
      default: '',
    },
    prevCourses: {
      type: Array,
      default: () => [],
    },
    prevCourse: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: -1,
    }
  },
  data() {
    return {
      types: ['Book', 'Topic'],
      tagType: this.prevTagType,
      tagText: this.prevTagText,
      course: this.prevCourse,
      courses: this.prevCourses,
      submitted: false,
    };
  },
  validations: {
    tagType: {
      required,
    },
    tagText: {
      required,
    },
    course: {
      required,
    },
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getTagSubmitError', 'getTagSubmitMessage']),
    title() {
      if (this.type === 'edit')
        return 'Update Tag';
      return 'Create New Tag';
    },
    tagTypeErrors() {
      const errors = [];
      if (!this.$v.tagType.$dirty) {
        return errors;
      }

      !this.$v.tagType.required && errors.push('Tag type is required');
      return errors
    },
    tagTextErrors() {
      const errors = [];
      if (!this.$v.tagText.$dirty) {
        return errors;
      }

      !this.$v.tagText.required && errors.push('Tag text is required');
      return errors
    },
    courseErrors() {
      const errors = [];
      if (!this.$v.course.$dirty) {
        return errors;
      }

      !this.$v.course.required && errors.push('Course is required');
      return errors;
    },
    changed() {
      return this.prevTagType !== this.tagType || this.prevTagText !== this.tagText || this.prevCourse !== this.course;
    }
  },
  methods: {
    ...mapActions('privileged', ['updateTag', 'createTag']),
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {};
      payload.name = this.tagText.replace("'", "''");
      payload.type = this.tagType.toLowerCase();
      payload.courseId = this.course;

      if (this.type === 'edit') {
        this.updateTag({payload: payload, tagID: this.id})
          .then(response => {
            this.$emit('updated');
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.submitted = true;
          });
      } else {
        this.createTag(payload)
          .then(response => {
            this.$emit('created');
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
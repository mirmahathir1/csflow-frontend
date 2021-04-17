<template>
  <padded-container>
    <page-header>Create New Thesis</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
    >
      <v-card-title class="justify-center text-h6">
        Enter relevant info for thesis
      </v-card-title>
      <div class="mx-10">
        <hr class="my-divider">
      </div>
      <v-container>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="3">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Title:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="title"
                  :error-messages="titleErrors"
                  @blur="$v.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2"></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="3">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Description:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-textarea
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="description"
                  :error-messages="descriptionErrors"
                  @blur="$v.description.$touch()"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="2"></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="3">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">DOI Link:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="link"
                  :error-messages="linkErrors"
                  @blur="$v.link.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2"></v-col>
          </v-row>

<!--          Authors-->
          <v-row class="mt-0">
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="3">
              <v-card-text class="text-left text--black text-body-1 pb-0 pl-7">Authors:</v-card-text>
            </v-col>
            <v-col cols="12" md="7"></v-col>
            <v-col cols="3"></v-col>
            <v-col cols="5">
                <v-text-field
                    v-for="(author, index) in authors" :key="index"
                    outlined
                    class="rounded-lg"
                    dense
                    v-model="authors[index].name"
                    @blur="$v.authors.$each[index].name.$touch()"
                    :error-messages="!$v.authors.$each[index].name.required ? 'Please enter a name' : null"
                >
                  <template v-slot:append-outer v-if="authors.length > 1">
                    <v-icon color="red lighten-1" @click="removeAuthor(index)">
                      mdi-minus-circle
                    </v-icon>
                  </template>
                </v-text-field>
                <v-text-field
                    outlined
                    class="rounded-lg"
                    dense
                    v-model="newAuthor"
                >
                  <template v-slot:append-outer>
                    <v-icon color="primary" @click="addAuthor()">
                      mdi-plus-circle
                    </v-icon>
                  </template>
                </v-text-field>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>

<!--          Owners-->
          <v-row class="mt-0">
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="3">
              <v-card-text class="text-left text--black text-body-1 pb-0 pl-7">Owners:</v-card-text>
            </v-col>
            <v-col cols="12" md="7"></v-col>
            <v-col cols="3"></v-col>
            <v-col cols="5">
              <v-text-field
                  v-for="(owner, index) in owners" :key="index"
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="owners[index].id"
                  @blur="$v.owners.$each[index].id.$touch()"
                  :error-messages="ownerErrors[index]"
              >
                <template v-slot:append-outer v-if="owners.length > 1">
                  <v-icon color="red lighten-1" @click="removeOwner(index)">
                    mdi-minus-circle
                  </v-icon>
                </template>
              </v-text-field>
              <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="newOwner"
              >
                <template v-slot:append-outer>
                  <v-icon color="primary" @click="addOwner()">
                    mdi-plus-circle
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
          <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="5" align="center">
              <v-btn
                  color="primary"
                  :block="$isMobile()"
                  :disabled="$v.$invalid || getLoaderFlag('thesisCreation')"
                  :loading="getLoaderFlag('thesisCreation')"
                  @click="submit"
              >Submit</v-btn>
            </v-col>
          </v-row>
          <v-row><p>{{$v.$invalid}}</p></v-row>
          <v-row class="justify-center">
            <v-alert
                type="error"
                outlined
                dense
                v-if="getThesisCreationError"
            >
              {{ getThesisCreationMessage }}
              error message
            </v-alert>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </padded-container>
</template>

<script>
import { required, minLength, url, maxLength } from 'vuelidate/lib/validators'
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "ThesisForm",
  props: {
    prevTitle: {
      type: String,
      default: '',
    },
    prevDescription: {
      type: String,
      default: '',
    },
    prevLink: {
      type: String,
      default: '',
    },
    prevAuthors: {
      type: Array,
      default: () => [],
    },
    prevOwners: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      title: this.prevTitle,
      description: this.prevDescription,
      link: this.prevLink,
      authors: [],
      newAuthor: '',
      owners: [],
      newOwner: '',
    };
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
      minLength: minLength(100),
    },
    link: {
      required,
      url,
    },
    authors: {
      required,
      minLength: minLength(1),
      $each: {
        name: {
          required,
        }
      }
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
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getThesisCreationError', 'getThesisCreationMessage']),
    ...mapGetters('user', ['getLoadedUser']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) {
        return errors;
      }

      !this.$v.title.required && errors.push('Title is required.');
      return errors
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }

      !this.$v.description.required && errors.push('Description is required.');
      !this.$v.description.minLength && errors.push('Must be at least 100 characters.');

      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.link.$dirty) {
        return errors;
      }

      !this.$v.link.required && errors.push('DOI link is required.');
      !this.$v.link.url && errors.push('Must be a valid url.');

      return errors;
    },
    ownerErrors() {
      const errors = [];

      for (let index=0; index < this.owners.length; index++) {
        const element = this.$v.owners.$each[index.toString()];
        const temp = [];

        // if (!element.id.$dirty) {
        //   errors.push(temp);
        //   continue;
        // }

        !element.id.required && temp.push('Please enter a student id.');
        !element.id.len && temp.push('Student id must be of 7 digits.');
        !element.id.unique && temp.push('Same id cannot be used more than once.');

        errors.push(temp);
      }

      return errors;
    }
  },
  methods: {
    ...mapActions('archive', ['createThesis']),
    ...mapActions('user', ['getProfile']),
    removeAuthor(index) {
      this.authors.splice(index, 1);
    },
    addAuthor() {
      this.authors.push({name: this.newAuthor});
      this.newAuthor = '';
    },
    removeOwner(index) {
      this.owners.splice(index, 1);
    },
    addOwner() {
      this.owners.push({id: this.newOwner});
      this.newOwner = '';
    },
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {};
      payload.title = this.title;
      payload.description = this.description;
      payload.link = this.link;

      payload.writers = [];
      this.authors.forEach(element => {
        payload.writers.push(element.name);
      });

      payload.owners = [];
      this.owners.forEach(element => {
        payload.owners.push(parseInt(element.id));
      });

      this.createThesis(payload)
        .then(response => {
          this.$router.push('/archive/thesis/batch/' + this.batchID);
        });
    }
  },
  components: {PageHeader, PaddedContainer},
  mounted() {
    this.getProfile('me');

    this.authors = [];
    this.prevAuthors.forEach(element => {
      this.authors.push({name: element});
    });

    this.prevOwners.forEach(element => {
      this.owners.push({id: element});
    });
  }
}
</script>

<style scoped>

</style>
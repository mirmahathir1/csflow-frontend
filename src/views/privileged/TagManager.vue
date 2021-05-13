<template>
  <padded-container>
    <page-header>Tag Manager / Existing Tags</page-header>

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
          >
            <v-virtual-scroll
                :items="tags"
                height="450"
                item-height="65"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item.id" :class="'mx-' + margins + ' pb-0'">
                  <v-list-item-content class="text-left py-0 mr-3">
                    <v-list-item-title :class="'ml-' + margins + ' py-0'">
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <icon-button
                        @click.native=""
                        class="mx-1"
                        size="30"
                    >
                      mdi-square-edit-outline
                    </icon-button>
                  </v-list-item-action>
                  <v-list-item-action>
                    <icon-button
                        @click.native=""
                        size="30"
                    >
                      mdi-delete-outline
                    </icon-button>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :class="'mx-' + margins + ' my-0'">
                </v-divider>
              </template>
            </v-virtual-scroll>
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
export default {
  name: "TagManager",
  components: {IconButton, DetailsLoader, PaddedContainer, PageHeader},
  title() {
    return 'Tag Manager';
  },
  data() {
    return {
      course: null,
      type: 'Topics',
      types: ['Topics', 'Books'],
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getTags', 'getTagsUnwrapped']),
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
      let extra = ['Norvig', 'Artificial Intelligence And Stuff Artificial Intelligence And Stuff', 'Russell Norvig', 'Tanenbaum'];
      let type = this.type === 'Topics' ? 'topic' : 'book';
      let ret = this.getTagsUnwrapped.filter(e => e['type'] === type);
      if (this.course) {
        ret = ret.filter(e => e.courseId === this.course);
      }
      ret.sort((a, b) => a.name < b.name ? -1 : 1);

      return [...ret, ...ret, ...ret, ...ret, ...ret,];
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
    ...mapActions('privileged', ['loadTags']),
  },
  mounted() {
    this.loadTags();
  }
}
</script>

<style scoped>

</style>
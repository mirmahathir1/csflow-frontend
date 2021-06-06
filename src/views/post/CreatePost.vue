<template>
  <div>
      <PaddedContainerWithoutLeft>
        <PageHeader>
            Create Post
        </PageHeader>
        <v-card
          color="white"
          elevation="2"
          class="rounded-lg px-5 pt-8 pb-4 mt-6"
        >
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
                        @blur="$v.title.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="3" v-if="!$isMobile()">
                    <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Post Type:</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Post Type:</v-card-text>
                      <v-radio-group
                        v-model="type"
                        mandatory
                        class=""
                      >
                        <v-radio
                            label="Discussion"
                            value="discussion"
                        ></v-radio>
                        <v-radio
                            label="Question"
                            value="question"
                        ></v-radio>
                    </v-radio-group>
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
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-sheet outlined rounded>
                      <div class="text-start pa-2">
                        <v-app-tooltip-btn class="d-inline-block">
                          <!-- <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="pink"
                          >
                            <v-icon dark>
                              mdi-heart
                            </v-icon>
                          </v-btn> -->
                          <v-file-input
                            multiple
                            
                            small-chips
                          ></v-file-input>
                        </v-app-tooltip-btn>
                        <v-app-tooltip-btn class="d-inline-block">
                          <v-file-input
                            multiple
                            hide-input
                            prepend-icon="mdi-camera"
                          ></v-file-input>
                        </v-app-tooltip-btn>
                      </div>
                      <v-divider></v-divider>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label=""
                        no-resize
                        rows="5"
                        value=""
                      ></v-textarea>
                    </v-sheet>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="3" v-if="!$isMobile()">
                    <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Course:</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Post Type:</v-card-text>
                      <v-select
                        v-model="course"
                        :items="courses"
                        label="Select course"
                        outlined
                        dense
                      >
                      </v-select>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="3" v-if="!$isMobile()">
                    <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Topic:</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Post Type:</v-card-text>
                      <v-select
                        v-model="topic"
                        :items="topics"
                        label="Select topic"
                        outlined
                        dense
                      >
                      </v-select>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="5" class="py-0">
                    <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Additional info</v-card-text>
                  </v-col>
                  <v-col cols="12" md="5" v-if="!$isMobile()"></v-col>
                  <v-col md="3"></v-col>
                  <v-col cols="6" md="3" class="mt-n7">
                      <v-checkbox
                          label="None"
                          value="none"
                          v-model="selected"
                      >
                      </v-checkbox>
                      <v-checkbox
                          label="Book"
                          value="book"
                          v-model="selected"
                          :disabled="selected.includes('none')"
                      ></v-checkbox>
                      <v-checkbox
                          label="Term Q/A"
                          value="term"
                          v-model="selected"
                          :disabled="selected.includes('none')"
                      ></v-checkbox>
                  </v-col>
                  <v-col cols="6" class="d-flex">
                    <v-row align="center">
                      <v-col
                        class="d-flex"
                        cols="12"
                        
                      >
                      </v-col>
                      <v-col
                        class="d-flex mt-n5"
                        cols="12"
                        
                      >
                        <v-select
                          :items="books"
                          label="Standard"
                          :disabled="!selected.includes('book')"
                          dense
                        ></v-select>
                      </v-col>
                      <v-col
                        class="d-flex mt-n9"
                        cols="12"
                        
                      >
                        <v-select
                          :items="years"
                          label="Standard"
                          :disabled="!selected.includes('term')"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- <v-col cols="12" md="5" v-if="!$isMobile()"></v-col>
                  <v-col cols="1" md="3"></v-col> -->
                  <v-spacer></v-spacer>
                </v-row>
                <v-row class="mt-0">
                  <v-spacer></v-spacer>
                  <v-col cols="12" md="3" class="py-0">
                    <v-card-text class="text-left text--black text-body-1 pl-7">Custom Tags:</v-card-text>
                  </v-col>
                  <v-col cols="12" md="7" v-if="!$isMobile()"></v-col>

                  <v-col cols="1" md="3"></v-col>
                  <v-col cols="10" md="5">
                    <v-text-field
                        v-for="(tag, index) in tags" :key="index"
                        outlined
                        class="rounded-lg"
                        dense
                        v-model="tags[index].tag"
                        @blur="$v.tags.$each[index].tag.$touch()"
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
                    </v-text-field>
                    <v-text-field
                        outlined
                        class="rounded-lg"
                        dense
                        v-model="newTag"
                    >
                      <template v-slot:append-outer>
                        <v-btn
                          icon
                          color="primary"
                          @click="addTag"
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
                <v-row>
                  <v-col cols="7"></v-col>
                  <v-col cols="5" align="center">
                    <v-btn
                        color="primary"
                        :block="$isMobile()"
                        :disabled="$v.$invalid || clicked"
                        :loading="clicked"
                        @click="submit"
                    >Submit</v-btn>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-alert
                      type="error"
                      outlined
                      dense
                      v-if="anyError"
                  >
                    {{ errorMessage }}
                  </v-alert>
                </v-row>
            </v-form>
          </v-container>
        </v-card>

        <!-- right part -->
          <template v-slot:right>
            <v-sheet
                rounded="lg"
                class="pa-8 mx-auto"
            >
            <v-row align="center">Request New Tag</v-row>
            <hr>
            <v-row>
                <!-- <v-subheader v-text="'Tag Type'" class="mr-auto"></v-subheader> -->
                Tag Type
                <v-select
                    :items="tagTypes"
                    label="Select tag type"
                    outlined
                    dense
                    class="mt-2"
                ></v-select>
            </v-row>
            <v-row>
                Tag Text
                <v-textarea
                    outlined
                    :rows="$isMobile()?2:1"
                    dense
                >

                </v-textarea>
            </v-row>
            <v-row>
                Related Course
                <v-select
                    :items="courses"
                    label="Select course"
                    outlined
                    dense
                    class="mt-2"
                ></v-select>
            </v-row>
            <v-btn block color="primary">Request</v-btn>
            </v-sheet>
          </template>
      </PaddedContainerWithoutLeft>
      
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
export default {
    name:"CreatePost",
    title(){
        return "Create Post"
    },
    components:{
        PageHeader,
        PaddedContainerWithoutLeft
    },
    data(){
      return{
        type:null,
        title:null,
        tagTypes:['Book','Course'],
        courses:['CSE 313','CSE 314'],
        topics:['Markov model','HMM'],
        topic:null,
        course:null,
        additional:null,
        tags:[],
        newTag:'',
        userIndex:0,
        errorMessage:null,
        anyError:false,
        clicked:false,
        selected:[],
        books:['Schaums','Sadiq'],
        years:['2016-17','2017-18','2018-19']
      };
    },
    methods: {
      removeTag(index) {
        this.tags.splice(index, 1);

        if (index < this.userIndex) {
          this.userIndex--;
        }
      },
      addTag() {
        this.tags.push({tag: this.newTag});
        this.newTag = '';
      },
      submit(){
        console.log('here')
      }
    },
    computed:{
      tagErrors(){
        const errors = [];

        for (let index=0; index < this.tags.length; index++) {
          const element = this.$v.tags.$each[index.toString()];
          const temp = [];

          !element.tag.required && temp.push('Please enter a tag name');
          // !element.id.integer && temp.push('Student id must be a number');
          // !element.id.positive && temp.push('Student id cannot be negative');
          // !element.id.len && temp.push('Student id must be of 7 digits');
          !element.tag.unique && temp.push('Same tag cannot be used more than once');

          errors.push(temp);
        }

        return errors;
      }
    },
    validations:{
      title:{
        required
      },
      tags: {
        required,
        minLength: minLength(1),
        $each: {
          tag: {
            required,
            unique(val) {
              return this.tags.filter(element => element.tag === val).length < 2;
            },
            // len(val) {
            //   return val.length === 7;
            // },
            // integer,
            // positive(val) {
            //   return val[0] !== '-';
            // }
          }
        }
    },
    
    
  }
}
</script>

<style>

</style>
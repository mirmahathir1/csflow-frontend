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
                  <!-- <v-col cols="1" md="3"></v-col> -->
                  <!-- <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer> -->
                  <v-col cols="12" md="6" class="mt-n7">
                      <v-radio-group
                        v-model="additional"
                        mandatory
                        class=""
                        row
                      >
                        <v-radio
                            label="None"
                            value="none"
                        >
                        </v-radio>
                        <v-radio
                            label="Book"
                            value="book"
                        ></v-radio>
                        <v-radio
                            label="Term Q/A"
                            value="term"
                        ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <!-- <v-col cols="12" md="5" v-if="!$isMobile()"></v-col>
                  <v-col cols="1" md="3"></v-col> -->
                  <v-spacer></v-spacer>
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
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
export default {
    name:"createPost",
    title(){
        return "Create Post"
    },
    components:{
        PageHeader,
        PaddedContainerWithoutLeft
    },
    data:()=>({
        type:null,
        title:null,
        tagTypes:['Book','Course'],
        courses:['CSE 313','CSE 314'],
        topics:['Markov model','HMM'],
        topic:null,
        course:null,
        additional:null,
    })
}
</script>

<style>

</style>
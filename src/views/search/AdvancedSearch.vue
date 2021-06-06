<template>
  <PaddedContainer>
    <PageHeader>Search Posts</PageHeader>
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
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">
                Text:
              </v-card-text>
            </v-col>
            <v-col cols="12" md="5">
               <v-textarea
                 solo
                 name="input-7-4"
                 label=""
                 outlined
                 v-model="text"
                 @blur="$v.text.$touch()"
               ></v-textarea>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" v-if="!$isMobile()">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">
                Course:
              </v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <!-- <v-card-text
                v-if="$isMobile()"
                class="text-left text--black text-body-1 pb-3 pl-4"
              >Post Type:</v-card-text> -->
              <v-select 
                v-model="course" 
                :items="courses" 
                label="Select course" 
                outlined 
                dense>
              </v-select>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" v-if="!$isMobile()">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">
                Topic:
              </v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <!-- <v-card-text
                v-if="$isMobile()"
                class="text-left text--black text-body-1 pb-3 pl-4"
              >Post Type:</v-card-text> -->
              <v-select 
                v-model="topic" 
                :items="topics" 
                label="Select topic" 
                outlined 
                dense>
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
                          label="Select book"
                          :disabled="!selected.includes('book')"
                          dense
                        ></v-select>
                    </v-col>
                    <!-- <v-col
                        class="d-flex mt-n9"
                        cols="12"
                        
                    >
                        <v-select
                          :items="numbers"
                          label="Select number"
                          :disabled="!selected.includes('term')"
                          dense
                        ></v-select>
                    </v-col> -->
                    <v-col
                        class="d-flex mt-n9"
                        cols="12"
                        
                    >
                        <v-select
                          :items="years"
                          label="Select session"
                          :disabled="!selected.includes('term')"
                          dense
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="5" align="center">
                <v-btn
                    color="primary"
                    :block="$isMobile()"
                    :disabled="$v.$invalid || clicked"
                    :loading="clicked"
                    @click="search"
                >Search</v-btn>
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
    <template v-slot:right>
        <PageHeader>
            Popular Searches
        </PageHeader>
    </template>
  </PaddedContainer>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainerWithoutLeft";
import PageHeader from "@/components/PageHeader";
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: "AdvancedSearch",
  title() {
    return "Search";
  },
  components: {
    PaddedContainer,
    PageHeader
  },
  data(){
      return{
        text:null,
        courses:['CSE 313','CSE 314'],
        topics:['Markov model','HMM'],
        topic:null,
        course:null,
        selected:[],
        books:['Schaums','Sadiq'],
        numbers:['1','2','3','4','5','6','7','8'],
        years:['2016-17','2017-18','2018-19'],
        clicked:false,
        anyError:false,
        errorMessage:'',
      }
  },
  methods:{
      search(){
          this.clicked=true
      }
  },
  validations:{
    text:{
      required
    }
  }
};
</script>

<style>
</style>
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
                 clearable
                 clear-icon="mdi-close-circle"
                 label="Enter text"
                 outlined
                 v-model="text"
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
                dense
              >
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
                          v-model="book"
                        ></v-select>
                    </v-col>
                    <v-col
                        class="d-flex mt-n9"
                        cols="12"
                        
                    >
                        <v-select
                          :items="years"
                          item-text="text"
                          item-value="value"
                          label="Select Level/Term"
                          :disabled="!selected.includes('term')"
                          dense
                          v-model="term"
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
import {mapGetters,mapActions} from 'vuex'
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
        book:null,
        term:null,
        selected:[],
        books:['Schaums','Sadiq'],
        numbers:['1','2','3','4','5','6','7','8'],
        years:[{text:'L-1/T-1',value:'1,1'},
               {text:'L-1/T-2',value:'1,2'},
               {text:'L-2/T-1',value:'2,1'},
               {text:'L-2/T-2',value:'2,2'},
               {text:'L-3/T-1',value:'3,1'},
               {text:'L-3/T-2',value:'3,2'},
               {text:'L-4/T-1',value:'4,1'},
               {text:'L-4/T-2',value:'4,2'}
              ],
        clicked:false,
        anyError:false,
        errorMessage:'',
      }
  },
  methods:{
    ...mapActions('post',['searchPost']),
      search(){
          this.clicked=true
          let l;
          l=this.selected.includes('term')?this.term.split(','):[null,null]
          if(l[0]!=null) l[0]=parseInt(l[0])
          if(l[1]!=null) l[1]=parseInt(l[1])
          let data={
            'payload':{
              'text':this.text,
              'courseId':this.course,
              'book':this.book,
              'topic':this.topic,
              'level':l[0],
              'term':l[1]
            },
            'params':{
              'skip':0,
              'limit':10
            }
          }
          this.searchPost(data)
          .then(response=>{
            this.$router.push('/search')
          })
          .catch(e=>{
            this.anyError=true
            this.errorMessage=e.response.data.message
          })
          .finally(()=>{
            this.clicked=false
          })
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
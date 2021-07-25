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
          v-if="!getLoaderFlag('courseLoader')"
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
                        <!-- <v-app-tooltip-btn class="d-inline-block"> -->
                          <v-file-input
                            multiple
                            v-model="files"
                            small-chips
                          ></v-file-input>
                        <!-- </v-app-tooltip-btn> -->
                        <!-- <v-app-tooltip-btn class="d-inline-block">
                          <v-file-input
                            multiple
                            hide-input
                            v-model="files"
                            prepend-icon="mdi-camera"
                          ></v-file-input>
                        </v-app-tooltip-btn> -->
                      </div>
                      <v-divider></v-divider>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label=""
                        no-resize
                        rows="5"
                        value=""
                        v-model="description"
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
                        :items="getCourseData"
                        label="Select course"
                        outlined
                        dense
                        @change="courseChanged()"
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
                          label="Select Book"
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
        <RegularLoader v-else></RegularLoader>

        <!-- right part -->
          <template v-slot:right v-if="!getLoaderFlag('courseLoader')">
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
                      v-model="newTagType"
                  ></v-select>
              </v-row>
              <v-row>
                  Tag Text
                  <v-textarea
                      outlined
                      :rows="$isMobile()?2:1"
                      dense
                      v-model="newTagText"
                  >

                  </v-textarea>
              </v-row>
              <v-row>
                  Related Course
                  <v-select
                      :items="getCourseData"
                      label="Select course"
                      outlined
                      dense
                      class="mt-2"
                      v-model="newTagCourse"
                  ></v-select>
              </v-row>
              <v-row align="center">
                <v-alert
                  class="mx-auto text-center"
                  type="error"
                  outlined
                  dense
                  v-if="getError('requestNewTag')"
                >
                  {{ getMessage('requestNewTag') }}
                </v-alert>
              </v-row>
              <v-btn
                block
                color="primary"
                :loading="getLoaderFlag('requestNewTag')"
                :disabled="getLoaderFlag('requestNewTag')||!readyToRequest"
                @click="requestNewTag"
              >Request</v-btn>
            </v-sheet>
          </template>
      </PaddedContainerWithoutLeft>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
import RegularLoader from "../../components/Loader/RegularLoader"
export default {
    name:"CreatePost",
    title(){
        return "Create Post"
    },
    components:{
        PageHeader,
        PaddedContainerWithoutLeft,
        RegularLoader
    },
    data(){
      return{
        type:null,
        title:null,
        description:null,
        tagTypes:['Book','Topic'],
        topic:null,
        course:null,
        additional:null,
        book:null,
        term:null,
        tags:[],
        newTag:'',
        userIndex:0,
        errorMessage:null,
        anyError:false,
        clicked:false,
        selected:[],
        years:[{text:'L-1/T-1',value:'1,1'},
               {text:'L-1/T-2',value:'1,2'},
               {text:'L-2/T-1',value:'2,1'},
               {text:'L-2/T-2',value:'2,2'},
               {text:'L-3/T-1',value:'3,1'},
               {text:'L-3/T-2',value:'3,2'},
               {text:'L-4/T-1',value:'4,1'},
               {text:'L-4/T-2',value:'4,2'}
              ],
        newTagText:null,
        newTagType:null,
        newTagCourse:null,
        files:[],
      };
    },
    methods: {
      ...mapActions('post',['requestTag','loadCourses','loadBooks','loadTopics','submitPost','submitResources']),

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
      async submit(){
        this.clicked=true
        let links=[]

        if(this.files.length>0){
          let formData=new FormData();
          this.files.forEach(file => {
            formData.append('files',file);
          });
          
          await this.submitResources(formData)
          .then(response=>{
            links=response.data.payload
          })
        }

        let tags = [];
        this.tags.forEach((tag)=>{
            tags.push(tag.tag);
        })

        let tf;
        if(this.selected.includes('term')){
          let l=this.term.split(',');
          tf={'level':parseInt(l[0]),'term':parseInt(l[1])}
        }else{
          tf=null
        }
        // let l=this.selected.includes('term')?this.term.split(','):[0,0]
        // if(l[0]!=null) l[0]=parseInt(l[0])
        // if(l[1]!=null) l[1]=parseInt(l[1])

        let c=this.course.split(",")

        let data={
          'type':this.type,'title':this.title,'description':this.description,'course':c[0],
          'topic':this.topic,'book':this.book,'termFinal':tf,
          'customTag':tags, 'resources':links,
        }
        // if(!this.selected.includes('term')) delete data.termFinal
        this.submitPost(data)
        .then(response=>{
          this.clicked=false
          this.errorMessage=''
          this.anyError=false
          this.$router.push('/post/details/'+response.data.payload.postId)
        })
        .catch(e=>{
          this.anyError=true
          this.errorMessage=e.response.data.message
        })
        .finally(()=>{
          this.clicked=false
        })
      },
      requestNewTag(){
        let c=this.newTagCourse.split(",")
        this.requestTag({'name':this.newTagText,'type':this.newTagType,'course':c[0]})
          .then(response=>{
              this.newTagText=null
              this.newTagType=null
              this.newTagCourse=null
          })
          .catch(e=>{

          })
          .finally(()=>{

          })
      },
      courseChanged(){
        // console.log(this.course)
        this.topic=null
        let data=this.course.split(",")
        this.loadTopics(data[0])
        this.loadBooks(data[0])
      }
    },
    computed:{
      ...mapGetters('post',['getLoaderFlag','getError','getMessage','getCourses','getBooks','getTopics']),
      tagErrors(){
        const errors = [];

        for (let index=0; index < this.tags.length; index++) {
          const element = this.$v.tags.$each[index.toString()];
          const temp = [];

          // !element.tag.required && temp.push('Please enter a tag name');
          // !element.id.integer && temp.push('Student id must be a number');
          // !element.id.positive && temp.push('Student id cannot be negative');
          // !element.id.len && temp.push('Student id must be of 7 digits');
          !element.tag.unique && temp.push('Same tag cannot be used more than once');

          errors.push(temp);
        }

        return errors;
      },
      readyToRequest(){
        if(this.newTagText!=null&&this.newTagType!=null&&this.newTagCourse!=null){
          return true
        }
        return false

      },
      topics(){
        if(this.getTopics!=null){
          return this.getTopics
        }
        return []
      },
      books(){
        if(this.getBooks!=null){
          return this.getBooks
        }
        return []
      },
      getCourseData(){
        let data=[]
        this.getCourses.forEach(course => {
          data.push(course.courseId+","+course.name)
        });
        return data
      },
    },
    validations:{
      title:{
        required
      },
      tags: {
        // required,
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
      topic:{
        required
      },
      course:{
        required
      },
      description:{
        required
      }

  },
  mounted(){
    this.loadCourses()
  }
}
</script>

<style>

</style>

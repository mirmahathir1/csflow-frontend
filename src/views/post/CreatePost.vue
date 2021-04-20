<template>
  <div>
      <PaddedContainer>
          <PageHeader>
              Create Post
          </PageHeader>
          <v-sheet
            rounded="lg"
            class="pa-6 mx-auto"
            dense
          >
            <!-- <v-form ref="form"></v-form> -->
            <v-row>
                <v-col cols="4"></v-col>
                <v-col><v-row>
                    <!-- <v-row justify="end"> -->
                        <v-subheader v-text="'Post Type'"></v-subheader>
                    <!-- </v-row> -->
                <!-- </v-col>
                <v-col> -->
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
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4"></v-col>
                <v-col>
                    <v-row>
                    <!-- <v-row justify="end"> -->
                        <v-subheader v-text="'Post Type r'"></v-subheader>
                    <!-- </v-row> -->
                <!-- </v-col>
                <v-col> -->
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
                    </v-row>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-subheader v-text="'Post Type'" class=""></v-subheader>
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
            </v-row>
            <v-row justify="center">
                <v-subheader v-text="'Title'"></v-subheader>
                <!-- <v-col cols="2" justify="left"> -->
                <v-textarea 
                    outlined
                    clearable
                    dense
                    rows="2"
                    clear-icon="mdi-close-circle"
                    name="input-7-4"
                    v-model="title"
                    >
                </v-textarea>
                <!-- </v-col> -->
            </v-row>
            <v-row justify="center">
                <v-subheader v-text="'Discussion'"></v-subheader>
            </v-row>
          </v-sheet>
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
      </PaddedContainer>
      
  </div>
</template>

<script>
import PaddedContainer from "../../components/PaddedContainer"
import PageHeader from "../../components/PageHeader"
export default {
    name:"create post",
    title(){
        return "Create Post"
    },
    components:{
        PageHeader,
        PaddedContainer
    },
    data:()=>({
        type:null,
        title:null,
        tagTypes:['Book','Course'],
        courses:['CSE 313','CSE 314']
    })
}
</script>

<style>

</style>
<template>
<div>
  <h1>This page is under construction</h1>
  <!-- <v-row align="center">
    <v-col sm="3"></v-col>
    <v-col sm="3">
      <v-radio-group
        v-model="column"
        column
      >
        <v-radio
          label="Option 1"
          value="radio-1"
        ></v-radio>
        <v-radio
          label="Option 2"
          value="radio-2"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-col
      class="d-flex"
      cols="12"
      sm="6"
    >
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="12"
          
        >
          <v-select
            :items="items"
            label="Standard"
            :disabled="column=='radio-2'"
            dense
          ></v-select>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          
        >
          <v-select
            :items="items"
            label="Standard"
            dense
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row> -->
</div>
</template>

<script>

export default {
    name: 'Home',
    title(){
        return 'Home';
    },
    data(){
      return{
        column:'',
        items:[]
      };
    },
}
</script>

<style>

</style>
<template>
  <v-btn text style="text-decoration:none" rounded @click="click()">
      <slot></slot>
  </v-btn>
</template>

<script>
export default {
    props:[
        'click'
    ]
}
</script>

<style>

</style>
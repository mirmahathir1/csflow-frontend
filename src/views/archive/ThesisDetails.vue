<template>
  <div>
    Details of {{ id }}
    <div v-if="!getLoaderFlag('thesisDetails')">
      <hr>
      Title: {{ details['title'] }}
      <hr>
      Description: {{ details['description'] }}
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "ThesisDetails",
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters('archive', ['getThesisDetails', 'getLoaderFlag']),
    details() {
      return this.getThesisDetails.payload;
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails'])
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
      this.loadThesisDetails(this.id);
    }
  },
  mounted() {
    this.loadThesisDetails(this.id);
  }
}
</script>

<style scoped>

</style>
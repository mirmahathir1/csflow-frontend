<template>
  <padded-container>
    <page-header :back-button="true" back-route="/admin/user/">User Manager</page-header>
    <page-subheader>Batch {{ batch }}</page-subheader>

    <CRForm class="mt-6 mx-4" :batch="Number(batch)" @appointed="onAppointed" :key="'crFrom'+batch"></CRForm>
<!--    <level-term-form class="mt-4 mx-4" :batch="Number(batch)" :key="'ltForm'+batch"></level-term-form>-->

<!--    CR List-->
    <CRCard ref="crs" class="mt-4 mx-4" :batch="Number(batch)" :key="batch + flag"></CRCard>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import PageSubheader from "@/components/PageSubheader";
import CRForm from "@/components/Form/CRForm";
import LevelTermForm from "@/components/Form/LevelTermForm";
import CRCard from "@/components/Card/CRCard";
export default {
  name: "UserManagerBatch",
  title() {
    return 'User Manager';
  },
  components: {CRCard, LevelTermForm, CRForm, PageSubheader, PageHeader, PaddedContainer},
  data() {
    return {
      batch: this.$route.params.batch,
      flag: 0,
    };
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
    }
  },
  methods: {
    onAppointed() {
      this.flag ^= 1;
      this.$refs.crs.$el.scrollIntoView();
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <padded-container>
    <page-header>Archive</page-header>

    <v-container class="my-5">
      <v-row>
        <v-col
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="item in items"
            :key="item.name"
        >
          <resource-card
              :type="item.type"
              @click.native="$router.push(item.link)"
          >
            {{ item.name }}
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
  </padded-container>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageHeader from "@/components/PageHeader";
import PaddedContainer from "@/components/PaddedContainer";

export default {
  name: "Archive",
  title() {
    return 'Archive';
  },
  data() {
    return {
      items: [
        {
          name: 'Resources',
          type: 'folder',
          link: '/archive/resource',
        },
        {
          name: 'Theses',
          type: 'school',
          link: '/archive/thesis',
        },
        {
          name: 'Projects',
          type: 'file-code',
          link: '/archive/project',
        },
      ],
    };
  },
  components: {
    PaddedContainer,
    ResourceCard,
    PageHeader
  },
}
</script>

<style scoped>

</style>
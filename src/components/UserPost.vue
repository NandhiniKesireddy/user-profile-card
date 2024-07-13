<template>
  <v-card class="mb-4 p-4 shadow-lg">
    <v-card-title class="text-lg font-semibold">{{ post.title }}</v-card-title>
    <v-card-text>{{ post.body }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Styles using Tailwind CSS */
.v-card {
  @apply border border-gray-200 rounded-lg;
}
</style>

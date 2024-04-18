<script setup lang="ts">
defineProps({
  videos: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="flex snap-x">
    <li class="snap-center" v-for="video in videos" :key="video.id">
      <iframe width="420" height="315"
        :src="`https://www.youtube.com/embed/${video.key}`"
        title="YouTube video player" allowfullscreen
      >
      </iframe>
    </li>
  </ul>

</template>

<style scoped>

</style>
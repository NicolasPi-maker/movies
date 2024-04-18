<script setup lang="ts">
 const menu = ref([
   { name: 'Home', url: '/' },
   { name: 'About', url: '/about' },
   { name: 'Movies', url: '/movies' },
 ])

 const route = useRoute();

 const isChildRoute = (url: string) => {
   return new RegExp(url).test(route.path);
 }
</script>

<template>
<ul class="flex w-full bg-black p-4">
  <li v-for="{name, url} in menu" :key="name" class="p-2 text-white" :class="isChildRoute(url) ?? '.router-link-exact-active'">
    <NuxtLink :to="url">{{ name }}</NuxtLink>
  </li>
</ul>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
  @apply text-primary;
}
</style>
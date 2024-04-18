<script setup lang="ts">
  import {useTMDB} from "~/composables/useTMDB";
  import VideoList from "~/components/movies/VideoList.vue";
  const { params, query } = useRoute();

  const state = reactive({
    movie: null,
    error: null,
    isLoading: true,
  });


  const { getMovieById } = useTMDB();
  onMounted(async () => {
    try {
      state.movie =  await getMovieById(params.id, true, '?language=fr-FR&page=1');
      state.isLoading = false;
    } catch (error) {
      state.error = error;
    }
  });

  const trailers = computed(() => {
    return state.movie.videos.results.filter((video) => video.type === 'Trailer');
  });

  const showTrailer = ref(false);
  const toggleShowTrailer = () => {
    if(trailers.value.length > 0) {
      showTrailer.value = !showTrailer.value;
    }
  }
</script>

<template>
  <div v-if="state.isLoading" class="flex justify-center items-center">
    <svg class="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4V0C6.486 0 2 4.486 2 10h4zm2 6.709A8.01 8.01 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-2.709A8.01 8.01 0 0120 12h4c0-5.514-4.486-10-10-10v4z"></path>
    </svg>
  </div>
  <article v-else class="flex movie-wrapper bg-black overflow-hidden">
    <div class="h-full bg-black w-full flex flex-col p-3 relative">
      <div>
        <h1 class="text-snow mb-2 leading-tight">{{ state.movie.title }}</h1>
        <p class="text-snow w-2/4">{{ state.movie.overview }}</p>
      </div>
      <div class="w-full flex mt-6">
        <button @click="toggleShowTrailer"
                class="text-snow rounded px-3 py-2 w-1/4 hover:opacity-80 transition ease-in-out duration-300 cursor-pointer"
                :class="trailers.length <= 0 ? 'bg-secondary' : 'bg-primary'"
        >
          Voir le trailer
        </button>
      </div>
      <Transition>
        <VideoList :videos="trailers" v-if="showTrailer" class="absolute bottom-0 w-full p-0 overflow-y-auto"/>
      </Transition>
    </div>
    <NuxtImg :src="'https://image.tmdb.org/t/p/w500' + state.movie.poster_path" :alt="state.movie.title" class="bg-black object-cover z-10 m-6 rounded" />
  </article>
</template>

<style scoped>
.movie-wrapper {
  height: calc(100vh - 72px);
  width: 100vw;
}

h1 {
  font-size: 7rem;
  font-weight: bold;
}

.v-enter-active, .v-leave-active {
  transition: ease-in-out 0.5s;

}

.v-enter-from, .v-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.v-enter-to, .v-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
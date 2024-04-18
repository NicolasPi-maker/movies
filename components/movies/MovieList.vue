<script setup lang="ts">
import {useTMDB} from "~/composables/useTMDB";

const state = reactive({
  movies: [],
  error: null,
  isLoading: false,
});

const categories = [
  {
    label: 'Populaire',
    value: 'popular',
  },
  {
    label: 'Meilleurs films',
    value: 'top_rated',
  },
  {
    label: 'En salle',
    value: 'now_playing',
  },
  {
    label: 'A venir',
    value: 'upcoming',
  }
];

const { fetchMovies } = useTMDB();
const getMovies = async (category: string) => {
  try {
    const response = await fetchMovies(category, '?language=fr-FR&page=1');
    state.movies = response.results;
  } catch (error) {
    state.error = error;
  } finally {
    state.isLoading = false;
  }
}

onMounted(async () => {
  await getMovies('popular');
});

const determineRateColor = (rate: number) => {
  return rate < 5 ? 'bg-red-400' : rate < 7 ? 'bg-yellow-400' : rate >= 7 ? 'bg-green-400' : 'bg-gray-400';
}
</script>

<template>
  <div>
    <button v-for="category in categories" :key="category" @click="getMovies(category.value)" class="p-2 m-2 bg-primary text-snow rounded">{{ category.label }}</button>
    <Transition>
      <ul class="grid grid-cols-8 m-3 gap-4" v-if="!state.isLoading">
        <li v-for="movie in state.movies" :key="movie.id" class="relative grid-cols-6 rounded cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300" >
          <NuxtLink :to="`/movies/${movie.id}`">
            <NuxtImg :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" class="w-auto rounded" />
            <h3 class="absolute text-white bg-primary rounded p-2 m-3 text-sm line-clamp-2 bottom-0 right-50 shadow">{{ movie.original_title }}</h3>
            <div class="absolute average-point w-3 h-3 rounded-full m-2 flex justify-center items-center shadow-2xl" :class="determineRateColor(movie.vote_average)">
              <p class="text-white font-bold">{{ movie.vote_average.toFixed(1) }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.average-point {
  top: -10px;
  right: 25px;
  transform: translate(50%, 50%);
  width: 2rem;
  height: 2rem;
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.5s;
}

.v-enter, .v-leave-to {
  opacity: 0;
}

.v-enter-to, .v-leave {
  opacity: 1;
}
</style>
<script setup>
import { computed, ref } from 'vue';
import { deburr } from 'lodash';
import { useStore } from 'vuex';
import { useQuery } from 'vue-query';

const store = useStore();
const qs = computed(() => store.getters.queryString);

const { isLoading, data } = useQuery(
  ['characters', qs],
  async () => await fetch(`https://rickandmortyapi.com/api/character?${qs.value}`).then((res) => res.json()),
  {
    staleTime: 30 * 60 * 1000, // 30 min
  }
);

const searchInput = ref('');

const search = () => store.commit(
  'setQuery',
  {
    page: 1,
    name: deburr(searchInput.value.toLowerCase()),
  }
);
</script>

<template>
  <div class="space-y-2 mb-4">
    <h1 class="text-center font-schwifty text-[75px] text-blue">Characters</h1>
    <div class="flex justify-center space-x-2">
      <input v-model="searchInput" type="text" class="p-1 border-blue border w-full max-w-[200px]" placeholder="Search a character" />
      <button class="px-4 text-white bg-blue/50 hover:bg-blue" @click="search">Search</button>
    </div>
    <div class="flex flex-wrap justify-center max-w-[1000px] mx-auto">
      <div v-if="isLoading">loading</div>
      <div v-else v-for="character in data.results" :key="character.id">
        <div class="relative overflow-hidden m-2 border-4 border-blue rounded-xl">
          <img class="h-[150px] w-[150px]" :src="character.image" />
          <div class="absolute bottom-0 h-[35px] w-full flex justify-center items-center bg-blue/80">
            <p class="text-xs font-bold text-white text-center px-1">{{ character.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center space-x-4">
      <button class="px-4 py-2 flex justify-center items-center border-2 border-blue rounded-xl" @click="store.commit('setPage', store.state.query.page - 1)">-</button>
      <button class="px-4 py-2 flex justify-center items-center border-2 border-blue rounded-xl" @click="store.commit('setPage', store.state.query.page + 1)">+</button>
    </div>
  </div>
</template>

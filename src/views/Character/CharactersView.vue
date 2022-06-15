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
const statusInput = ref('');

const search = () => store.commit(
  'setQuery',
  {
    page: 1,
    name: deburr(searchInput.value.toLowerCase()),
    status: statusInput.value,
  }
);
</script>

<template>
  <div class="space-y-2 mb-4 p-4">
    <h1 class="text-center font-schwifty text-[45px] md:text-[75px] text-blue">Characters</h1>
    <div class="space-y-1">
      <div class="flex justify-center space-x-2">
        <input v-model="searchInput" type="text" class="p-1 border-blue border w-full max-w-[200px]" placeholder="Search a character" />
        <button class="px-4 text-white bg-blue/50 hover:bg-blue" @click="search">Search</button>
      </div>
      <div class="space-x-2 text-center">
        <input type="radio" id="all" v-model="statusInput" value="">
        <label for="all">All</label>
        <input type="radio" id="alive" v-model="statusInput" value="alive">
        <label for="alive">Alive</label>
        <input type="radio" id="dead" v-model="statusInput" value="dead">
        <label for="dead">Dead</label>
        <input type="radio" id="unknown" v-model="statusInput" value="unknown">
        <label for="unknown">Unknown</label>
      </div>
    </div>
    <div v-if="isLoading">loading...</div>
    <div v-else>
      <div class="flex flex-wrap justify-center max-w-[1000px] mx-auto">
        <router-link :to="{ name: 'character', params: { id: character.id }}" v-for="character in data.results" :key="character.id">  
          <div class="relative overflow-hidden m-2 border-4 border-blue rounded-xl">
            <img class="h-[150px] w-[150px]" :src="character.image" />
            <div class="absolute bottom-0 h-[35px] w-full flex justify-center items-center bg-blue/80">
              <p class="text-xs font-bold text-white text-center px-1">{{ character.name }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="flex justify-center space-x-4 text-blue">
        <button :disabled="!data.info.prev" class="px-4 py-2 flex justify-center items-center border-2 border-blue rounded-xl disabled:opacity-50" @click="store.commit('setPage', store.state.query.page - 1)">
          <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
        <button :disabled="!data.info.next" class="px-4 py-2 flex justify-center items-center border-2 border-blue rounded-xl disabled:opacity-50" @click="store.commit('setPage', store.state.query.page + 1)">
          <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

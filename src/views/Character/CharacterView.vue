<script setup>
import { ref } from 'vue';
import { useQuery } from 'vue-query';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);

const { isLoading, data } = useQuery(
  ['character', id],
  async () => await fetch(`https://rickandmortyapi.com/api/character/${id.value}`).then((res) => res.json()),
  {
    staleTime: 30 * 60 * 1000, // 30 min
  }
);
</script>

<template>
  <div v-if="isLoading">loading...</div>
  <div v-else class="space-y-2 mb-4 p-4 text-center">
    <button class="px-4 py-2 flex justify-center items-center border-2 border-blue rounded-xl text-blue" @click="router.go('-1')">
      <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
      </svg>
    </button>
    <h1 class="font-schwifty text-[30px] md:text-[75px] text-blue mb-4">{{ data.name }}</h1>
    <div class="border-4 border-blue rounded-xl inline-block overflow-hidden inline-flex flex-col md:flex-row w-[200px] md:w-full max-w-lg">
      <img class="w-full md:w-1/2" :src="data.image" />
      <ul class="w-full md:w-1/2 text-left space-y-2 p-4 bg-blue text-white">
        <li><span class="font-bold">Status:</span> {{ data.status }}</li>
        <li><span class="font-bold">Species:</span> {{ data.species }}</li>
        <li><span class="font-bold">Type:</span> {{ data.type }}</li>
        <li><span class="font-bold">Gender:</span> {{ data.gender }}</li>
      </ul>
    </div>
  </div>
</template>

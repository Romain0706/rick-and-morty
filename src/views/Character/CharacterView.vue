<script setup>
import { ref } from 'vue';
import { useQuery } from 'vue-query';
import { useRoute } from 'vue-router';

const route = useRoute()

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
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-else class="space-y-2 mb-4 p-4 text-center">
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
  </div>
</template>

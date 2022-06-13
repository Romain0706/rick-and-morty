<template>
  <h1>Characters</h1>
  <div v-for="character in data?.results" :key="character.id">
    <img :src="character.image" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery } from 'vue-query';

export default defineComponent({
  setup() {
    const { isLoading, isError, data, error, isFetching } = useQuery('characters', async () => await fetch('https://rickandmortyapi.com/api/character').then((res) => res.json()));

    return { isLoading, isError, data, error, isFetching };
  },
})
</script>

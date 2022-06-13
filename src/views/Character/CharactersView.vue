<template>
  <h1 class="text-center mb-4 font-schwifty text-[50px] text-blue">Characters</h1>
  <div class="flex flex-wrap justify-center bg-portal bg-center bg-no-repeat bg-cover">
    {{ page }}
    <div v-if="isLoading">loading</div>
    <div v-else v-for="character in data.results" :key="character.id">
      <div class="relative overflow-hidden m-2 border-4 border-blue rounded-xl">
        <img class="h-[200px] w-[200px]" :src="character.image" />
        <div class="absolute bottom-0 h-[50px] w-full flex justify-center items-center bg-blue/50">
          <p class="text-sm font-bold text-white text-center">{{ character.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <button @click="this.$store.commit('setPage', page - 1)">-</button>
  <button @click="this.$store.commit('setPage', page + 1)">+</button>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery } from 'vue-query';
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore();
    const { isLoading, isError, data, error, isFetching } = useQuery(`characters ${store.state.page}`, async () => await fetch(`https://rickandmortyapi.com/api/character?page=${store.state.page}`).then((res) => res.json()));

    return { isLoading, isError, data, error, isFetching };
  },
  computed: {
    page () {
      return this.$store.state.page;
    }
  }
})
</script>

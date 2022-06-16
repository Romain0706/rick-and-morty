<template>
  <header>
    <nav class="px-4 py-2 space-x-4 border-b border-blue text-blue">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/characters">Characters</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <VueQueryDevTools />
</template>

<script>
  import { VueQueryDevTools } from 'vue-query/devtools';

  export default {
    components: { VueQueryDevTools },
  };
</script>

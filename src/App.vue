<template>
  <header>
    <nav class="p-4 space-x-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/characters">Characters</RouterLink>
    </nav>
  </header>
  <main class="p-4">
    <RouterView />
  </main>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

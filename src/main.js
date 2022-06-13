import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { VueQueryPlugin } from "vue-query";
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      page: 1
    }
  },
  mutations: {
    setPage (state, x) {
      state.page = x
    }
  }
})

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');

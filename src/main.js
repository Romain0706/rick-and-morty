import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { VueQueryPlugin } from "vue-query";
import { createStore } from 'vuex';
import { pickBy } from 'lodash';

const store = createStore({
  state () {
    return {
      query: {
        page: 1,
        name: '',
        status: '',
      },
    }
  },
  mutations: {
    setPage (state, x) {
      state.query.page = x;
    },
    setQuery (state, x) {
      state.query = x;
    }
  },
  getters: {
    queryString (state) {
      const qs = new URLSearchParams(pickBy(state.query, (value) => !!value));
      return qs.toString();
    }
  }
})

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');

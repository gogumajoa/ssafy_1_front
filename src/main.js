import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from 'vue-router'

import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import mapStore from './stores/mapStore'
import { useKakao } from 'vue3-kakao-maps/@utils';



const app = createApp(App);
app.component("infinite-loading", InfiniteLoading);
// useKakao('09316730468c51f3db117b54370b686c');
app.use(mapStore);
app.use(createPinia());
app.use(router);

app.mount("#app");

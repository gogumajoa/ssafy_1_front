import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
const app = createApp(App);
app.component("infinite-loading", InfiniteLoading);

app.use(createPinia());
app.use(router);

app.mount("#app");

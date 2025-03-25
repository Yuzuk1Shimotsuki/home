import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// Import pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// swiper
import "swiper/css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // Pop up update notification
  console.log("站點已更新，刷新後生效");
  ElMessage("站點已更新，刷新後生效");
});
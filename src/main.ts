import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'

// axios.defaults.withCredentials = true
axios.interceptors.response.use(undefined, function (error) {
    if (error){
      const originalRequest = error.config;
      if (error.response.status === 401 && originalRequest._retry){
        originalRequest._retry = true;
        sessionStorage.clear();
        window.localStorage.clear();
        return router.push('/sign-in')
      }
    }
})

createApp(App).use(store).use(router).use(PerfectScrollbar).use(Notifications).mount('#app')
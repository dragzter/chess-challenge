import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import {createPinia} from "pinia";

// BS imports
import "bootstrap/dist/css/bootstrap.min.css";


const pinia = createPinia()

createApp(App).use(pinia).mount('#app')

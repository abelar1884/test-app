import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './views/app.vue'
Vue.use(BootstrapVue)

Vue.use(VueAxios, axios)

const app = new Vue({
    el: '#app',
    store,
    components: { App }
});

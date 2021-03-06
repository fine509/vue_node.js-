import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosss from './axios'
import { Message } from 'element-ui';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入BOOSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "zico/css/zico.min.css";


Vue.use(ElementUI);
Vue.prototype.$axios = axiosss
    //事件总线
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
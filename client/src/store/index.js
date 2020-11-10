import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations'
import getters from './getters'
import actions from './actions'


export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user: {}
    },
    getters: getters,

    mutations: mutations,

    actions: actions

})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
        parents: [],
        gateway: 'http://zuul.paas-ta.org/',
    },
});
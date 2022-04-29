import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
    state () {
        return {
            perPage: 3,
            comments: [],
            sortable: {
                by: 'id',
                isDesc: false
            }
        }
    },
    getters: {
        allComments(state) {
            return state.comments
        }
    },
    mutations: {
        setComments (state, comments) {
            state.comments = comments
        },
        setSortable (state, sortable) {
            state.sortable = sortable
        }
    },
    actions: {
        fetchComments ({ commit }) {
            axios.get('/api/comments')
                .then(({ data }) => commit('setComments', data))
        },
        createComment (context, payload) {
            return axios.post('/api/comments', payload)
        },
        removeComment (context, id) {
            return axios.delete(`/api/comments/${id}`)
        },
        editComment () {

        }
    }
})

export default store

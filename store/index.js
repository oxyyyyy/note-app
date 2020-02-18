import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      notes: []
    },
    mutations: {
      setNotes(state, notes) {
        state.notes = notes
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('https://note-app-690b5.firebaseio.com/notes.json')
          .then((response) => {
            const notesWithIds = []
            for (const key in response.data) {
              notesWithIds.push({ ...response.data[key], id: key })
            }
            vuexContext.commit('setNotes', notesWithIds)
          })
          .catch((e) => {
            console.log(e)
          })
      },
      updateNotes(vuexContext, context) {
        axios
          .get('https://note-app-690b5.firebaseio.com/notes.json')
          .then((response) => {
            const notesWithIds = []
            for (const key in response.data) {
              notesWithIds.push({ ...response.data[key], id: key })
            }
            vuexContext.commit('setNotes', notesWithIds)
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
    getters: {
      getNotes(state) {
        return state.notes
      }
    }
  })

export default store

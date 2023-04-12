import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    all_transactions: [],
    all_coin: [],
    testimonials_list: []
  },
  mutations: {
    storeTransactions(state, payload){
      state.all_transactions = payload.all_transactions
    },
    storeCoins(state, payload){
      state.all_coin = payload.all_coin
    }, 
    storeTestimonials(state, payload){
      state.testimonials_list = payload.testimonials_list
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})

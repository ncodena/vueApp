import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// const getDefaultState = () => {
//   return {
//     beer: {}
//   }
// };

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    beers: [],
    beer: {},
    relatedBeers: [],
    randomBeer: {},
    categoriesBeers: []
  },

  getters: {
    indexBeers: state => state.beers,
    detailsBeer: state => state.beer,
    indexRelatedBeers: state => state.relatedBeers,
    randomData: state => state.randomBeer,
    indexCategories: state => state.categoriesBeers
  },
  mutations: {
    setBeers: (state, beers) => (state.beers = beers),
    detailsBeer: (state, beer) => (state.beer = beer),
    indexRelatedBeers: (state, relatedBeers) =>
      (state.relatedBeers = relatedBeers),
    setRandomBeer: (state, randomBeer) => (state.randomBeer = randomBeer),
    setCategories: (state, categoriesBeers) => (state.categoriesBeers = categoriesBeers)
    // resetState (state) {
    //   Object.assign(state)
    // }
  },
  actions: {
    // resetState ({commit}){
    //   commit('resetState')
    // },

    async fetchBeers({ commit }) {
      const response = await axios
        .get("https://api.punkapi.com/v2/beers?page=10")

        .then(response => response);

      commit("setBeers", response.data);
    },

    async fetchBeer({ commit }, id) {
      const response = await axios

        .get(`https://api.punkapi.com/v2/beers?ids=${id}`)

        .then(response => response);

      commit("detailsBeer", response.data);
    },

    async fetchRelated({ commit }, id) {
      const response = await axios
        .get(`https://api.punkapi.com/v2/beers?ids=${id}`)

        .then(async response => {
          const yeast = response.data[0].ingredients.yeast;
          return await axios.get(
            `https://api.punkapi.com/v2/beers?per_page=3&yeast=${yeast}`
          );
        })
        .then(response => response);
      console.log(response.data);
      commit("indexRelatedBeers", response.data);
    },

    async fetchRandomBeer({ commit }) {
      const response = await axios
        .get("https://api.punkapi.com/v2/beers/random")

        .then(response => response);
      console.log(response.data);

      commit("setRandomBeer", response.data);
    },
    async fetchCategories({ commit }) {
      const response = await axios
        .get('https://api.punkapi.com/v2/beers?per_page=80')
  
        .then(response => response);
      console.log("from store", response.data);
      commit("setCategories", response.data);
    }
  }
  
});

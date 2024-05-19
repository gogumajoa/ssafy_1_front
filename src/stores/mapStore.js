// store/modules/touristSpots.js
import axios from 'axios';

const state = () => ({
  touristSpots: [],
  page: 1,
  detailSpot :null,
});

const mutations = {
  setDetailSpot(state, spot) {
    state.detailSpot = spot;
  },
  
  SET_TOURIST_SPOTS(state, spots) {
    state.touristSpots = spots;
  },
  ADD_TOURIST_SPOTS(state, spots) {
    console.log('SET_TOURIST_SPOTS mutation called with spots:', spots);

    state.touristSpots.push(...spots);
  },
  INCREMENT_PAGE(state) {
    state.page++;
  },

};

const actions = {
  async loadTouristSpots({ commit, state }, $state) {
    try {
      const response = await axios.get('http://localhost:8080/touristspot', {
        params: {
          pageSize: 10,
          pageNum: state.page * 10 + 1,
        }
      });
      const json = response.data;
      if (json.length < 10) {
        $state.complete();
      } else {
        commit('ADD_TOURIST_SPOTS', json);
        $state.loaded();
      }
      commit('INCREMENT_PAGE');
    } catch (error) {
      console.error('Error loading more items:', error);
      $state.complete();
    }
  }
};

const getters = {
  touristSpots: state => state.touristSpots,
};

export default {
  namespaced: true,  // 네임스페이스 설정
  state,
  mutations,
  actions,
  getters
};

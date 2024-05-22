import axios from 'axios';

const state = () => ({
  touristSpots: [],
  page: 1,
  detailSpot: null,
  keyword: '', // 검색 키워드를 상태로 저장
  
});

const mutations = {
  setDetailSpot(state, spot) {
    state.detailSpot = spot;
  },
  SET_TOURIST_SPOTS(state, spots) {
    state.touristSpots = spots;
  },
  ADD_TOURIST_SPOTS(state, spots) {
    console.log('ADD_TOURIST_SPOTS mutation called with spots:', spots);
    state.touristSpots.push(...spots);
  },
  INCREMENT_PAGE(state) {
    state.page++;
  },
  RESET_PAGE(state) {
    state.page = 0;
  },
  CLEAR_TOURIST_SPOTS(state) {
    console.log('CLEAR_TOURIST_SPOTS');
    state.touristSpots = [];
  },
  SET_KEYWORD(state, keyword) {
    state.keyword = keyword;
  },
};

const actions = {
  async loadTouristSpots({ commit, state }, $state) {
    try {
      const response = await axios.get('http://localhost:8080/touristspot', {
        params: {
          pageSize: 10,
          pageNum: state.page*10,
        },
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
  },

  async searchTouristSpots({ commit, state }, $state) {
    try {
      const response = await axios.get(`http://localhost:8080/touristspot/keyword/${state.keyword}`, {
        params: {
          pageSize: 10,
          pageNum: state.page*10,
        },
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
      console.error('Error searching for items:', error);
      $state.complete();
    }
  },
  async initiateSearch({ commit, dispatch }, keyword) {
    try {
      commit('RESET_PAGE');
      commit('SET_KEYWORD', keyword);
      console.log(`Keyword for search: ${keyword}`);

      const response = await axios.get(`http://localhost:8080/touristspot/keyword/${keyword}`, {
        params: {
          pageSize: 10,
          pageNum: 0, // 처음 검색 시에는 첫 페이지를 불러옴
        },
      });

      const spots = response.data;
      console.log('Spots received from API:', spots);

      if (Array.isArray(spots)) {
        commit('CLEAR_TOURIST_SPOTS');
        commit('SET_TOURIST_SPOTS', spots);
        commit('INCREMENT_PAGE');
      } else {
        console.error('Error: Data received is not an array', spots);
      }
    } catch (error) {
      console.error('Error initiating search:', error);
    }
  },
};

const getters = {
  touristSpots: state => state.touristSpots,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

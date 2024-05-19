// store/index.js
import { createStore } from 'vuex';
import touristSpots from './mapStore';

const store = createStore({
  modules: {
    touristSpots
  }
});

export default store;

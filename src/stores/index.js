// store/index.js
import { createStore } from 'vuex';
import touristSpots from './mapStore';
import mbti from './mbtiStore';

const store = createStore({
  modules: {
    touristSpots : touristSpots,
    mbti : mbti,
    
  }
});

export default store;

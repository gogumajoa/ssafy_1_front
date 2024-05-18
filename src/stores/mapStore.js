import { reactive } from 'vue';

// 초기 상태
const state = reactive({
  touristSpots: [],
});

// 데이터를 가져오는 액션
const fetchTouristSpots = async () => {
  try {
    const response = await axios.get('http://localhost:8080/touristspot', {
      params: {
        pageSize: 10,
        pageNum: 1
      }
    });
    state.touristSpots = response.data;
  } catch (error) {
    console.error('Error fetching tourist spots:', error);
  }
};

export default {
  state,
  fetchTouristSpots,
};

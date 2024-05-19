<template>
  <div class="results-container">
    <div v-for="spot in touristSpots" :key="spot.id" class="result">
      <div>
        <h5>{{ spot.touristspotTitle }}</h5>
        <p>{{ spot.description }}</p>
      </div>
      <div>{{ spot.touristspotAddr }}</div>
    </div>
    <InfiniteLoading @infinite="load"></InfiniteLoading>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import InfiniteLoading from 'v3-infinite-loading';

const touristSpots = ref([]);
let page=1;
const load = async $state => {
  try {
    const response = await axios.get('http://localhost:8080/touristspot', {
      params: {
        pageSize: 10,
        pageNum: page*10+1,
        //touristSpots.value.length / 10 + 1
      }
    });
    const json = response.data;
    if (json.length < 10) {
      $state.complete();
    } else {
      touristSpots.value.push(...json);
      $state.loaded(); // Notify InfiniteLoading that more items have been loaded
    }
    page++;
    console.log(touristSpots.value);

  } catch (error) {
    console.error('Error loading more items:', error);
    $state.complete(); // Ensure the loading state is reset in case of error
  }
};

// 페이지 로드시 초기 데이터 불러오기
onMounted(() => {
  load({
    complete() {},
    loaded() {}
  });
});
</script>

<style>
.results-container {
  top: 10%;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 20px;
  position: absolute;
  z-index: 10;
  border-radius: 10px;
  left: 20px;
  background-color: white;
}
.result {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.result h5 {
  margin: 0 0 5px 0;
}
.result div {
  font-size: 14px;
  color: #666;
}
</style>

<template>
  <div class="results-container">
    <div v-for="spot in touristSpots" :key="spot.id" class="result" @click="showDetail(spot)">
      <div>
        <h5>{{ spot.touristspotTitle }}</h5>
        <p>{{ spot.description }}</p>
      </div>
      <div>{{ spot.touristspotAddr }}</div>
    </div>
    <InfiniteLoading @infinite="load"></InfiniteLoading>
  </div>
  <Detail :spot="selectedSpot" v-if="selectedSpot"></Detail>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import InfiniteLoading from 'v3-infinite-loading';
import Detail from './TouristSpotDetail.vue'; // Detail 컴포넌트를 import

const selectedSpot = ref(null);

const store = useStore();
const touristSpots = computed(() => store.getters['touristSpots/touristSpots']);

const load = $state => {
  store.dispatch('touristSpots/loadTouristSpots', $state);
};

const showDetail = (spot) => {
  selectedSpot.value = spot;
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

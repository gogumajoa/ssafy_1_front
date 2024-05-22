<template>
  <div>
    <input class="search" type="text" v-model="keyword" placeholder="장소를 검색하세요" />
    <button class="filter" type="button" @click="initiateSearch">검색</button>
    <div class="results-container">
      <div v-for="spot in touristSpots" :key="spot.id"
           class="result"
           @click="moveToSpot(spot)"
           @mouseenter="spot.highlighted = true" @mouseleave="spot.highlighted = false"
           :class="{ 'highlight': spot.highlighted }">
        <div class="spot-header">
          <h6>{{ spot.touristspotTitle }}</h6>
          <p class="MBTI">{{ getGreaterLikeEI(spot) }}{{ getGreaterLikeSN(spot) }}{{ getGreaterLikeFT(spot) }}{{ getGreaterLikePJ(spot) }} PICK</p>
          <p>{{ spot.description }}</p>
        </div>
        <div>{{ spot.touristspotAddr }}</div>
      </div>
      <InfiniteLoading @infinite="load"></InfiniteLoading>
    </div>
    <Detail :spot="selectedSpot" v-if="selectedSpot"></Detail>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import InfiniteLoading from 'v3-infinite-loading';
import Detail from './TouristSpotDetail.vue';

const store = useStore();
const keyword = ref('');
const selectedSpot = ref(null);
const touristSpots = computed(() => store.getters['touristSpots/touristSpots']);

// emit 함수를 정의합니다.
const emit = defineEmits(['move-to-spot']);

const load = $state => {
  if (keyword.value) {
    store.dispatch('touristSpots/searchTouristSpots', $state);
  } else {
    store.dispatch('touristSpots/loadTouristSpots', $state);
  }
};

const initiateSearch = () => {
  store.dispatch('touristSpots/initiateSearch', keyword.value);
};

const moveToSpot = function(spot) {
  selectedSpot.value = spot;
  // 이벤트를 발생시켜 부모 컴포넌트에 spot 정보를 전달
  emit('move-to-spot', spot);
};

const getGreaterLikeEI = (spot) => {
  return spot.likeE > spot.likeI ? 'E' : 'I';
};

const getGreaterLikeSN = (spot) => {
  return spot.likeS > spot.likeN ? 'S' : 'N';
};

const getGreaterLikeFT = (spot) => {
  return spot.likeF > spot.likeT ? 'F' : 'T';
};

const getGreaterLikePJ = (spot) => {
  return spot.likeP > spot.likeJ ? 'P' : 'J';
};

onMounted(() => {
  load({
    complete() {},
    loaded() {}
  });
});
</script>


<style>
.highlight {
  background-color: lightgray;
}

.results-container {
  top: 10%;
  width: 285px;
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
.spot-header {
  display: flex;
  align-items: center;
}

.spot-header h6 {
  margin: 0;
  margin-right: 10px; /* Optional: Adds some space between the h5 and p */
}

.MBTI {
  margin: 0;
  background-color: #adadad;
  color: white;
  border-radius: 8px;
  text-align: center;
  width: 80px;
}
.search {
  position: absolute;
  top: 2%;
  width: 73%;
  height: 3%;
  padding: 18px;
  border-radius: 10px;
  border: white;
  background-color: white;
}
.filter {
  /* background-image: url(https://cdn-icons-png.flaticon.com/512/6488/6488674.png); */
  /* background-repeat: no-repeat; */
  /* background-position: center; */
  /* background-size: 70%; */
  line-height: 1px;
  left: 82%;
  position: absolute;
  top: 2%;
  width: 24%;
  height: 3%;
  padding: 18px;
  border-radius: 10px;
  
  border: white;
  background-color: white;
}
</style>

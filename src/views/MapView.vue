// MapView.vue

<template>
  <div class="container" :class="{ 'detail-open': selectedPlace }" @click="handleContainerClick">
    <div class="sidebar">
      <!-- 검색 입력 폼  -->
      <input class="search" type="text" v-model="keyword" placeholder="장소를 검색하세요" @input="filterPlaces" />
      <button class="filter" type="button"></button>
      <!-- 장소 목록  -->
      <TouristSpotList :touristSpots="touristSpots"></TouristSpotList>
    </div> 
    <!-- 날씨 -->
    <Weather/>
    <!-- 지도 영역 -->
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import axios from 'axios';
import TouristSpotList from '@/components/Map/TouristSpotList.vue'
import Weather from '@/components/Map/Weather.vue'
import mapStore from '@/stores/mapStore.js';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MapView',
  components: {
    TouristSpotList,
    Weather
  },
  data() {
    return {
      touristSpots: []
    };
  },
  methods: {
    addMarkersToMap() {
      // 카카오맵 API를 통해 마커를 생성하고 지도에 추가
      this.touristSpots.forEach(spot => {
        if (spot.latitude && spot.longitude) { // 경도와 위도 값이 있는지 확인
          const markerPosition = new window.kakao.maps.LatLng(spot.latitude, spot.longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(this.map);
        }
      });
    }
  },
  mounted() {
    // Kakao Maps API 스크립트 로드
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=09316730468c51f3db117b54370b686c&libraries=services"; // 여기서 YOUR_APP_KEY를 실제 키로 바꿔야 합니다.
    document.head.appendChild(script);

    // Kakao Maps API 스크립트 로드 후 콜백으로 지도 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = this.$refs.map;
        const options = {
          center: new window.kakao.maps.LatLng(35.76176465, 129.3649053),
          level: 3
        };
        this.map = new window.kakao.maps.Map(container, options);
        
        // 마커 추가 함수 호출
        this.addMarkersToMap();
      });
    };
  }
};
</script>

<style scoped>
.container {
  padding-right: 0;
  padding-left: 0;
  display: flex;
  height: 100vh;
  width: 100vw !important;
  align-items: center;
  flex-direction: column;
}
.sidebar {
  position: absolute;
  top: 0;
  left: 1%;
  z-index: 1;
  width: 15%;
  height: 90%;
  padding: 20px;
}
.search {
  position: absolute;
  top: 2%;
  width: 85%;
  height: 3%;
  padding: 18px;
  border-radius: 10px;
  border: white;
  background-color: white;
}
.filter {
  background-image: url(https://cdn-icons-png.flaticon.com/512/6488/6488674.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  left: 95%;
  position: absolute;
  top: 2%;
  width: 13%;
  height: 3%;
  padding: 18px;
  border-radius: 10px;
  border: white;
  background-color: white;
}
.map {
  height: 100vh !important;
  width: 100vw !important;
  z-index: 0;
}
</style>

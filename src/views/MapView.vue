<!-- MapView.vue -->
<template>
  <div class="container" :class="{ 'detail-open': selectedPlace }" @click="handleContainerClick">
    <div class="sidebar">
      <!-- 장소 목록 -->
      <TouristSpotList :touristSpots="touristSpots" @move-to-spot="moveToSpot" />
    </div>
    <!-- 날씨 -->
    <Weather />
    <!-- 지도 영역 -->
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import axios from 'axios';
import TouristSpotList from '@/components/Map/TouristSpotList.vue';
import Weather from '@/components/Map/Weather.vue';
import Detail from '@/components/Map/TouristSpotDetail.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MapView',
  components: {
    TouristSpotList,
    Weather,
    Detail
  },
  data() {
    return {
      map: null, // 카카오맵 객체
      markers: [], // 마커들을 저장할 배열
      selectedSpot: null // 선택된 관광지 정보를 저장할 변수
    };
  },
  methods: {
    moveToSpot(spot){
      this.selectedSpot = spot;
      if (this.map) {
        const markerPosition = new window.kakao.maps.LatLng(spot.touristspotLatitude, spot.touristspotLongitude);
        this.map.setCenter(markerPosition); // 선택된 장소의 위치로 지도 이동
      }
    },
    addMarker(spot) {
      const markerPosition = new window.kakao.maps.LatLng(spot.touristspotLatitude, spot.touristspotLongitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    }
  },
  mounted() {
    // Kakao Maps API 스크립트 로드
    let count=1;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=09316730468c51f3db117b54370b686c&libraries=services'; // 여기서 YOUR_APP_KEY를 실제 키로 바꿔야 합니다.
    document.head.appendChild(script);

    // Kakao Maps API 스크립트 로드 후 콜백으로 지도 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = this.$refs.map;
        const options = {
          center: new window.kakao.maps.LatLng(35.76176465, 129.3649053),
          level: 10
        };
        this.map = new window.kakao.maps.Map(container, options);

        // 초기 마커 추가
        const initialSpots = this.$store.state.touristSpots; // 초기 관광지 정보를 가져옵니다.
        initialSpots.touristSpots.forEach(spot => {
          if(count===1){
            const markerPosition = new window.kakao.maps.LatLng(spot.touristspotLatitude, spot.touristspotLongitude);
            this.map.setCenter(markerPosition);
            count--;
          }
          this.addMarker(spot); // 초기 관광지 정보를 기반으로 마커를 추가합니다.
        });

        // Vuex store의 관광지 정보를 감시하여 상태가 변경될 때마다 마커를 추가합니다.
        this.$store.subscribe((mutation, state) => {
          console.log(mutation.type);
          if (mutation.type === 'touristSpots/ADD_TOURIST_SPOTS') {
            const newSpots = mutation.payload; // 새로운 관광지 정보를 가져옵니다.
            newSpots.forEach(spot => {
              this.addMarker(spot); // 새로운 관광지 정보를 기반으로 마커를 추가합니다.
            });
          }
          else if(mutation.type === 'touristSpots/SET_TOURIST_SPOTS'){
             // 새로운 관광지 정보를 가져옵니다.
            const newSpots = mutation.payload;
            console.log(newSpots);
            
            // 기존 마커 제거
            this.markers.forEach(marker => {
              marker.setMap(null);
            });
            this.markers = []; // 마커 배열 초기화

            // 새로운 관광지 정보를 기반으로 마커를 추가합니다.
            newSpots.forEach(spot => {
              this.addMarker(spot);
            });
          }
        });
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
.map {
  height: 100vh !important;
  width: 100vw !important;
  z-index: 0;
}
</style>

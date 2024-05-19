// MapView.vue

<template>
  <div class="container" :class="{ 'detail-open': selectedPlace }" @click="handleContainerClick">
    <div class="sidebar">
      <!-- 검색 입력 폼  -->
      <input class="search" type="text" v-model="keyword" placeholder="장소를 검색하세요" @input="filterPlaces" />
      <button class="filter" type="button"></button>
      <!-- 장소 목록  -->
<TouristSpotList :touristSpots="touristSpots" @spot-click="showDetail"></TouristSpotList>    </div> 
    <!-- 날씨 -->
    <Weather/>
    <!-- 지도 영역 -->
    <div ref="map" class="map"></div>
    <!-- Detail 컴포넌트 -->
    <Detail v-if="selectedSpotId" :spotId="selectedSpotId" />

  </div>
</template>

<script>
import axios from 'axios';
import TouristSpotList from '@/components/Map/TouristSpotList.vue'
import Weather from '@/components/Map/Weather.vue'
import mapStore from '@/stores/mapStore.js';
import Detail from '@/components/Map/TouristSpotDetail.vue'
import store from '@/stores/index.js'; // 수정
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
      touristSpots: [],
      map: null, // 카카오맵 객체
      markers: [] // 마커들을 저장할 배열
    };
  },
  methods: {
    addMarker(spot) {
      console.log('spot : ', spot);
      //console.log(spot.touristspotLatitude);
      const markerPosition = new window.kakao.maps.LatLng(spot.touristspotLatitude, spot.touristspotLongitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

     // 마커가 표시될 HTML 요소 생성
  const markerElement = document.createElement('div');
  markerElement.innerHTML = `<div class="custom-marker">${spot.touristspotTitle}</div>`;

      marker.setMap(this.map);

        // 마커 위에 HTML 요소 추가
  const markerOverlay = new window.kakao.maps.CustomOverlay({
    content: markerElement,
    position: marker.getPosition(),
    yAnchor: -0.2 // 마커 아래로 10px 내려감
  });
  markerOverlay.setMap(this.map);

      this.markers.push(marker);
    },

    
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

      // 초기 마커 추가
      const initialSpots = this.$store.state.touristSpots; // 초기 관광지 정보를 가져옵니다.
      console.log(initialSpots);
      initialSpots.touristSpots.forEach(spot => {
        this.addMarker(spot); // 초기 관광지 정보를 기반으로 마커를 추가합니다.
      });


      // Vuex store의 관광지 정보를 감시하여 상태가 변경될 때마다 마커를 추가합니다.
      this.$store.subscribe((mutation, state) => {
        console.log(mutation);
        console.log(state);
        if (mutation.type === 'touristSpots/ADD_TOURIST_SPOTS') {
          const newSpots = mutation.payload; // 새로운 관광지 정보를 가져옵니다.
          console.log(newSpots);
          newSpots.forEach(spot => {
            this.addMarker(spot); // 새로운 관광지 정보를 기반으로 마커를 추가합니다.
          });
        }
      });
    });
  }
}
}
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

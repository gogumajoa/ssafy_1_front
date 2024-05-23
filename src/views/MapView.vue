<template>
  <div class="container" :class="{ 'detail-open': selectedSpot }" @click="handleContainerClick">
    <div class="sidebar">
      <!-- 장소 목록 -->
      <TouristSpotList :touristSpots="touristSpots" @move-to-spot="moveToSpot" />
    </div>
    <!-- 날씨 -->
    <Weather ref="weather" :nx="nx" :ny="ny" />
    <!-- 지도 영역 -->
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import axios from 'axios';
import TouristSpotList from '@/components/Map/TouristSpotList.vue';
import Weather from '@/components/Map/Weather.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MapView',
  components: {
    TouristSpotList,
    Weather,
  },
  data() {
    return {
      map: null, // 카카오맵 객체
      markers: [], // 마커들을 저장할 배열
      selectedSpot: null, // 선택된 관광지 정보를 저장할 변수
      nx: 0,
      ny: 0,
      openInfowindow: null // 현재 열린 인포윈도우를 저장할 변수
    };
  },
  methods: {
    async handleMapChange() {
      // 지도가 변경되었을 때의 로직을 처리합니다.
      const beforeNx = 0;
      const beforeNy = 0;
      // 새로운 nx, ny 값을 계산합니다.
      const center = this.map.getCenter();
      const nx = center.getLat();
      const ny = center.getLng();

      console.log(nx, ny);
      // fetch-weather-data 이벤트를 발생시키고 nx와 ny 값을 함께 전달합니다.
      //this.$emit('fetch-weather-data', { nx, ny });
    
      if (Math.abs(nx - beforeNx) >= 1 || Math.abs(ny - beforeNy) >= 1) {
        // 변경된 경우 fetchWeatherData 메서드를 호출합니다.
        this.$refs.weather.fetchWeatherData({ nx, ny });

        // 변경된 nx와 ny 값을 이전 값으로 업데이트합니다.
        this.beforeNx = nx;
        this.beforeNy = ny;
      }
    },

    moveToSpot(spot) {
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

      // 인포윈도우 내용 생성 함수
      const makeContent = (content) => {
        let c = `
          <div class="card" style="width: 18rem; background: white;">
            <img class="card-img-top" src="${content.touristspotImage}" alt="Card image cap" style="background: white;">
            <div class="card-body" style="background-color: white;">
              <h5 class="card-title" style="background: white;">${content.touristspotTitle}</h5>
              <p class="card-text" style="background: white;">${content.touristspotAddr}</p>
              <div style="text-align: right;"> <!-- 오른쪽 정렬을 위한 래핑 div -->
                <button class="btn-close" aria-label="Close"></button>
              </div>
            </div>
          </div>
        `;
        return c;
      };

      // 인포윈도우 내용 생성
      const contentString = makeContent(spot);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: contentString
      });

      // 클릭 이벤트 핸들러 등록
      marker.addListener('click', () => {
        // 이전에 열린 인포윈도우가 있으면 닫기
        if (this.openInfowindow) {
          this.openInfowindow.close();
        }

        // 현재 인포윈도우 열기
        infowindow.open(this.map, marker);
        this.openInfowindow = infowindow; // 현재 열린 인포윈도우 업데이트

        // 인포윈도우 내부의 버튼에 클릭 이벤트 추가
        setTimeout(() => { // 인포윈도우가 열리고 나서 DOM에 추가되어야 하므로 setTimeout 사용
          const closeButton = document.querySelector('.btn-close');
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              infowindow.close();
              this.openInfowindow = null; // 인포윈도우가 닫히면 상태 업데이트
            });
          }
        }, 0);
      });

      marker.setMap(this.map);
      this.markers.push(marker);
    }
  },
  mounted() {
    // Kakao Maps API 스크립트 로드
    let count = 1;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=09316730468c51f3db117b54370b686c&libraries=services'; // 여기서 YOUR_APP_KEY를 실제 키로 바꿔야 합니다.
    document.head.appendChild(script);

    // Kakao Maps API 스크립트 로드 후 콜백으로 지도 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = this.$refs.map;
        const options = {
          center: new window.kakao.maps.LatLng(38, 135),
          level: 10
        };
        this.map = new window.kakao.maps.Map(container, options);

        const center = this.map.getCenter();
        const nx = center.getLat();
        const ny = center.getLng();

        this.$refs.weather.fetchWeatherData({ nx, ny });

        // 지도 드래그가 끝날 때 이벤트 핸들러를 호출합니다.
        kakao.maps.event.addListener(this.map, 'dragend', this.handleMapChange);

        // 초기 마커 추가
        const initialSpots = this.$store.state.touristSpots; // 초기 관광지 정보를 가져옵니다.
        initialSpots.touristSpots.forEach(spot => {
          if (count === 1) {
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
          } else if (mutation.type === 'touristSpots/SET_TOURIST_SPOTS') {
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
  },
  watch: {
    // nx, ny 값이 변경될 때마다 fetchWeatherData를 호출합니다.
    nx(newNx, oldNx) {
      if (newNx !== oldNx) {
        this.fetchWeatherData();
      }
    },
    ny(newNy, oldNy) {
      if (newNy !== oldNy) {
        this.fetchWeatherData();
      }
    }
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
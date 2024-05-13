<template>
<h1> 관광지 추천 </h1>
  <div class="container" :class="{ 'detail-open': selectedPlace }" @click="handleContainerClick">
    <div class="sidebar">
      <!-- 검색 입력 폼 -->
      <input type="text" v-model="keyword" placeholder="장소를 검색하세요" @input="filterPlaces" />

      <!-- 장소 목록 -->
      <ul>
        <li v-for="(place, index) in filteredPlaces" :key="index" @click="selectPlace(place)">
          {{ place.name }}
        </li>
      </ul>
    </div>


    <!-- 선택된 장소 정보 -->
    <div v-if="selectedPlace" class="detail">
      <div class="detail-header">{{ selectedPlace.name }}</div>
      <div class="detail-content">
        <p>{{ selectedPlace.address }}</p>
        <h3>해당하는 게시글</h3>
        <ul>
          <div v-for="(data, index) in filteredTravelData" :key="index">
            <div @click="navigateToPostPage(data)">
              <hr>
              {{ data.title }}
              <br>
              <p>{{ summarizeContent(data.content) }}</p>
            </div>
          </div>
        </ul>
      </div>
      <button @click="closeDetail" class="close-button">×</button>
    </div>

    <!-- 날씨 -->
    
    <div class="custom_typecontrol radius_border">
        <img src="data:image/png;base64,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" style="height:45px">
        <img src="data:image/png;base64,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" style="height:45px">
        <img src="data:image/png;base64,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" style="height:45px">
    
    </div>

    <!-- 지도 영역 -->
    <div ref="map" class="map" :style="{ width: mapWidth }"></div>
  </div>
</template>

<script>
import travelData from '@/service/dummy'; // travelData 불러오기

export default {
  name: 'MapWithPlaces',
  data() {
    return {
      keyword: '',
      places: [
        { name: '장소 1', address: '주소 1', latitude: 37.5665, longitude: 126.9780, num: 1 },
        { name: '장소 2', address: '주소 2', latitude: 37.5670, longitude: 126.9775, num: 2 },
        { name: '장소 3', address: '주소 3', latitude: 37.5675, longitude: 126.9770, num: 3 },
      ],
      filteredPlaces: [],
      selectedPlace: null,
      map: null,
      mapWidth: '100%',
    };
  },
  computed: {
    filteredTravelData() {
      return travelData.filter(data => data.num === this.selectedPlace.num);
    },
  },
  methods: {
    
    navigateToPostPage(data) {
      console.log("hi")
    // 선택된 데이터가 있을 때만 해당 페이지로 이동
    if (data) {
      window.open("/");  //새창으로 띄운다.
    }
  },
    filterPlaces() {
      const keyword = this.keyword.toLowerCase();
      this.filteredPlaces = this.places.filter(place =>
        place.name.toLowerCase().includes(keyword) || place.address.toLowerCase().includes(keyword)
      );
      this.showAllMarkers();
    },
    selectPlace(place) {
      this.selectedPlace = place;
      this.moveToPlace(place);
    },
    moveToPlace(place) {
      const moveLatLng = new window.kakao.maps.LatLng(place.latitude, place.longitude);
      this.map.panTo(moveLatLng);
    },
    initializeMarkers() {
      this.places.forEach(place => {
        const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(this.map);

        const overlayContent = `<div class="overlay">${place.name}</div>`;
        const overlay = new window.kakao.maps.CustomOverlay({
          content: overlayContent,
          position: markerPosition,
          yAnchor: 0,
        });
        overlay.setMap(this.map);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          this.selectPlace(place);
        });
      });
    },
    showAllMarkers() {
      if (this.infowindows) { // infowindows 배열이 정의되어 있는지 확인
        this.infowindows.forEach(infowindow => infowindow.close()); // 배열이 정의되어 있을 때만 반복문 실행
      }
    },
    closeDetail() {
      this.selectedPlace = null;
    },
    summarizeContent(content) {
      return content.split('.')[0] + ' 더보기+'; // 첫 번째 문장만 출력
    },
    handleContainerClick(event) {
      // detail 영역이 열려 있을 때는 이벤트를 막아서 페이지 이동이 실행되지 않도록 함
      if (!this.selectedPlace) {
        const clickedElement = event.target;

        // 클릭된 요소가 div.container가 아닌 경우에만 페이지 이동 실행
        if (clickedElement && !clickedElement.closest('.detail')) {
          // 선택된 장소가 없고, 클릭된 요소가 detail 영역이 아닌 경우에만 페이지 이동
          const placeElement = clickedElement.closest('li');
          if (placeElement) {
            const index = placeElement.getAttribute('data-index');
            this.selectPlace(this.filteredPlaces[index]);
          }
        }
      }
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
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.filteredPlaces = this.places;
      this.initializeMarkers();
    });
  };
},
  watch: {
    filteredPlaces() {
      this.showAllMarkers(); // 장소 필터링 시 모든 마커 표시
    },
    selectedPlace(newValue) {
      // 상세화면이 열릴 때 지도의 가로폭을 조정합니다.
      this.mapWidth = newValue ? 'calc(100% - 300px)' : '100%';
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  flex: 0 0 auto;
  width: 300px;
  padding: 20px;
  background-color: #f0f0f0;
}

.map {
  flex: 1;
  height: 700px;
  z-index:-1;
}

.detail {
  flex: 0 0 auto;
  width: 300px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 1000;
  position: relative;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.detail-open .map {
  flex: 0 0 auto;
}

.overlay {
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.detail-header {
  font-weight: bold;
}

.detail-content {
  margin-top: 10px;
  text-align: center; 
}

.detail-content ul {
  list-style: none;
  padding: 0;
  text-align: center; /* 가운데 정렬 추가 */
}

.detail-content ul li {
  margin-bottom: 5px;
  text-align: center; /* 가운데 정렬 추가 */
}
.map-wrapper {
  position: relative;
  flex: 1;
}

.weather {
  position: absolute;
  top: 10px;
  right: 5px;
}

.radius_border{border:1px solid #919191;border-radius:5px;}     
.custom_typecontrol {  z-index: 2;position:absolute;top:150px;right:30px;overflow:hidden;width:140px;height:45px;margin:0;padding:0;z-index:1;font-size:12px;font-family:'Malgun Gothic', '맑은 고딕', sans-serif;}
</style>

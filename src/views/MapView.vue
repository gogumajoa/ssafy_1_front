<template>
  <div class="container"  :class="{ 'detail-open': selectedPlace }" @click="handleContainerClick">
    <div class="sidebar">
       <!-- 검색 입력 폼  -->
      <input class="search" type="text" v-model="keyword" placeholder="장소를 검색하세요" @input="filterPlaces" />
      <button class="filter" type="button">
      </button>
      <!-- 장소 목록  -->
      <div class = "list">
        <ul>
          <li v-for="(place, index) in filteredPlaces" :key="index">
            {{ place.name }}
          </li>
        </ul>
      </div>
    </div> 
 
    <!-- 날씨 - -->
    
    <div class="custom_typecontrol">
      <table>
        <tr height:46px></tr>
          <td><img src = "data:image/png;base64,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"></td>
          <td><img src = "data:image/png;base64,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"></td>
          <td><img src = "data:image/png;base64,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"></td>
        <tr>
          <td>오늘</td>
          <td>내일</td>
          <td>모레</td>
        </tr>
      </table>
    </div>

    <!-- 지도 영역 -->
    <div ref="map" class="map" ></div>
  </div>
</template>

<script>
import travelData from '@/service/dummy'; // travelData 불러오기
const dummyData = [
  { name: "서울 타워", latitude: 37.5662952, longitude: 126.9779451 },
  { name: "경복궁", latitude: 37.579617, longitude: 126.974045 },
  { name: "청계천", latitude: 37.5696617, longitude: 126.9743583 },
  { name: "남산", latitude: 37.5511694, longitude: 126.9882287 },];

export default {
  dummyData,
  name: 'MapWithPlaces',
  
  computed: {
    
  },
  methods: {


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

    });
  };
},
  watch: {
    filteredPlaces() {
      this.showAllMarkers(); // 장소 필터링 시 모든 마커 표시
    },

  },
};
</script>

<style scoped>
.container {
  padding-right: 0;
  padding-left: 0;
  display: flex;
  height: 100vh ; 
  width :100vw !important; 
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

.list {
  position: absolute;
  top: 8%;
  
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}

.search{
  position: absolute;
  top: 2%;
  width: 85%;
  height: 3%;
  padding: 18px;
  border-radius: 10px;
  border: white;
  background-color: white;
}

.filter{
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

.filter img{
  width: 40px;
}

.detail {
  width: 300px;
  background-color: white;
  padding: 10px;
  z-index: 10;
  position: relative;
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

.map{ 
  height: 100vh !important; 
  width :100vw !important; 
  z-index: 0;
}

table{
  position: absolute;
  background-color: white;
}

td{
  border: 2px;
  border-color: black;
  text-align: center;
}

td img{
  height: 45px;
}

.custom_typecontrol {
  top: 90%;
  left: 92%;
  z-index: 2;
  position:absolute;
  font-size:12px;
  font-size: large;
  font-family:'Malgun Gothic', '맑은 고딕', sans-serif;
  background-color: white;}
</style>
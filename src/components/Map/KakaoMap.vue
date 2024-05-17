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
            <!-- <li v-for="(place, index) in filteredPlaces" :key="index">
              {{ place.name }} 
            </li>-->
          </ul>
        </div>
      </div> 
   
      <!-- 날씨 - -->
      
      <div class="custom_typecontrol">
        <table>
          <tr weight:46px>
  
            <td v-for="(img, index) in filteredData" :key="index">
              <img :src="img" alt="날씨 이미지">
            </td>
          </tr>
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
  import axios from 'axios';
  import { ref } from 'vue';
  import travelData from '@/service/dummy'; // travelData 불러오기
  const dummyData = [
    { name: "서울 타워", latitude: 37.5662952, longitude: 126.9779451 },
    { name: "경복궁", latitude: 37.579617, longitude: 126.974045 },
    { name: "청계천", latitude: 37.5696617, longitude: 126.9743583 },
    { name: "남산", latitude: 37.5511694, longitude: 126.9882287 },];
  
  const weather="";
  
  export default {
    data(){
      return{
        filteredData:[]
      };
    },
  
    dummyData,
    name: 'MapWithPlaces',
    
    computed: {
      
    },
    
    methods: {
      async fetchWeatherData() {
    try {
  
      const requestData = {
        numOfRows: 700,
        pageNo: 1,
        dataType: "json",
        baseDate: "20240517",
        baseTime: "0500",
        nx: 55,
        ny: 127
      };
  
      const response = await axios.post('http://localhost:8080/weather', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      
      const items = response.data.response.body.items.item;
  
      const filteredData = [];
  
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 현재 월
      const currentDay = ('0' + currentDate.getDate()).slice(-2); // 현재 일
  
      const dates = [];
  
      for (let i = 0; i < 3; i++) {
        const date = new Date(year, currentDate.getMonth(), currentDate.getDate() + i);
        const formattedDate = `${date.getFullYear()}${currentMonth}${('0' + (date.getDate())).slice(-2)}`;
        dates.push(formattedDate);
  }
  
      dates.forEach(date => {
        // 각 날짜에 해당하는 PTY와 SKY 데이터 추출
        const ptyData = this.filterData(items, "PTY", date, "1400");
        
        const skyData = this.filterData(items, "SKY", date, "1400");
  
        // pty가 0일 때는 sky의 값으로, 그 외에는 pty의 값으로 설정
  
        let img="";
        if(ptyData.fcstValue === "0"){
          if(skyData.fcstValue==="1") img = "/images/sunny(1).JPG";
          else if(skyData.fcstValue==="3")  img = "/images/cloud(3).JPG"
          else if(skyData.fcstValue==="4")  img = "/images/cloudy(4).JPG"
          else img="없음"
        }
        else if(ptyData.fcstValue === "1")  img = "/images/rain(1).JPG";
        else if(ptyData.fcstValue === "2")  img = "/images/rain_snow(2).JPG";
        else if(ptyData.fcstValue === "3")  img = "/images/snow(3).JPG";
        else if(ptyData.fcstValue === "4")  img = "/images/shower(4).JPG";
        else img ="없음"
        const ptyValue = ptyData.fcstValue === "0" ? skyData.fcstValue : ptyData.fcstValue;
        
        // 필터링된 데이터를 배열에 추가
        filteredData.push(img);
      });
      
      this.filteredData = filteredData;
         
     
    } catch (error) {
      console.error('날씨 데이터를 가져오는 중 에러 발생:', error);
      }
    },
    filterData(items, category, fcstDate, fcstTime) {
        return items.find(item => 
          item.category === category && 
          item.fcstDate === fcstDate && 
          item.fcstTime === fcstTime
        );
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
        });
      };
      this.fetchWeatherData();
      
  },
    watch: {
      filteredPlaces() {
        this.showAllMarkers(); // 장소 필터링 시 모든 마커 표시
      },
  
    },
  
    created(){
      this.fetchWeatherData();
    }
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
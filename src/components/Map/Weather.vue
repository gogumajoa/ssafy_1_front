<template>
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
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      filteredData:[]
    };
  },

  name: 'MapWithPlaces',
  
  computed: {
    
  },
  
  methods: {
    async fetchWeatherData() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    // 분이 40분을 넘지 않을 때만 전의 시간을 출력합니다.
    if (minutes <= 40) {
        // 시간을 감소시킵니다.
        hours -= 1;
    }

    // 시간과 분이 음수가 되지 않도록 보정합니다.
    if (hours < 0) {
        hours = 23; // 0시부터 23시까지의 범위를 가지므로 23으로 설정합니다.
    }

    // 시간과 분이 한 자리 숫자일 경우 앞에 0을 붙여줍니다.
    hours = hours < 10 ? '0' + hours : hours;
    let currentTime = hours+'00';
    
    let nextTime = (hours+1)+'00'
    if(hours+1 === 25) nextTime='0000'

    console.log(currentTime);
    console.log(nextTime);
  try {


    const requestData = {
      numOfRows: 1000,
      pageNo: 1,
      dataType: "json",
      baseDate: "20240521",
      baseTime: currentTime,
      nx: 55,
      ny: 127
    };

    const response = await axios.post('http://localhost:8080/weather', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(response.data.response.body);
    const items = response.data.response.body.items.item;
    const filteredData = [];
    
    const year = currentDate.getFullYear();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 현재 월
    const currentDay = ('0' + currentDate.getDate()).slice(-2); // 현재 일

    const dates = [];

    for (let i = 0; i < 3; i++) { //나중에 3으로 고쳐야함
      const date = new Date(year, currentDate.getMonth(), currentDate.getDate() + i);
      const formattedDate = `${date.getFullYear()}${currentMonth}${('0' + (date.getDate())).slice(-2)}`;
      dates.push(formattedDate);
}

    dates.forEach(date => {
      // 각 날짜에 해당하는 PTY와 SKY 데이터 추출

      const ptyData = this.filterData(items, "PTY", date, nextTime);
      
      const skyData = this.filterData(items, "SKY", date, nextTime);

      // pty가 0일 때는 sky의 값으로, 그 외에는 pty의 값으로 설정
      console.log(ptyData);
      console.log(skyData);

      let img="";
      if (typeof ptyData === undefined ) img = "/images/sunny(1).JPG";
      else if(ptyData.fcstValue === "0"){
        if (typeof skyData === undefined ) img = "/images/sunny(1).JPG";
        else if(skyData.fcstValue==="1") img = "/images/sunny(1).JPG";
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


  created(){
    this.fetchWeatherData();
  }
};
</script>

<style scoped>
.weather {
  position: absolute;
  top: 10px;
  right: 5px;
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
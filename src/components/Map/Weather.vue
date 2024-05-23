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
  props: ['nx', 'ny'],
  data() {

    return {
      filteredData: []
    };
  },

  name: 'Weather',

  methods: {
    async fetchWeatherData({nx, ny}) {
      console.log(nx, ny);
      const currentDate = new Date();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();

      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, '0');
      let day = String(currentDate.getDate()).padStart(2, '0');

      let formattedDate = `${year}${month}${day}`;

      if (minutes <= 40) {
        hours -= 1;
      }

      if (hours < 0) {
        hours = 23;
      }

      let nextTime = hours + 1 < 10 ? '0' + (hours + 1) + '00' : (hours + 1) + '00';
      if (hours + 1 === 25) nextTime = '0000';

      hours = hours < 10 ? '0' + hours : hours;

      const times = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];
      let currentTimeInMinutes = hours * 100;

      let closestTime = times[0];
      for (let time of times) {
        if (currentTimeInMinutes >= time) {
          closestTime = time;
        } else {
          break;
        }
      }

      hours = Math.floor(closestTime / 100);
      hours = hours < 10 ? '0' + hours : hours;
      let currentTime = hours + '00';

      console.log('Current Time:', currentTime);
      console.log('Formatted Date:', formattedDate);
      console.log('Next Time:', nextTime);

      try {
        const requestData = {
          numOfRows: 1000,
          pageNo: 1,
          dataType: "json",
          baseDate: formattedDate,
          baseTime: currentTime,
          nx: nx,
          ny: ny
        };

        const response = await axios.post('http://localhost:8080/weather', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response);
        const items = response.data.response.body.items.item;
        const filteredData = [];

        const dates = [];
        for (let i = 0; i < 3; i++) {
          const date = new Date(year, currentDate.getMonth(), currentDate.getDate() + i);
          const formattedDate = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
          dates.push(formattedDate);
        }

        dates.forEach(date => {
          const ptyData = this.filterData(items, "PTY", date, nextTime);
          const skyData = this.filterData(items, "SKY", date, nextTime);

          let img = "";
          if (typeof ptyData === 'undefined') img = "/images/sunny(1).JPG";
          else if (ptyData.fcstValue === "0") {
            if (typeof skyData === 'undefined') img = "/images/sunny(1).JPG";
            else if (skyData.fcstValue === "1") img = "/images/sunny(1).JPG";
            else if (skyData.fcstValue === "3") img = "/images/cloud(3).JPG";
            else if (skyData.fcstValue === "4") img = "/images/cloudy(4).JPG";
            else img = "없음";
          } else if (ptyData.fcstValue === "1") img = "/images/rain(1).JPG";
          else if (ptyData.fcstValue === "2") img = "/images/rain_snow(2).JPG";
          else if (ptyData.fcstValue === "3") img = "/images/snow(3).JPG";
          else if (ptyData.fcstValue === "4") img = "/images/shower(4).JPG";
          else img = "없음";

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
    }
  },
};
</script>

<style scoped>
.weather {
  position: absolute;
  top: 10px;
  right: 5px;
}

table {
  position: absolute;
  background-color: white;
}

td {
  border: 2px;
  border-color: black;
  text-align: center;
  font-size: 20px;
}

td img {
  height: 80px;
}

.custom_typecontrol {
  top: 85%;
  left: 85%;
  z-index: 2;
  position: absolute;
  font-size: large;
  font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
  background-color: white;
}
</style>

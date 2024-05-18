<template>
  <div id="map" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { onMounted } from 'vue';
import { kakaoMap } from 'vue3-kakao-maps';

export default {
  setup() {
    onMounted(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakaoMap.maps.LatLng(37.5665, 126.9780), // 서울의 위도와 경도
        level: 3, // 지도 확대 레벨
      };
      const map = new kakaoMap.maps.Map(container, options);
    });

    return {};
  },
};
</script>

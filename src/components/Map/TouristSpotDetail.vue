<template>
  <div v-if="spot" class="detail-container">
  <button @click="closeDetail" class="close-btn">닫기</button>
    <h4>{{ spot.touristspotTitle }}</h4>
    <p>{{ spot.touristspotAddr }}</p>
    <!-- 기타 관광지 정보 출력 -->
    <hr/>
    <h5> 관련 게시글 </h5>
  </div>
  
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

// props를 정의합니다.
const props = defineProps({
  spot: Object
});

const spot = ref(props.spot); // props의 초기값을 ref에 설정합니다.

// props로 받은 spot을 감시하여 변경되면 업데이트
watch(() => props.spot, (newSpot) => {
  spot.value = newSpot;
});

const closeDetail = () => {
  spot.value = null; // spot을 초기화하여 Detail 컨테이너를 닫습니다.
};
</script>

<style>
.detail-container {
  top: 10%;
  width: 300px;
  height: 930px;
  max-height: 90%;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 20px;
  position: absolute;
  z-index: 10;
  border-radius: 10px;
  left: 106%; 
  background-color: white;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}
</style>

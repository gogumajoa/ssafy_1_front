<template>
  <div v-if="spot" class="detail-container">
    <button @click="closeDetail" class="close-btn">닫기</button>
    <h4>{{ spot.touristspotTitle }}</h4>
    <p>{{ spot.touristspotAddr }}</p>
    <!-- 기타 관광지 정보 출력 -->
    <hr/>
    <h5 class="relatedBoard"> 관련 게시글 </h5>
    
      <div v-for="post in relatedPosts" :key="post.id">
        <h6> {{ post.boardTitle }} </h6>
        <hr/>
      </div>
 
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import axios from 'axios'; // Axios를 import합니다.

const props = defineProps({
  spot: Object,
  map: Object, // map 객체를 props로 받습니다.
  moveToSpot: Function // spot 위치로 지도를 이동시키는 함수를 props로 받습니다.
});

const spot = ref(props.spot); // props의 초기값을 ref에 설정합니다.
const relatedPosts = ref([]); // 관련된 게시글을 담을 ref 배열을 생성합니다;

// props로 받은 spot을 감시하여 변경되면 업데이트
watch(() => props.spot, async (newSpot) => {
  spot.value = newSpot;
  await fetchRelatedPosts(newSpot);
});

const fetchRelatedPosts = async (newSpot) => {
  if (newSpot) {
    try {
      // Axios를 사용하여 API를 호출합니다.
      const response = await axios.get(`http://localhost:8080/touristspot/relativeBoard/${newSpot.touristspotId}`);
      // API 응답으로부터 관련된 게시글을 가져와서 ref에 할당합니다.
      relatedPosts.value = response.data;
      console.log(relatedPosts.value);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }
};

const closeDetail = () => {
  spot.value = null; // spot을 초기화하여 Detail 컨테이너를 닫습니다.
};

// 페이지가 로드될 때 관련 게시글을 가져옵니다.
onMounted(async () => {
  await fetchRelatedPosts(props.spot);
});
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

.relatedBoard{
  text-align: center;
  margin-bottom: 20px;
}
</style>

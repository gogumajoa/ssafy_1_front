<template>
  <div v-if="spot" class="detail-container">
    <button @click="closeDetail" class="close-btn">닫기</button>
    <h4>{{ spot.touristspotTitle }}</h4>
    <p>{{ spot.touristspotAddr }}</p>
    <button class="recommend-button" :style="{ color: recommendButtonColor } " @click="handleRecommendClick">♥</button> 
    {{ recommendsCount !== null ? recommendsCount : '0' }}

    <hr />
    <h5 class="relatedBoard"> 관련 게시글 </h5>

    <div v-for="post in relatedPosts" :key="post.id">
      <h6> {{ post.boardTitle }} </h6>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios'; // Axios를 import합니다.

const props = defineProps({
  spot: Object,
  map: Object, // map 객체를 props로 받습니다.
  moveToSpot: Function // spot 위치로 지도를 이동시키는 함수를 props로 받습니다.
});

const spot = ref(props.spot); // props의 초기값을 ref에 설정합니다.
const relatedPosts = ref([]); // 관련된 게시글을 담을 ref 배열을 생성합니다;
const recommendsCount = ref(null); // recommendsCount의 초기값을 null로 설정합니다.
const checkAccount = ref();
const checkList = ref();
const recommendButtonColor = ref('black'); // 추천 버튼의 기본 색상을 검은색으로 설정합니다.
let initialRecommendsCount = null; // 초기 recommendsCount 값을 저장하기 위한 변수

// props로 받은 spot을 감시하여 변경되면 업데이트
watch(() => props.spot, async (newSpot) => {
  
  spot.value = newSpot;
  await fetchRelatedPosts(newSpot);
  await fetchRecommends(newSpot);
  await fetchCheck(newSpot);
 
});

const handleRecommendClick = () => {
  if (recommendButtonColor.value === 'black' || recommendButtonColor.value === 'red') {
    if (recommendButtonColor.value === 'black') {
      recommendsCount.value += 1;
      recommendButtonColor.value = 'red';
      
    } else {
      // API에 DELETE 요청을 보냄
      recommendsCount.value -= 1;
      recommendButtonColor.value = 'black';
    }
    handleRecommendChange(spot.value);
  }
};

const handleRecommendChange = async (newSpot) => {
   //const accountId = sessionStorage.getItem('accountId'); //나중에 합치고 다시 보기
   const accountId = 1;
   console.log(newSpot);
  if (initialRecommendsCount !== null && recommendsCount.value !== null) {
    if (recommendsCount.value > initialRecommendsCount) {
      await axios.post(`http://localhost:8080/touristspot/recommends`, {
        touristspotId : newSpot.touristspotId,
        accountId : accountId
      });
      
    } else if (recommendsCount.value < initialRecommendsCount) {
      await axios.post(`http://localhost:8080/touristspot/recommends/delete`, {
        touristspotId : newSpot.touristspotId,
        accountId : accountId
      });
    }
  }
};

const fetchCheck = async (newSpot) => { //사용자가 추천을 누른 게시글 id 리스트 호출 
  if (newSpot) {
    try {
      //const accountId = sessionStorage.getItem('accountId'); //나중에 합치고 다시 보기
      const accountId = 1;
      // accountId 값이 유효한지 확인합니다.
      if (!accountId) {
        console.error('accountId가 없습니다.');
        return;
      }

      // Axios를 사용하여 API를 호출합니다.
      const response = await axios.get(`http://localhost:8080/touristspot/recommends/account/${accountId}`);
      // API 응답으로부터 관련된 게시글을 가져와서 ref에 할당합니다.
      checkList.value = response.data;
      console.log(checkList.value, newSpot.touristspotId);
      if (checkList.value.includes(newSpot.touristspotId)) {
        recommendButtonColor.value = 'red';
      }
      else{
        recommendButtonColor.value = 'black';
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }
};

const fetchRelatedPosts = async (newSpot) => { //관련 게시글
  if (newSpot) {
    try {
      // Axios를 사용하여 API를 호출합니다.
      const response = await axios.get(`http://localhost:8080/touristspot/relativeBoard/${newSpot.touristspotId}`);
      // API 응답으로부터 관련된 게시글을 가져와서 ref에 할당합니다.
      relatedPosts.value = response.data;
      console.log( checkAccount.value)
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }
};

const closeDetail = () => {
  //handleRecommendChange(spot.value); // 추천 변경 사항을 처리합니다.
  spot.value = null; // spot을 초기화하여 Detail 컨테이너를 닫습니다.
};


const fetchRecommends = async (newSpot) => {
  if (newSpot) {

    try {
      // Axios를 사용하여 API를 호출합니다.
      const response = await axios.get(`http://localhost:8080/touristspot/recommends/board/${newSpot.touristspotId}`);
      // API 응답으로부터 관련된 게시글을 가져와서 ref에 할당합니다.
      recommendsCount.value = response.data;
      initialRecommendsCount = recommendsCount.value;
      console.log(recommendsCount.value);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }
};

// 페이지가 로드될 때 관련 게시글을 가져옵니다.
onMounted(async () => {
  await fetchRelatedPosts(props.spot);
  await fetchRecommends(props.spot);
  await fetchCheck(props.spot);
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

.recommend-button{
  border: none;
  background-color: white;
}

</style>

<template>
  <section class="section site-portfolio">
    <div class="container">
      <section class="section services">
        <div class="container">
          <div class="row justify-content-center text-center mb-4">
            <div class="col-5">
              <RouterLink to="/">MyTrip</RouterLink>
              <p>Enjoy Trip and Live Alive</p>
            </div>
          </div>
        </div>
      </section>
      <div class="row">
        <button class="col-12 col-sm-6 col-md-6 col-lg-4 item-wrap fancybox" @click="board">
          <i class="bi bi-card-checklist"></i>
          <h4 class="h4 mb-2">Board</h4>
          <p>사람들과 의견을 나누어요</p>
          <ul class="list-unstyled list-line">
            <li>관광지 그 차제에 대하여</li>
            <li>관광지 근처 맛집</li>
            <li>관광지 근처 숙소</li>
            <li>관광지 교통편</li>
          </ul>
        </button>
        <button class="col-12 col-sm-6 col-md-6 col-lg-4 item-wrap fancybox" @click="map">
          <i class="bi bi-binoculars"></i>
          <h4 class="h4 mb-2">Search</h4>
          <p>지역별로 관광지를 알아보아요</p>
          <ul class="list-unstyled list-line">
            <li>시/도별 관광지 이름</li>
            <li>시/도별 관광지 주소</li>
            <li>시/도별 관광지 지도</li>
          </ul>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const board = () => {
  router.push("/board");
};
const map = () => {
  router.push("/map");
};
</script>

<style scoped></style>

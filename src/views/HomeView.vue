<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters full-height-row">
      <div class="col-6 p-0">
        <router-link to="/board">
          <div 
            class="btn-wrapper left-button-bg"
            @mouseover="leftButtonHover = true" 
            @mouseleave="leftButtonHover = false">
            <button 
              class="btn btn-primary btn-lg btn-block full-height-button">
              <span class="button-text" :class="{ hovered: leftButtonHover }">게시판</span>
            </button>
          </div>
        </router-link>
      </div>
      <div class="col-6 p-0">
        <router-link to="/map">
          <div 
            class="btn-wrapper right-button-bg"
            @mouseover="rightButtonHover = true" 
            @mouseleave="rightButtonHover = false">
            <button 
              class="btn btn-primary btn-lg btn-block full-height-button">
              <span class="button-text" :class="{ hovered: rightButtonHover }">지도</span>
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftButtonHover: false,
      rightButtonHover: false
    };
  }
};
</script>

<style scoped>
.row {
  margin: 0;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.full-height-row {
  height: 100vh;
}

.col-6 {
  padding: 0;
}

.btn-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

button {
  cursor: pointer;
  background-size: cover;
  background-position: center;
  font-size: large;
  transition: background-color 0.3s; /* 배경색의 변화를 부드럽게 만듭니다. */
}

.full-height-button {
  width: 100%;
  height: 100vh;
  background: none; /* 버튼 자체에 배경이 없도록 설정 */
  border: none; /* 버튼 테두리 제거 */
}

.left-button-bg {
  background-image: url(''); /* 왼쪽 버튼의 배경 이미지 URL */
}

.right-button-bg {
  background-image: url('./images/main/map.JPG'); /* 오른쪽 버튼의 배경 이미지 URL */
}

.left-button-bg::after,
.right-button-bg::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 기본 상태에서 투명한 오버레이 */
  opacity: 0; /* 기본 상태에서 투명 */
  transition: opacity 0.3s; /* 부드러운 전환 효과 */
  z-index: -1; /* 텍스트보다 아래에 위치하도록 설정 */
}

.left-button-bg:hover::after,
.right-button-bg:hover::after {
  opacity: 0.5; /* 마우스를 올렸을 때 오버레이를 어둡게 */
}

.button-text {
  text-decoration: none; /* 버튼 텍스트의 밑줄을 없앱니다. */
  font-size: 8rem;
  font-family: "Dongle", sans-serif; /* Dongle 폰트 적용 */
  font-weight: 400; /* 폰트 굵기 */
  font-style: normal; /* 폰트 스타일 */
  color: #000; /* 기본 텍스트 색상 */
  transition: color 0.3s; /* 글자색의 변화를 부드럽게 만듭니다. */
}

.button-text.hovered {
  color: #fff; /* 마우스를 올렸을 때 텍스트 색상을 흰색으로 변경합니다. */
}

button:hover .button-text {
  color: #fff; /* 마우스를 올렸을 때 텍스트 색상을 흰색으로 변경합니다. */
  text-decoration: none; /* 마우스를 올렸을 때 버튼 텍스트의 밑줄을 없앱니다. */
}
</style>

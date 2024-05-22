<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <router-link class="left-button" to="/board" @mouseover="leftButtonHover = true" @mouseleave="leftButtonHover = false">
          <button :class="{ 'hovered': leftButtonHover }" class="btn btn-primary btn-lg btn-block full-height-button left-button-bg">
            <span class="button-text">게시판</span>
          </button>
        </router-link>
      </div>
      <div class="col-6">
        <router-link class="right-button" to="/map" @mouseover="rightButtonHover = true" @mouseleave="rightButtonHover = false">
          <button :class="{ 'hovered': rightButtonHover }" class="btn btn-primary btn-lg btn-block full-height-button right-button-bg">
            <span class="button-text">지도</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.row {
  margin: 0;
}

.left-button,
.right-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-fluid {
  padding: 0;
}

button {
  cursor: pointer;
  background-size: cover;
  background-position: center;
  font-size: large;
  transition: background-color 0.3s, color 0.3s; /* 배경색과 글자색의 변화를 부드럽게 만듭니다. */
}

.full-height-button {
  width: 100vw;
  height: 100vh;
}

.left-button-bg {
  background-image: url(''); /* 왼쪽 버튼의 배경 이미지 URL */
}

.right-button-bg {
  background-image: url('./images/main/map.JPG'); /* 오른쪽 버튼의 배경 이미지 URL */
}

.left-button-bg:hover button,
.right-button-bg:hover button {
  background-color: rgba(0, 0, 0, 0.5); /* 마우스를 올렸을 때 배경색이 약간 투명해집니다. */
  color: #000; /* 텍스트의 색상을 검정색으로 변경합니다. */
}

.button-text {
  text-decoration: none; /* 버튼 텍스트의 밑줄을 없앱니다. */
}

.left-button-bg:hover button .button-text,
.right-button-bg:hover button .button-text {
  text-decoration: none; /* 마우스를 올렸을 때 버튼 텍스트의 밑줄을 없앱니다. */
}
</style>

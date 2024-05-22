<template>
  <div>
    <template v-if="currentView === 'main'">
      <div :style="{ 
        backgroundImage: currentView === 'main' ? 'url(./images/mbti/Main.png)' : 'none',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0.7',
      }">
        <h1 class="main-title dongle-regular">여행 MBTI TEST</h1>
        <button @click="startTest" class="start-button btn btn-secondary">Start Test</button>
      </div>
    </template>

    <template v-else-if="currentView === 'qna'">
      <div class="qna-container">
        <div class="qna-content">
          <h2>{{ currentQuestion.q }}</h2>
          <div>
            <button v-for="(answer, index) in currentQuestion.a" :key="index" @click="selectAnswer(answer.type)">
              <img :src="answer.answer" alt="Answer Image">
            </button>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="currentView === 'result'">
      <div class="result-container">
        <h2 class="title">Result</h2>
        <p class="result">당신의 여행 Mbti는</p>
        <p class="result">{{ result }}</p>
        <div class="button-container">
          <button @click="restartTest" class="restart-button btn btn-secondary">다시하기</button>
          <button @click="restartTest" class="register-button btn btn-secondary">회원가입</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    currentView() {
      return this.$store.state.mbti.currentView;
    },
    currentQuestion() {
      return this.$store.getters.currentQuestion;
    },
    result() {
      return this.$store.state.mbti.result;
    }
  },
  methods: {
    startTest() {
      this.$store.dispatch('mbti/start');
    },
    selectAnswer(type) {
      this.$store.dispatch('mbti/answerQuestion', type);
    },
    restartTest() {
      this.$store.dispatch('mbti/restart');
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh !important;
  width: 100vw !important;
  overflow: hidden;
}

.background {
  height: 100vh !important;
  width: 100vw !important;
  background-size: cover;
  background-position: center;
}

.main-title {
  font-size: 8rem;
  font-family: "Dongle", sans-serif; /* Dongle 폰트 적용 */
  font-weight: 400; /* 폰트 굵기 */
  font-style: normal; /* 폰트 스타일 */
  background-color: rgb(102, 110, 117);
  color: white;
  border-radius: 30px;
  padding: 15px;
}

.title {
  font-size: 8rem;
  font-family: "Dongle", sans-serif; /* Dongle 폰트 적용 */
  font-weight: 400; /* 폰트 굵기 */
  font-style: normal; /* 폰트 스타일 */
  border-radius: 30px;
  margin-bottom: 0rem;
}

.start-button, .restart-button, .register-button, .result {
  font-size: 4rem;
  font-family: "Dongle", sans-serif;
  ;
}

h1, h2 {
  text-align: center;
  font-family: "Dongle", sans-serif; /* Dongle 폰트 적용 */
}

.qna-container, .result-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 부모 컨테이너의 높이를 화면 전체로 설정 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
}

.result-container {
  justify-content: center; /* 세로 중앙 정렬 */
}

h2 {
  font-size: 3rem;
  margin-bottom: 1rem; /* h2와 그 아래 요소 사이의 간격 조절 */
}

.result {
  
  display: block; /* 각 p 태그를 블록 요소로 설정 */
}

.button-container {
  display: flex;
  gap: 20px; /* 버튼 사이의 간격 조절 */
}

.qna-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qna-content h2 {
  margin-bottom: 20px; /* 질문과 이미지 사이의 간격 조절 */
}

.qna-content button {
  margin-bottom: 20px; /* 버튼 간격 조절 */
}

img {
  width: 480px;
  height: 600px;
}
</style>

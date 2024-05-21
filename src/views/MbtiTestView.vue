<template>
  <div>
    <div :style="{ 
      backgroundImage: currentView === 'main' ? 'url(./images/mbti/Main.png)' : 'none',
      backgroundSize: 'cover',
      height: '100vh', // 화면 전체 높이
      width: '100vw', // 화면 전체 너비
      overflow: 'hidden', // 필요시 스크롤 제거
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }">
      <template v-if="currentView === 'main'">
        <h1 class="main-title dongle-regular">여행 MBTI TEST</h1>
        <button @click="startTest" class="start-button btn btn-dark">Start Test</button>
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
          <h2 class="main-title">Result</h2>
          <p class="result">당신의 여행 Mbti는</p>
          <p class="result">{{ result }}</p>
          <button @click="restartTest" class="restart-button btn btn-dark" style="margin-right: 20px;">다시하기</button>
          <button @click="restartTest" class="register-button btn btn-dark">회원가입</button>
        </div>
      </template>
    </div>
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
}

.start-button, .restart-button, .register-button, .result {
  font-size: 4rem;
  font-family: "Dongle", sans-serif;
}

h1, h2 {
  text-align: center;
  font-family: "Dongle", sans-serif; /* Dongle 폰트 적용 */
}

.qna-container, .result-container {
  text-align: center;
}

h2{
  font-size: 3rem;
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

img{
  width:480px;
  height:600px;
}


</style>

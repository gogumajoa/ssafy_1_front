<template>
  <div>
    <div :style="{ 
      backgroundImage: currentView === 'main' ? 'url(./images/mbti/Main.png)' : 'none',
      backgroundSize: 'cover',
      height: '100vh', // 화면 전체 높이
      width: '100vw', // 화면 전체 너비
      overflow: 'hidden', // 필요시 스크롤 제거
    }">
      <template v-if="currentView === 'main'">
        <h1 >MBTI Test</h1>
        <button @click="startTest">Start Test</button>
      </template>

      <template v-else-if="currentView === 'qna'">
        <h2>{{ currentQuestion.q }}</h2>
        <div>
          <button v-for="(answer, index) in currentQuestion.a" :key="index" @click="selectAnswer(answer.type)">
            <img :src="answer.answer" alt="Answer Image">
          </button>
        </div>
      </template>

      <template v-else-if="currentView === 'result'">
        <h2>Result</h2>
        <p>{{ result }}</p>
        <button @click="restartTest">Restart Test</button>
        <button @click="restartTest">회원가입</button>
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

h1{
  text-align: center;
}


</style>
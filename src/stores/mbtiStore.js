// store/mbti.js
const state = {
    currentView: 'main',
    qnaList: [
        {
          q: '1. 든든한 식도락 여행 vs 재밌는 액티비티 여행',
          a: [
            { answer: './images/mbti/I.JPG', type: 'I' },
            { answer: './images/mbti/E.JPG', type: 'E' },
          ]
        },
        {
          q: '2. 여행을 즐길수 있는 시간대는 오전? 오후?',
          a: [
            { answer: './images/mbti/S.JPG', type: 'S' },
            { answer: './images/mbti/N.JPG', type: 'N' },
          ]
        },
        {
          q: '3. 여행을 즐길때 지출은?',
          a: [
            { answer: './images/mbti/F.JPG', type: 'F' },
            { answer: './images/mbti/T.JPG', type: 'T' },
          ]
        },
        {
          q: '4. 여행을 즐길 때 교통은?',
          a: [
            { answer: './images/mbti/P.JPG', type: 'P' },
            { answer: './images/mbti/J.JPG', type: 'J' },
          ]
        },
      ],
    currentQuestionIndex: 0,
      result: [], // 결과 저장 변수
  };
  
  const mutations = {
    setCurrentView(state, view) {
      state.currentView = view;
    },
    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index;
    },
    setResult(state, result) {
      state.result.push(result); // 결과값을 배열에 추가
    },
    setClean(state) {
      state.result=[]; // 결과값을 배열에 추가
    }
  };
  
  const actions = {
    'mbti/start'({ commit }) {
      commit('setCurrentView', 'qna');
    },
  
    'mbti/answerQuestion'({ commit, state }, type) {
      const nextIndex = state.currentQuestionIndex + 1;
      commit('setCurrentQuestionIndex', nextIndex);
  
      if (nextIndex === state.qnaList.length) {
        commit('setResult', type); // 마지막 질문의 답변도 결과에 추가
        commit('setCurrentView', 'result');
      } else {
        commit('setResult', type);
      }
    },

    'mbti/restart'({ commit }) {
      commit('setCurrentView', 'main');
      commit('setCurrentQuestionIndex', 0);
      commit('setResult', null);
      commit('setClean');
      
    }
  };
  
  const getters = {
    currentQuestion(state) {
      return state.qnaList[state.currentQuestionIndex];
    }
  };
  
  function calculateResult(state) {
    return state.result; //
  }
  
  export default {
    state,
    mutations,
    actions,
    getters
  };
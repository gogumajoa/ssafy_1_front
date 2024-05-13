<template>
  <div>
    <!-- 게시물 목록 -->
    <div v-if="boards.length">
      <h2>게시물 목록</h2>
      
      <button @click="modalOpen">게시물작성</button>
      <ul>
        <li v-for="board in boards" :key="board.board_id" @click="board_detail">
          <h3>{{ board.board_title }}</h3>
          <h3>{{ board.board_account_nickname }}</h3>
          <p>{{ board.board_touristspot_id }}</p>
          <p>{{ board.board_content }}</p>
          <hr>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>게시물이 없습니다.</p>
    </div>

    <div class="modal-wrap" v-show="modalCheck">
      <div class="modal-container">
        <!-- 새 게시물 작성 폼 -->
        <div>
          <h2>새 게시물 작성</h2>
          <form @submit.prevent="submitPost">
            <div>
              <label for="title">제목:</label>
              <input type="text" id="title" v-model="newPost.board_title" required>
            </div>
            <div>
              <label for="title">여행지:</label>
              <input type="text" id="title" v-model="newPost.board_touristspot_id" required>
            </div>
            <div>
              <label for="content">내용:</label>
              <textarea id="content" v-model="newPost.board_content" required></textarea>
            </div>
            <button type="submit">게시물 저장</button>
          </form>
        </div>
        <div class="modal-btn">
          <button @click="modalOpen">닫기</button>
          <button @click="modalOpen">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: [
        { board_id: 1, board_title: '첫 번째 게시물', board_content: '첫 번째 게시물 내용입니다.', board_touristspot_id: '성산일출봉', board_account_nickname: '제주사랑'},
        { board_id: 2, board_title: '두 번째 게시물', board_content: '두 번째 게시물 내용입니다.', board_touristspot_id: '성산일출봉', board_account_nickname: '제주' },
        { board_id: 3, board_title: '세 번째 게시물', board_content: '세 번째 게시물 내용입니다.', board_touristspot_id: '성산일출봉', board_account_nickname: '제주' }
      ],
      newPost: {
        board_title: '',
        board_content: '',
        board_touristspot_id: '',
        board_account_nickname: ''
      },
      modalCheck: false,
    };
  },
  methods: {
    submitPost() {
      if (!this.newPost.board_title || !this.newPost.board_content) {
        alert("제목과 내용을 입력해주세요.");
        return;
      }
      else if (!this.newPost.board_touristspot_id) {
        alert("올바른 장소를 입력해주세요.");
        return;
      }
      const board_id = this.boards.length + 1;
      this.boards.push({
        board_id: board_id,
        board_title: this.newPost.board_title,
        board_content: this.newPost.board_content,
        board_touristspot_id: this.newPost.board_touristspot_id,
        board_account_nickname: this.newPost.board_account_nickname,
      });

      this.newPost.board_title = '';
      this.newPost.board_content = '';
      this.newPost.board_touristspot_id = '';
      this.newPost.board_account_nickname = '';
    },
    modalOpen() {
      this.modalCheck = !this.modalCheck
    }
  }
};
</script>

<style scoped>
/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>

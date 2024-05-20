<template>
  <section class="notice">
    <div class="page-title">
      <div class="container">
        <h3>게시판</h3>
      </div>
    </div>

    <!-- board seach area -->
    <div id="board-search">
      <div class="container">
        <div class="search-window">
          <form action="">
            <div class="search-wrap">
              <label for="search" class="blind">공지사항 내용 검색</label>
              <input
                id="search"
                type="search"
                name=""
                placeholder="검색어를 입력해주세요."
                value=""
              />
              <button type="submit" class="btn btn-dark">검색</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- board list area -->
    <div id="board-list">
      <div class="container">
        <!-- 게시물 목록 -->
        <button @click="modalOpen">게시물작성</button>
        <div v-if="boards.length" class="board-table">
          <h2>게시물 목록</h2>
          <ul>
            <tr>
              <th scope="col" class="th-num">장소</th>
              <th scope="col" class="th-date">작성자</th>
              <th scope="col" class="th-title">제목</th>
            </tr>
            <tr
              v-for="board in boards"
              :key="board.board_id"
              @click="board_detail"
            >
              <td>{{ board.board_touristspot_id }}</td>
              <td>{{ board.board_account_nickname }}</td>
              <td>{{ board.board_title }}</td>
            </tr>
          </ul>
        </div>
        <div v-else>
          <p>게시물이 없습니다.</p>
        </div>
      </div>
    </div>
  </section>

  <div class="modal-wrap" v-show="modalCheck">
    <div class="modal-container">
      <!-- 새 게시물 작성 폼 -->
      <div>
        <h2>새 게시물 작성</h2>
        <form @submit.prevent="submitPost">
          <div>
            <label for="title">제목:</label>
            <input
              type="text"
              id="title"
              v-model="newPost.board_title"
              required
            />
          </div>
          <div>
            <label for="title">여행지:</label>
            <input
              type="text"
              id="title"
              v-model="newPost.board_touristspot_id"
              required
            />
          </div>
          <div>
            <label for="content">내용:</label>
            <textarea
              id="content"
              v-model="newPost.board_content"
              required
            ></textarea>
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
</template>

<script>
export default {
  data() {
    return {
      boards: [
        {
          board_id: 1,
          board_title: "첫 번째 게시물",
          board_content: "첫 번째 게시물 내용입니다.",
          board_touristspot_id: "성산일출봉",
          board_account_nickname: "제주사랑",
        },
        {
          board_id: 2,
          board_title: "두 번째 게시물",
          board_content: "두 번째 게시물 내용입니다.",
          board_touristspot_id: "성산일출봉",
          board_account_nickname: "제주",
        },
        {
          board_id: 3,
          board_title: "세 번째 게시물",
          board_content: "세 번째 게시물 내용입니다.",
          board_touristspot_id: "성산일출봉",
          board_account_nickname: "제주",
        },
      ],
      newPost: {
        board_title: "",
        board_content: "",
        board_touristspot_id: "",
        board_account_nickname: "",
      },
      modalCheck: false,
    };
  },
  methods: {
    submitPost() {
      if (!this.newPost.board_title || !this.newPost.board_content) {
        alert("제목과 내용을 입력해주세요.");
        return;
      } else if (!this.newPost.board_touristspot_id) {
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

      this.newPost.board_title = "";
      this.newPost.board_content = "";
      this.newPost.board_touristspot_id = "";
      this.newPost.board_account_nickname = "";
    },
    modalOpen() {
      this.modalCheck = !this.modalCheck;
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
section.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}
.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}
#board-search .search-window .search-wrap {
  position: relative;
  /*   padding-right: 124px; */
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}
#board-search .search-window .search-wrap input {
  height: 40px;
  width: 100%;
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}
#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}
#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}
.board-table a:hover {
  text-decoration: underline;
}
.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th,
.board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p {
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* reset */

* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>

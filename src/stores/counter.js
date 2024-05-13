import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const userState = reactive({
    userList: [],
    user: {
      userId: 0,
      title: "",
      content: "",
    },
    limit: 10,
    offset: 0,
    searchWord: "검색어",
  });
  const totalCount = ref(3);

  const boardListData = [
    { userId: 1, userSeq: 100, title: "111", content: "11111" },
    { userId: 2, userSeq: 200, title: "222", content: "22222" },
    { userId: 3, userSeq: 300, title: "333", content: "33333" },
  ];
  const boardData = {
    boardId: 2,
    userSeq: 200,
    title: "222",
    content: "22222",
  };

  function listBoard() {
    boardState.boardList = boardListData;
  }
  function detailBoard() {
    // console.log(boardId)
    boardState.board = boardData;
  }

  return { boardState, listBoard, detailBoard, totalCount };
});

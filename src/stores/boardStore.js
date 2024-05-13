import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useBoardStore = defineStore("boardStore", () => {
  const boardState = reactive({
    boardList: [],
    board: {
      boardId: 0,
      userSeq: 0,
      title: "",
      content: "",
    },
    limit: 10,
    offset: 0,
    searchWord: "검색어",
  });
  const totalCount = ref(3);

  const boardListData = [
    { boardId: 1, userId: 100, title: "111", content: "11111" },
    { boardId: 2, userId: 200, title: "222", content: "22222" },
    { boardId: 3, userId: 300, title: "333", content: "33333" },
  ];
  const boardData = { boardId: 2, userId: 200, title: "222", content: "22222" };

  function listBoard() {
    boardState.boardList = boardListData;
  }
  function detailBoard() {
    // console.log(boardId)
    boardState.board = boardData;
  }

  return { boardState, listBoard, detailBoard, totalCount };
});

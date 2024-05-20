<template>
  <section class="section pb-5">
    <div class="container">
      <div class="row mb-8 align-items-end center justify-content-center">
        <div class="col-md-8">
          <h2>Login</h2>
          <br /><br />
          <div class="table form text-center">
            <form name="login-form" class="login-form table">
              <div class="row-6">
                <input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="ID"
                  v-model="userId"
                  class="border col-sm-3 col-md-6"
                /><br /><br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="PASSWORD"
                  v-model="userPw"
                  class="border col-sm-3 col-md-6"
                /><br />
              </div>
              <br />
              <div class="row-3 border-2">
                <button
                  class="btn-link border-0 login-btn readmore d-block w-100"
                  id="btnLogin"
                  type="button"
                  @click="login"
                >
                  로그인
                </button>
                <br />
                <button
                  class="btn-link border-0 regist-btn readmore d-block w-100"
                  id="btnRegist"
                  type="button"
                  @click="register"
                >
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

// 로그인 상태를 확인하기 위한 사용자 정보
const userInfo = ref(JSON.parse(sessionStorage.getItem("userInfo")) || {
  isLogin: false,
});

const userId = ref("");
const userPw = ref("");
const router = useRouter();
const route = useRoute();

// 로그인 함수
const login = () => {
  if (userId.value === "") {
    alert("ID를 입력하세요.");
    return;
  }

  if (userPw.value === "") {
    alert("비밀번호를 입력하세요.");
    return;
  }

  if (userId.value === "ssafy" && userPw.value === "1234") {
    // 로그인 성공 시 사용자 정보를 sessionStorage에 저장하고 isLogin 상태를 true로 변경
    const userInfo = {
      isLogin: true,
      userRole: "user",
      userName: "ssafy",
    };
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    router.push(route.query.redirect || "/");
  } else {
    alert("로그인실패");
  }
};

const register = () => {
  router.push("/register");
};
</script>
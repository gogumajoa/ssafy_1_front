<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand ms-3">MyTrip</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/board" class="nav-link">Board</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/map" class="nav-link">Map</RouterLink>
          </li>
          <li v-if="userInfo.isLogin.value" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ userInfo.userName.value }} <!-- 로그인된 사용자의 이름 표시 -->
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="logout">Logout</a>
              </li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  userInfo: Object,
});
const emit = defineEmits(["logout"]);
const router = useRouter();

const logout = () => {
  sessionStorage.removeItem("userInfo");
  
  emit("logout");
  router.push("/"); // 로그아웃 후 홈으로 이동
};
</script>

<style scoped>
/* 네비게이션 바 링크 스타일 */
.navbar-nav .nav-link {
  padding: .5rem 1rem;
}

/* 로그아웃 버튼 스타일 */
.navbar-nav .nav-link.logout {
  color: #dc3545; /* 로그아웃 링크 색상 */
}

/* 네비게이션 바 아이템 간격 조정 */
@media (min-width: 992px) {
  .navbar-nav {
    gap: 1rem;
  }
}

/* 드롭다운 토글 아이콘 활성화 스타일 */
.navbar-nav .dropdown-toggle::after {
  display: inline-block;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}

/* 드롭다운 토글 아이콘 활성화 스타일 (클릭 상태) */
.navbar-nav .show > .nav-link.dropdown-toggle::after {
  border-top: 0;
  border-bottom: 0.3em solid;
}
</style>

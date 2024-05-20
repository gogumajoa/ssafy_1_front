import { reactive } from "vue";
import { defineStore } from "pinia";

import http from "@/common/axios.js";
// import notLoginaccountProfileImageUrl from '@/assets/noProfile.png';

export const useAuthStore = defineStore("authStore", () => {
  console.log(notLoginaccountProfileImageUrl);
  const authStore = reactive({
    // NavBar
    isLogin: false,

    accountName: "",
    accountProfileImageUrl: notLoginaccountProfileImageUrl,

    // Login
    accountEmail: "dskim@dskim.com",
    accountPassword: "1234",
  });

  // getter 는 생략 직접 사용하는 걸로
  const setLogin = (payload) => {
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("accountName", payload.accountName);
    sessionStorage.setItem(
      "accountProfileImageUrl",
      payload.accountProfileImageUrl
    );

    authStore.isLogin = payload.isLogin;
    authStore.accountName = payload.accountName;
    authStore.accountProfileImageUrl = payload.accountProfileImageUrl;
    console.log(authStore);
  };

  const logout = async () => {
    try {
      let { data } = await http.get("/logout");

      if (data.result == "success") {
        setLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("accountName");
    sessionStorage.removeItem("accountProfileImageUrl");

    authStore.isLogin = false;
    authStore.accountName = "";
    authStore.accountProfileImageUrl = notLoginaccountProfileImageUrl;
  };

  return { authStore, setLogin, setLogout, logout };
});

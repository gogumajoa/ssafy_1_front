import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from "@/common/axios.js";
import notLoginUserProfileImageUrl from '@/assets/noProfile.png';

export const useAuthStore = defineStore('authStore', () => {
  console.log(notLoginUserProfileImageUrl)
  const authStore = reactive({
    // NavBar
    isLogin: false,

    userName: '',
    userProfileImageUrl: notLoginUserProfileImageUrl,

    // Login
    userEmail: "dskim@dskim.com",
    userPassword: "1234",
  })

  // getter 는 생략 직접 사용하는 걸로
  const setLogin = (payload) => {
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("userName", payload.userName);
    sessionStorage.setItem("userProfileImageUrl", payload.userProfileImageUrl);

    authStore.isLogin = payload.isLogin;
    authStore.userName = payload.userName;
    authStore.userProfileImageUrl = payload.userProfileImageUrl;
    console.log(authStore)
  }

  const logout = async () => {
    try {
       let { data } = await http.get("/logout");

       if (data.result == "success") {
        setLogout()
       }
    } catch (error) {
       console.error(error);
    }
  }

  const setLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userProfileImageUrl");

    authStore.isLogin = false;
    authStore.userName = '';
    authStore.userProfileImageUrl = notLoginUserProfileImageUrl;
  }

  return { authStore, setLogin, setLogout, logout }
})


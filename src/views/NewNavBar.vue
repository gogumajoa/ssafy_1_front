<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
       <div class="container">
          <router-link to="/" class="navbar-brand">NoStraight</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item float-end">
                   <!-- login 성공하면 보여줌 -->
                   <router-link v-show="authStore.isLogin" to="/board" class="nav-link">Board</router-link>
                </li>
             </ul>
             <ul class="navbar-nav ms-5">
                <li class="nav-item">
                   <!-- nav-item 이 height 가 40 고정 class mt-2 넣어서 높이 조정하자 -->
                   <img v-bind:src="authStore.userProfileImageUrl" alt="Logo" class="mt-2" style="width:24px; height: 24px; border-radius: 50%;">
                </li>
                <!--  <li class="nav-item" v-show="authStore.isLogin"> -->
                   <a class="nav-link" href="#" @click="navLogout">{{authStore.userName}} Logout</a>
                <!-- </li>-->
                <!--<li class="nav-item" v-show="!authStore.isLogin"> -->
                   <router-link to="/login" class="nav-link">Login</router-link>
                <!-- </li>-->
             </ul>
             <!-- <a v-show="authStore.isLogin" class="navbar-brand" href="#">
                <img v-bind:src="authStore.userProfileImageUrl" alt="" width="34" height="30" style="border-radius: 50%" class="d-inline-block align-text-top" />
                {{ authStore.userName }}
             </a> -->
          </div>
       </div>
    </nav>
 </template>
 
 <script setup>
 
 
 </script>
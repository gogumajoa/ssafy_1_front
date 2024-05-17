<template>
    <div>
      <div class="result" v-for="comment in comments" :key="comment.id">
        <div>{{ comment.numData }}</div>
        <div>{{ comment.stringData }}</div>
      </div>
      <InfiniteLoading @infinite="load"></InfiniteLoading>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import InfiniteLoading from 'v3-infinite-loading';
  
  let comments = ref([]);
  let page = 1;
  
  const load = async $state => {
    try {
      const response = await fetch(`http://localhost:8080/touristspot`,{
        params:{
            pageSize : 10,
            pageNum : 1
        }
      });
      const json = await response.json();
      if (json.length < 10) {
        $state.complete();
      } else {
        comments.value.push(...json);
        $state.loaded();
      }
      page++;
    } catch (error) {
      $state.error();
      console.error('Error loading more items:', error);
    }
  };
  </script>
  
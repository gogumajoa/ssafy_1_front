<template>
  <div>
    <div class="result" v-for="comment in comments" :key="comment.touristspotId">
      <div>{{ comment.touristspotTitle }}</div>
      <div>{{ comment.touristspotAddr }}</div>
    </div>
    <InfiniteLoading @infinite="load"></InfiniteLoading>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InfiniteLoading from 'v3-infinite-loading';

let comments = ref([]);
let page = ref(1);

const load = async $state => {
  try {
    const response = await axios.get('http://localhost:8080/touristspot', {
      params: {
        pageSize: 10,
        pageNum: page.value
      }
    });
    const json = response.data;
    console.log(json);
    if (json.length < 10) {
      $state.complete();
    } else {
      comments.value.push(...json);
      $state.loaded();
    }
    page.value++;
  } catch (error) {
    $state.error();
    console.error('Error loading more items:', error);
  }
};
</script>

<!-- TouristSpotDetail.vue -->
<template>
  <div class="detail-container">
    <h2>{{ spot.touristspotTitle }}</h2>
    <p>{{ spot.description }}</p>
    <p>{{ spot.touristspotAddr }}</p>
    <!-- Add more details here -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const spot = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/touristspot/${props.id}`);
    spot.value = response.data;
  } catch (error) {
    console.error('Error fetching spot details:', error);
  }
});
</script>

<style>
.detail-container {
  padding: 20px;
}
</style>

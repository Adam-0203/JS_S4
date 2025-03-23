<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const job = ref(null);

onMounted(() => {
  const savedJobs = localStorage.getItem('jobs');
  const jobsArray = savedJobs ? JSON.parse(savedJobs) : [];
  job.value = jobsArray.find(j => j.id === Number(route.params.id));

  console.log("Selected job:", job.value);  // Debugging
});


</script>

<template>
  <div class="main-content">
    <div v-if="job">
      <h1>{{ job.titre }}</h1>
      <p><strong>Description:</strong> {{ job.description }}</p>
      <p><strong>Salaire:</strong> {{ job.salaire }}</p>
      <p><strong>Date:</strong> {{ job.date_de_création }}</p>
    </div>
    <div v-else>
      <p>Job not found.</p>
    </div>
  </div>
</template>


<style scoped>
body {
  margin: 0;
  padding: 0;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 1000;
}

.main-content {
  margin-top: 70px; /* Adjust this based on your nav height */
  padding: 20px;
}


</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const data = ref([]);
const route = useRoute();

// Load stored jobs on mount
onMounted(async () => {
  const savedJobs = localStorage.getItem('jobs');
  data.value = savedJobs ? JSON.parse(savedJobs) : [];

  // Load initial jobs from JSON if none exist
  if (data.value.length === 0) {
    const response = await fetch("/jobs.json");
    data.value = await response.json();
  }

  addNewJobFromQuery();
});

// Function to add new job from query parameters
const addNewJobFromQuery = () => {
  if (route.query.newJob) {
    const newJob = JSON.parse(route.query.newJob);
    data.value.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(data.value)); // Save to local storage
  }
};

// Watch for route changes
watch(() => route.query.newJob, () => {
  addNewJobFromQuery();
});

const remove_job = (job) => {
  data.value = data.value.filter(j => j !== job); // Remove the job
  localStorage.setItem('jobs', JSON.stringify(data.value)); // Update localStorage
};

</script>



<template>
  <section class="list">
    <h1>The Jobs : </h1>
    <div class="jobs">
      <div class="job" v-for="x in data" :key="x.id">
        {{ x.titre }}
        <div class="buttons">
          <span class="remove_button" @click="remove_job(x)">remove</span>
          <RouterLink class="RouterLink" :to="{ name: 'edit', query: { id: x.id } }">edit</RouterLink>
          <span class="detail_button RouterLink"><RouterLink :to="'/detail/' + x.id">Details</RouterLink>
          </span>
        </div>
      </div>
    </div>
    <div class="add_job">
    </div>
  </section>
</template>

<style>

  .RouterLink
  {
    text-decoration: none;
  }
  
  .list {
  margin-top: 80px;
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.jobs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.job {
  background: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 10px;
}

.remove_button,
.detail_button,
.edit_button a {
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s ease;
}

.remove_button {
  background: #ff4d4d;
  color: white;
}

.remove_button:hover {
  background: #cc0000;
}

.detail_button  {
  background: #007bff;
  color: white;
  padding: 5px 10px;
}

.detail_button:hover {
  background: #0056b3;
}

.edit_button {
  background: #ffc107;
  color: black;
}

.edit_button:hover {
  background: #d39e00;
}


</style>
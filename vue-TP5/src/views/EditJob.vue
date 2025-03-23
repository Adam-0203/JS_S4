<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = ref('');
const nom = ref('');
const description = ref('');
const salaire = ref('');
const date = ref('');

// Fetch job data and prefill the form
onMounted(() => {
  const savedJobs = localStorage.getItem('jobs');
  const jobsArray = savedJobs ? JSON.parse(savedJobs) : [];

  // Find the job to edit using the passed 'id' query parameter
  const jobToEdit = jobsArray.find(job => job.id === Number(route.query.id));

  if (jobToEdit) {
    // Prefill form fields with the job's current data
    id.value = jobToEdit.id;
    nom.value = jobToEdit.titre;
    description.value = jobToEdit.description;
    salaire.value = jobToEdit.salaire;
    date.value = jobToEdit.date_de_création;
  } else {
    // Handle job not found (you could redirect or show an error message)
    console.error('Job not found');
  }
});

// Handle form submission to update the job
const handleSubmit = () => {
  const updatedJob = {
    id: id.value,
    titre: nom.value,
    description: description.value,
    salaire: salaire.value,
    date: date.value
  };

  // Get the jobs array from localStorage and update the job
  const savedJobs = localStorage.getItem('jobs');
  const jobsArray = savedJobs ? JSON.parse(savedJobs) : [];
  const jobIndex = jobsArray.findIndex(job => job.id === updatedJob.id);

  if (jobIndex !== -1) {
    // Replace the old job with the updated job
    jobsArray.splice(jobIndex, 1, updatedJob);
    localStorage.setItem('jobs', JSON.stringify(jobsArray));

    // Redirect back to the display page
    router.push('/display');
  } else {
    console.error('Job not found for update');
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <p>
        <label for="id">ID:</label>
        <input type="text" v-model="id" disabled />
      </p>
      <p>
        <label for="nom">Job Title:</label>
        <input type="text" v-model="nom" />
      </p>
      <p>
        <label for="description">Description:</label>
        <input type="text" v-model="description" />
      </p>
      <p>
        <label for="salaire">Salary:</label>
        <input type="text" v-model="salaire" />
      </p>
      <p>
        <label for="date">Date:</label>
        <input type="text" v-model="date" />
      </p>
      <button type="submit">Update Job</button>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

p {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

input:disabled {
  background-color: #ddd;
}

</style>
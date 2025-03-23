<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const id = ref("");
const nom = ref("");
const description = ref("");
const salaire = ref("");
const date = ref("");

const router = useRouter();

const handleSubmit = () => {
  const newJob = {
    "id": id.value,
    "titre": nom.value,
    "description": description.value,
    "salaire": salaire.value,
    "date de création": date.value
  };

  // Save job in local storage before redirecting
  const savedJobs = localStorage.getItem('jobs');
  const jobsArray = savedJobs ? JSON.parse(savedJobs) : [];
  jobsArray.push(newJob);
  localStorage.setItem('jobs', JSON.stringify(jobsArray));

  // Navigate back to DisplayJobs
  router.push('/display');
};
</script>


<template>
  <div class="add_job_div">
    <form @submit.prevent="handleSubmit">
      <p>
        <label for="id">Entrer l'id : </label>
        <input type="text" v-model="id" required />
      </p>
      <p>
        <label for="nom">Entrer le nom du travail : </label>
        <input type="text" v-model="nom" required />
      </p>
      <p>
        <label for="description">Entrer la description : </label>
        <input type="text" v-model="description" required />
      </p>
      <p>
        <label for="salaire">Entrer le salaire : </label>
        <input type="text" v-model="salaire" required />
      </p>
      <p>
        <label for="date">Entrer la date de création : </label>
        <input type="text" v-model="date" required />
      </p>
      <button type="submit">Soumettre</button>
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
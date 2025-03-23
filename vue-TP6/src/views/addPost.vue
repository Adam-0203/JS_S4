<script setup lang="js">
  import { ref, computed } from 'vue';
  import {useRouter} from 'vue-router';

  const id = ref("");
  const titre = ref("");
  const tag = ref("");
  const contenu = ref("");
  const router = useRouter();

  
  const add_to_home = () => {
  const item = JSON.stringify({
    id: id.value,
    titre: titre.value,
    tag: tag.value,
    contenu: contenu.value,
  });
  router.push({ path: '/home', query: { item } });
};



</script>

<template>
  <main>
    <div class="form">
      <form @submit.prevent="add_to_home">
        <p>
          <label for="id">id : </label>
          <input type="text" v-model="id">
        </p>
        <p>
          <label for="id">titre : </label>
          <input type="text" v-model="titre">
        </p>
        <p>
          <label for="id">tag : </label>
          <input type="text"v-model="tag">
        </p>
        <p>
          <label for="id">contenu : </label>
          <textarea name="centenu" id="id" cols="30" rows="10" v-model="contenu"></textarea>
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
    margin-top: 80px;
    padding: 1rem;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input, textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.submit-button {
    padding: 0.75rem 2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.submit-button:hover {
    background-color: #45a049;
}
</style>

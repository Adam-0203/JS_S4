<script setup lang="js">
  import { RouterView, RouterLink , useRoute} from 'vue-router';
  import { ref, computed, onMounted } from 'vue';

  const route = useRoute();
  const data = ref([]);

  onMounted(async () => {
      const response = await fetch("/books.json");
      data.value = await response.json();
      //(route.query.item)
    });
</script>

<template>
  <header>
      <nav>
        <RouterLink class="RouterLink" to="/Home">Home</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>


<style scoped>
  nav{
    position: fixed;
    width: 100%;
    z-index: 1000;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    color: white;
  }

  .RouterLink{
    background-color: #555;
    transition: transform 0.2s ease-out;
    border-radius: 5px;
    padding: 1rem;
    text-decoration: none;
    color: white;
    font-weight: bolder;
  }

  .RouterLink:hover{
    transform: scale(1.05);
    color: aliceblue;
  }
</style>

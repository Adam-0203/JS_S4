<script setup lang="js">

  import { RouterView, RouterLink , useRoute} from 'vue-router';
  import { ref, computed, onMounted } from 'vue';
  
  const isActiveLink = (routePath) =>{
    const route = useRoute();
    return route.path === routePath;
  }
  
</script>

<template>
  <nav>
    <RouterLink :class="[isActiveLink('/AddJob') ? 'active' : '','RouterLink']" to="/AddJob">Add a Job</RouterLink>
    <RouterLink :class="[isActiveLink('/display') ? 'active' : '','RouterLink']" to="/display">Display</RouterLink>
  </nav>
  <RouterView />

</template>
 


<style scoped>
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

.RouterLink {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.RouterLink:hover {
  background-color: #555;
}

.active {
  background-color: #007bff;
}

</style>

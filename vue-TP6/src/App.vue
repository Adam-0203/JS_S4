<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav class="navBar">
      <RouterLink class="RouterLink" to="/home">Home</RouterLink>
      <RouterLink class="RouterLink" to="/addPost">AddPost</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

  .navBar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: white;
    z-index: 1000;
    height: 65px;
  }

  .RouterLink{
    text-decoration: none;
    padding: 14px;
    border-radius: 5px;
    color: white;
    font-weight: bolder;
  }

  .RouterLink:hover{
    background-color: #555;
    text-decoration: none;
    color: rgb(168, 211, 248);
    transform: scale(1.2);
    transform: scaleY(1.1);
  }

</style>

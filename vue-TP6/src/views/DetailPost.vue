<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const id = route.params.id;
    const posts = ref([]);
    const post = ref(null);
    
    onMounted(() => {
        const item = JSON.parse(route.query.item);  // Directly access the query parameter
        posts.value = item;

        post.value = posts.value.find(x => x.id == id);
    });    

</script>


<template>
    <main>
        <div class="post" v-if="post">
          <p>le titre : {{ post.titre }}</p>
          <p>le tag : {{ post.tag }}</p>
          <p>le contenu : {{ post.contenu }}</p>
        </div>
    </main>
</template>


<style scoped>
main {
    padding: 1rem;
    margin-top: 80px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

.post {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1rem;
    line-height: 1.6;
}
</style>
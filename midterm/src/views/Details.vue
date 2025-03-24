<script setup>
    import { RouterView, RouterLink , useRoute} from 'vue-router';
    import { ref, computed, onMounted } from 'vue';

    const route = useRoute();
    const livre = ref({});

    onMounted (() =>{
        if(route.query.item){
            livre.value = JSON.parse(route.query.item);
        }
    })

</script>

<template>
    <main>
        <div class="book">
            <p>titre : {{ livre.titre }}</p>
            <p>auteur : {{ livre.auteur }}</p>
            <p>date de publication : {{ livre.publication }}</p>
            <p>catégorie : {{ livre.catégorie }}</p>
            <p>statut : {{ livre.statut }}</p>
            <p>résumé : {{ livre.resume }}</p>
        </div>
    </main>
</template>


<style scoped>

    .book {
        padding: 2rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 1rem auto;
        width: 90%;
        max-width: 600px;
        transition: transform 0.3s ease;
    }

    main{
        padding: 1rem;
        position: absolute;
        top: 70px;
        width: 100%;
    }
</style>
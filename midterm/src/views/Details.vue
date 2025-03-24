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
            <p><span class="title">titre :</span> {{ livre.titre }}</p>
            <p><span class="title">auteur :</span> {{ livre.auteur }}</p>
            <p><span class="title">date de publication :</span> {{ livre.publication }}</p>
            <p><span class="title">catégorie :</span> {{ livre.catégorie }}</p>
            <p><span class="title">statut :</span> {{ livre.statut }}</p>
            <p><span class="title">résumé : </span>{{ livre.resume }}</p>
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

    .title
    {
        display: inline-block;
        color: red;
        font-weight: bold;
    }
</style>

<script setup>
  import { RouterView, RouterLink , useRoute} from 'vue-router';
  import { ref, computed, onMounted } from 'vue';

  const route = useRoute();
  const data = ref([]);
  const name = ref('');
  const status = ref(0);

  onMounted(async () => {
      const response = await fetch("/books.json");
      data.value = await response.json();
      
    });


  const books = computed(()=>{
    let return_books = data.value;
    if (status.value != 0){
        return_books = books.value.filter((x) => {return x.statut == "disponible";});
    }
    if (name.value != ''){
        return_books = return_books.filter((x) => {
            return (x.titre.includes(name.value) || x.auteur.includes(name.value));
        })
    }
    return return_books;

  })

</script>

<template>
    <main>
        <div class="filterBooks">
            <p><input class="inputText" type="text" v-model="name" placeholder="entrer le nom du livre ou  de l'auteur"></p>
            <p><input value=1 type="checkbox" name="status" id="status" v-model="status"> Disponible</p>
        </div>
        <div class="displayBooks">
                <div class="book" v-for="x in books">
                    <RouterLink class="details-link RounterLink" :to="{ path: `/Details/${x.id}`, query: { item: JSON.stringify(x) } }">
                        <p>titre : {{ x.titre }}</p>
                        <p>auteur : {{ x.auteur }}</p>
                        <p>date de publication : {{ x.publication }}</p>
                        <p>catégorie : {{ x.catégorie }}</p>
                        <p>statut : {{ x.statut }}</p>
                    </RouterLink>
                </div>
            
        </div>
    </main>
</template>



<style scoped>
    main{
        padding: 1rem;
        position: absolute;
        top: 70px;
        width: 100%;
    }

    .book{
        border: 1px solid black;
        margin: 1rem;
        transition: transform 0.2s ease-out;
    }

    .book {
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 1rem auto;
        width: 90%;
        max-width: 600px;
        transition: transform 0.3s ease;
    }

    .book p{
        padding: 0.2rem;
        margin: 0.3rem
    }


    .book:hover{
        transform: scale(1.05);
    }

    .filterBooks{
        padding: 1rem;
        width: 100%;
    }
    .filterBooks .inputText{
        width: 100%;
        padding: 0.5rem;
    }

    .details-link
    {
        text-decoration: none;
        color: black;
    }

    

    .details-link:visited{
        color: black;
    }

    
    
</style>
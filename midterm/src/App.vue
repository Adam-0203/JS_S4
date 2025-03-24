<script setup>
    import {ref, onMounted, computed} from 'vue';

    //nos livres
    const books = ref([]);
    onMounted(async ()=>
    {
        const response = await fetch('/books.json');
    
        const result = await response.json(); 
        books.value = result.books; // Access "books" inside JSON
        console.log(books);

    })

    const book_id = ref(null);
    const book_info = computed(()=>
    {
        const obj_info_list = books.value.filter((x)=> {return x.isbn === book_id.value;});
        const obj_info = obj_info_list[0];
        
        return obj_info;
    })

    const panier = ref([]);

    const add_to_panier = () => {
        const book = book_info.value;  // Get the current selected book
        if (book) {
            panier.value.push(book);  // Add the full book object to the panier
        }
    };
    
    const remove_from_panier = (x)=>
    {
        panier.value.splice(panier.value.indexOf(x),1)
    }

    let Total = computed(()=>
    {
        let prix = 0;
        for (let x in panier.value)
        {
            prix += Number(panier.value[x].price);
        }
        console.log(prix);
        return prix;
        
    })
    

</script>
    
<template>
    <div class="choix">
        <h1>Choisissze un livre : </h1>
        <select name="book_selected" id="book_selected" v-model="book_id">
            <option v-for="livre in books" :key='livre.isbn' :value="livre.isbn">{{livre.title}}</option>
        </select>

        <div class="book_informations">
            <p v-for="(info,key) in book_info">{{ key }} : {{ info }}</p>
            <button v-if="book_info" class="add_button" @click="add_to_panier()">+</button>
        </div>
    </div>
    <div class="panier">
        <h1>Panier: </h1>
        <div class="selected_books">
            <div class="selected_book" v-for="book in panier">
                <p>{{ book.title }}</p>
                <button @click="remove_from_panier">-</button>
            </div>
            <p>Totale : {{ Total }} DH</p>
        </div>
    </div>
</template>

<style>
    body
    {
        background-color: rgba(54, 31, 31, 0.247);
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font: 0.5rem;
        min-height: 130vh;
    }
    #app
    {
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: center;
    }
    
    .choix, .panier
    {
        min-height: 100vh;
        padding: 0.3rem;
        margin: 10px;
        border-radius: 7px;
        width: 45%;
        background-color: antiquewhite;
    }


</style>
<script setup>
import { ref, computed, onMounted } from 'vue'

const name = ref("");
const categorie = ref("Toutes catégories");
const categories = ref(["Toutes catégories", "Électricité", "Filtration", "Moteur", "Freinage", "Refroidissement",
 "Suspension", "Sécurité", "Transmission", "Carburant", "Carrosserie", "Échappement", "Direction"]);

const en_stock = ref(false);
const ordre = ref("");
const ordres = ref(["Prix croissant", "Prix décroissant"]);
const data = ref(null);
const cart = ref([]); // Cart to store selected items

onMounted(async () => {
    const response = await fetch("/pieces-autos.json");
    data.value = await response.json();
    console.log(data.value);
})

const list_produit = computed(() => {
    let return_list;
    if (data.value) {
        return_list = data.value.filter((x) => {
            return ((x.nom.includes(name.value) || name.value === "") && (categorie.value === "Toutes catégories" || x.categorie == categorie.value) && (!(en_stock.value) || x.disponible));
        })
        if (ordre.value == "Prix croissant") { return_list.sort((a, b) => a.prix - b.prix); }
        else if (ordre.value == "Prix décroissant") {
            return_list.sort((a, b) => b.prix - a.prix);
        }
    }
    else { return_list = []; }

    return return_list;
})

const addToCart = (product) => {
    cart.value.push(product);
}

const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId);
}
</script>

<template>
  <header>
    <h1>Les Bonnes Pièces</h1>
  </header>

  <main>
    <section class="filtres">
      <h3>Filtres</h3>
      <input type="text" class="name" v-model="name" placeholder="chercher un produit">

      <select name="categorie" id="categorie" v-model="categorie">
        <option :value="x" v-for="x in categories" :key="x">{{x}}</option>
      </select>

      <input type="checkbox" name="en_stock" id="en_stock" v-model="en_stock" class="inline">
      <label for="en_stock" class="inline">En stock</label>

      <select name="ordre" id="ordre" v-model="ordre">
        <option :value="x" v-for="x in ordres" :key="x">{{x}}</option>
      </select>

      <!-- Cart Section inside filtros -->
      <section class="cart">
        <h3>Panier</h3>
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.nom }} - {{ item.prix }} DH
            <button @click="removeFromCart(item.id)" class="retirer_button">Retirer</button>
          </li>
        </ul>
      </section>
    </section>

    <section class="fiches">
      <div class="produit" v-for="x in list_produit" :key="x.id">
        <img :src="`/img/${x.Image}`" alt="">
        <h3>{{ x.nom }}</h3>
        <p class="prix">{{ x.prix }} DH</p>
        <p class="categorie">Catégorie: {{ x.categorie }}</p>
        <button @click="addToCart(x)">Ajouter au panier</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
  .filtres * {
    display: block; 
  }
  .filtres .inline {
    display: inline-block;
    margin: 0.5rem;
  }

  /* General page styling */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}

header {
  background-color: #7540ee;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.5rem; 
  font-weight: bold;
}

/* Filters section */
.filtres {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 220px;
  margin: 1rem;
}

.filtres * {
  display: block;
  width: 100%;
  margin-bottom: 0.75rem;
}

.filtres .inline {
  display: inline-block;
  width: auto;
  margin-right: 0.5rem;
}

/* Cart section */
.cart {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  width: 85%; /* Ensures it fills the width of the parent */
}

.cart ul {
  list-style-type: none;
  padding: 0;
}

.cart li {
  margin: 0.5rem 0;
}

.cart button {
  background-color: #e63946;
  color: white;
  border: none;
  padding: 0.3rem 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.cart button:hover {
  background-color: #d62828;
}

/* Product list */
.fiches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

/* Individual product card */
.produit {
  background-color: white;
  width: 140px;
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.produit:hover {
  transform: scale(1.05);
}

.produit img {
  width: 100%;
  height: auto;
  max-height: 80px;
  border-radius: 4px;
}

.produit h3 {
  font-size: 0.9rem;
  margin: 0.4rem 0 0.2rem;
}

.produit .prix {
  font-size: 1rem;
  font-weight: bold;
  color: #e63946;
}

.produit .categorie {
  font-size: 0.75rem;
  color: #666;
}

.retirer_button
{
	width: 60%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .fiches {
    justify-content: center;
  }

  .produit {
    width: 120px;
  }

  .produit img {
    max-height: 70px;
  }
}
</style>

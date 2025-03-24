<script setup>
  import {ref, computed} from 'vue';

  //création des variables utiles au projet
  const identifiant = ref('');
  const nom = ref('');
  const prenom = ref('');
  const age = ref('');
  const mdp = ref('');
  const mdp_confirm = ref("");
  const accept_CGU = ref(true);

  const check_len = () => {return mdp.value.length<=8 || (mdp.value == "");}
  const check_min = () =>{
    return (!(mdp.value.split("").some(char => char >= "a" && char <= "z")) || (mdp.value == ""));
  }
  const check_maj = () =>{
    return (!(mdp.value.split("").some(char => char >= "A" && char <= "Z")) || (mdp.value == ""));
  }
  const check_num = () =>{
    return (!(mdp.value.split("").some(char => !isNaN(char))) || (mdp.value==""));
  }

  const check_special_char = () => {
    return (!(mdp.value.split("").some((char) => !/^[a-zA-Z0-9]$/.test(char))) || (mdp.value == ""));
    
  } 

  const button_disable = () =>
  {
    return (check_len() || check_maj() || check_min() || check_num() || check_special_char() || !accept_CGU.value);
  }

  const percentage = computed(()=>
  {
    const lista = [check_len() , check_maj() , check_min() , check_num() , check_special_char()];
    const consitions_met = lista.filter((x)=>(x == false));
    return consitions_met.length*20;
  });


</script>

<template>
  <div class="formulaire">
    <form @submit.prevent="null">
      <input type="text" placeholder="Identifiant (12 charactères alphabétiques)" v-model="identifiant">
      <input type="text" placeholder="Nom" v-model="nom">
      <input type="text" placeholder="Prenom" v-model="prenom">
      <input type="text" placeholder="Age (>18 ans)" v-model="age">
      <input type="text" placeholder="Mot de passe" v-model="mdp">
      <p class="percentage">La qualité de mot de passe : {{ percentage }}%</p>
      <input type="text" placeholder="Confirmer le mot de passe" v-model="mdp_confirm">

      <div class="mdp_condition">
        <ul>
          <li v-if="check_len()">Le mdp doit faire au moins 8 caractères.</li>
          <li v-if="check_min()">Le mdp doit contenir au moins une lettre minuscule.</li>
          <li v-if="check_maj()">Le mdp doit contenir au moins une lettre majuscule.</li>
          <li v-if="check_num()">Le mdp doit contenir au moins un chiffre.</li>
          <li v-if="check_special_char()">Le mdp doit contenir au moins un caractère qui ne soit ni une lettre, ni un chiffre.</li>
        </ul>
      </div>

      <input type="checkbox" name="CGU" id="CGU" v-model="accept_CGU">
      <label for="CGU">j'accepte les <b>conditions générales</b> d'utilisation</label>

      <div class="button_div"><button type="submit" id="submit_button" :disabled="button_disable()">Soummetre</button></div>
    </form>
  </div>
  
</template>

<style>

  *
  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: aliceblue;
  }

  body
  {
    background-color: #24232f;
    min-height: 140vh;
  }

  #app
  {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .formulaire
  {
    margin-top: 30px;
    background-color: #2d2b44;
    display: flex;
    flex-direction: column;
    width: 65%;
  }

  .formulaire input
  {
    display: block;
    width: 90%;
    margin: 1rem;
    padding: 0.6rem;
    color: #24232f;
  }

  .formulaire .percentage
  {
    text-align: center;

  }

  .mdp_condition 
  {
    width: 90%;
    margin-left: 25px;
  }

  .mdp_condition li
  {
    color: red;
    text-wrap: wrap;
  }

  #CGU
  {
    display: inline-block;
    width: fit-content;
  }

  #submit_button
  {
    display: block;
    margin: 1rem;
    background-color:#2d2b44;
    padding: 0.5rem;
    margin-left:auto ;

  }
  

  #submit_button:hover
  {
    cursor: pointer;
    background-color: #2f2c50;

  }

  #submit_button:disabled
  {
    cursor: default;
    background-color: #302e42;
  }

  .button_div
  {
    display: flex;
    flex-direction: row;
  }
  
</style>

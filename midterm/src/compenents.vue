// ParentComponent.vue
<template>
  <div>
    <h2>Parent Component</h2>
    <p>Message from Child: {{ childMessage }}</p>
    <ChildComponent msg="Hello from Parent!" @update-message="handleUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childMessage = ref('');

const handleUpdate = (newMessage) => {
  childMessage.value = newMessage;
};
</script>

<style scoped>
div {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
</style>


<!-- ChildComponent.vue -->
<template>
  <div>
    <h3>Child Component</h3>
    <p>Received Prop: {{ msg }}</p>
    <button @click="sendMessage">Send Message to Parent</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({ msg: String });
const emit = defineEmits(['update-message']);

const sendMessage = () => {
  emit('update-message', 'Hello Parent!');
};
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>


<!-- App.vue -->
<template>
  <div>
    <h1>Vue Composition API Demo</h1>
    <ParentComponent />
  </div>
</template>

<script setup>
import ParentComponent from './components/ParentComponent.vue';
</script>

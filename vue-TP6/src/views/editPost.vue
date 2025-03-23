<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const iden = route.params.id;
const posts = ref([]);
const post = ref(null);

// Form fields (updated reactively)
const id = ref("");
const titre = ref("");
const tag = ref("");
const contenu = ref("");

// Load post data on mount
onMounted(() => {
    try {
        const item = route.query.item ? JSON.parse(route.query.item) : [];
        posts.value = item;
        
        // Find the correct post based on ID
        const foundPost = posts.value.find(x => x.id == iden);
        if (foundPost) {
            post.value = foundPost;
            id.value = foundPost.id;
            titre.value = foundPost.titre;
            tag.value = foundPost.tag;
            contenu.value = foundPost.contenu;
        }
    } catch (error) {
        console.error("Error parsing query item:", error);
    }
});

// Watch for post changes to update fields dynamically
watch(post, (newPost) => {
    if (newPost) {
        id.value = newPost.id;
        titre.value = newPost.titre;
        tag.value = newPost.tag;
        contenu.value = newPost.contenu;
    }
});

// Modify Post Function
const modify_post = () => {
    if (!post.value) return;

    post.value.id = id.value;
    post.value.titre = titre.value;
    post.value.tag = tag.value;
    post.value.contenu = contenu.value;

    // Navigate back to home with the updated posts
    router.push({ path: '/home', query: { item : JSON.stringify(posts.value)} });
};
</script>

<template>
    <main>
        <div class="form">
            <form @submit.prevent="modify_post">
                <p>
                    <label for="id">ID: </label>
                    <input type="text" v-model="id">
                </p>
                <p>
                    <label for="titre">Titre: </label>
                    <input type="text" v-model="titre">
                </p>
                <p>
                    <label for="tag">Tag: </label>
                    <input type="text" v-model="tag">
                </p>
                <p>
                    <label for="contenu">Contenu: </label>
                    <textarea cols="30" rows="10" v-model="contenu"></textarea>
                </p>
                <button type="submit">Submit</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
main {
    margin-top: 80px;
    padding: 1rem;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input, textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.submit-button {
    padding: 0.75rem 2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.submit-button:hover {
    background-color: #45a049;
}
</style>

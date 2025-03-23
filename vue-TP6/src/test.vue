<!-- // src/components/NavBar.vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/addPost">Add Post</router-link>
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}
</style>





// src/components/PostList.vue
<template>
  <div>
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SinglePost from './SinglePost.vue';
import getPosts from '../composables/getPosts';

const { posts } = getPosts();
</script>





// src/components/SinglePost.vue
<template>
  <div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.body.substring(0, 50) }}...</p>
    <router-link :to="`/posts/${post.id}`">Read More</router-link>
  </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['post']);
</script>





// src/components/TagCloud.vue
<template>
  <div>
    <span v-for="tag in tags" :key="tag">
      <router-link :to="`/tags/${tag}`">#{{ tag }}</router-link>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import getPosts from '../composables/getPosts';

const { posts } = getPosts();
const tags = computed(() => [...new Set(posts.value.flatMap(post => post.tags))]);
</script>





<script>
// src/composables/getPosts.js
import { ref, onMounted } from 'vue';

export default function getPosts() {
  const posts = ref([]);

  onMounted(async () => {
    const res = await fetch('https://api.example.com/posts');
    posts.value = await res.json();
  });

  return { posts };
}
</script>





<script>
// src/composables/getPost.js
import { ref, onMounted } from 'vue';

export default function getPost(id) {
  const post = ref(null);

  onMounted(async () => {
    const res = await fetch(`https://api.example.com/posts/${id}`);
    post.value = await res.json();
  });

  return { post };
}
</script>





// src/views/CreatePostView.vue
<template>
  <form @submit.prevent="submitPost">
    <input v-model="title" placeholder="Title" required />
    <textarea v-model="body" placeholder="Content" required></textarea>
    <input v-model="tags" placeholder="Tags (comma separated)" />
    <button type="submit">Add Post</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const body = ref('');
const tags = ref('');

const submitPost = async () => {
  await fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value, body: body.value, tags: tags.value.split(',') })
  });
};
</script>







// src/views/PostDetailView.vue
<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <TagCloud />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import getPost from '../composables/getPost';
import TagCloud from '../components/TagCloud.vue';

const route = useRoute();
const { post } = getPost(route.params.id);
</script>






// src/views/Home.vue
<template>
  <div>
    <PostList />
    <TagCloud />
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue';
import TagCloud from '../components/TagCloud.vue';
</script> -->

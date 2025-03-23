<script setup lang="js">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const data = ref([]);
  const route = useRoute();
  const selectedTag = ref(""); // To store the selected tag for filtering

  onMounted(async () => {
    const response = await fetch("/posts.json");
    data.value = await response.json();

    if (route.query.item) {
        try {
            const parsedItem = JSON.parse(route.query.item);

            if (Array.isArray(parsedItem)) {
                // If it's an array, replace the entire list (modified posts)
                data.value = parsedItem;
            } else {
                // If it's a single object, append it (new post)
                data.value.push(parsedItem);
            }
        } catch (error) {
            console.error("Error parsing query item:", error);
        }
    }
  });

  // Get unique tags from posts
  const tags = computed(() => {
    const allTags = data.value.map(post => post.tag);
    return [...new Set(allTags)]; // Remove duplicates
  });

  // Filter posts based on selected tag
  const filteredData = computed(() => {
    if (selectedTag.value) {
      return data.value.filter(post => post.tag === selectedTag.value);
    }
    return data.value;
  });

  // Delete post function with confirmation
  const deletePost = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      data.value = data.value.filter(post => post.id !== id);
    }
  };
</script>

<template>
  <main>
    <!-- Tag filter dropdown -->
    <div class="tag-filter">
      <label for="tag-select">Filter by tag:</label>
      <select v-model="selectedTag" id="tag-select">
        <option value="">All</option>
        <!-- Dynamically generate options for tags -->
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <h1>Les posts : </h1>
    
    <!-- Loop through filtered posts -->
    <div class="post" v-for="x in filteredData" :key="x.id">
      <p class="post-title">le titre : {{ x.titre }}</p>
      <p class="post-tag">le tag : {{ x.tag }}</p>
      <p class="post-content">le contenu : {{ x.contenu.substring(0, 40) }}...</p>
      <div class="post-actions">
        <RouterLink class="details-link" :to="{ path: `/Details/${x.id}`, query: { item: JSON.stringify(data) } }">Details</RouterLink>
        <RouterLink class="edit-link" :to="{ path: `/editPost/${x.id}`, query: { item: JSON.stringify(data) } }">EditPost</RouterLink>
        <button @click="deletePost(x.id)" class="delete-button">Delete</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 80px;
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
}
h1
{
  text-align: center;
}
.post {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem auto;
  padding: 1.5rem;
  width: 90%;
  max-width: 600px;
  transition: transform 0.3s ease;
}

.post:hover {
  transform: scale(1.02);
}

.post-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.post-tag {
  font-size: 1rem;
  color: #007bff;
  font-style: italic;
}

.post-content {
  font-size: 1rem;
  color: #555;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.details-link, .edit-link {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.details-link {
  background-color: #007bff;
  color: white;
}

.details-link:hover {
  background-color: #0056b3;
}

.edit-link {
  background-color: #28a745;
  color: white;
}

.edit-link:hover {
  background-color: #218838;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}

#tag-select {
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

#tag-select:hover {
  border-color: #007bff;
}

.tag-filter {
  margin-bottom: 1rem;
  text-align: center;
}

label {
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 0.5rem;
}

option {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>

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
      <p>le titre : {{ x.titre }}</p>
      <p>le tag : {{ x.tag }}</p>
      <p>le contenu : {{ x.contenu.substring(0, 40) }}...</p>
      <p>
        <RouterLink :to="{ path: `/Details/${x.id}`, query: { item: JSON.stringify(data) } }">Details</RouterLink>
      </p>
      <p>
        <RouterLink class="RouterLink" :to="{ path: `/editPost/${x.id}`, query: { item: JSON.stringify(data) } }">EditPost</RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 80px;
  padding: 1rem;
}

.post {
  border: 1px solid black;
  margin: 1rem 0;
  padding: 1rem;
  width: 90%; /* Making posts span 90% of the width */
  margin-left: auto;
  margin-right: auto;
}

#tag-select {
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
}

#tag-select:hover {
  border-color: #007bff;
}

.tag-filter {
  margin-bottom: 1rem;
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

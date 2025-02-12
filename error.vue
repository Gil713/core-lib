<script setup lang="ts">
defineProps({
  error: Object as () => INuxtCustomError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>
    <h2>{{ error?.message }}</h2>
    <button @click="handleError">Clear errors</button>
  </div>
</template>

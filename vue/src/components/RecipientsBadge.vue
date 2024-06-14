<script setup lang="ts">
const props = defineProps<{ numTruncated: number }>()
</script>

<template>
  <span class="badge" data-testid="badge">+{{ props.numTruncated }}</span>
</template>

<style scoped>
.badge {
  padding: 2px 5px;
  border-radius: 3px;
  background-color: var(--color-primary);
  color: #f0f0f0;
}
</style>

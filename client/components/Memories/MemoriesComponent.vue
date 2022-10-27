<template>
  <article
    class="memory"
  >
    <header>
      <h3 class="author">
        @{{ item.author }}
      </h3>
    </header>
    <p class="info">
      {{ item.content }}
    </p>
    <p class="info">
      From {{ item.date }}
    </p>
    <p class="interaction">
      {{ item.interaction }}
    </p>
  </article>
</template>

<script>

export default {
    name: 'MemoriesComponent',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
};
</script>

<style scoped>
.memory {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>

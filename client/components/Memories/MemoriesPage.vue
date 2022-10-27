<template>
  <main>
    <section>
      <header>
        <h2>Memories for @{{ $store.state.username }}</h2>
        <h2>On {{ month }} {{ day }}...</h2>
      </header>
    </section>
    <section
      v-if="$store.state.memories.length"
    >
      <MemoriesComponent
        v-for="mem in $store.state.memories"
        :key="mem.id"
        :item="mem"
      />
    </section>
    <section v-else>
      <h3>No memories for today.</h3>
    </section>
  </main>
</template>

<script>
import MemoriesComponent from '@/components/Memories/MemoriesComponent.vue';

export default {
    name: 'MemoriesPage',
    components: {
        MemoriesComponent
    },
    data() {
      return {
        month: '',
        day: '',
        memories: null
      };
    },
    mounted() {
      this.getDate();
      this.request();
    },
    methods: {
      getDate() {
        /**
         * Gets the current month and day
         */
        const date = new Date();
        const monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        this.month = monthNames[date.getMonth()];
        this.day = date.getDate();
      },
      async request() {
        const url = '/api/users/memories';
        try {
          const r = await fetch(url);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }

          this.$store.commit('updateMems', res.output);
          // console.log(res.output);
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
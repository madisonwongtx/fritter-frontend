<!-- Page for all items that deal with the user-->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Profile for @{{ $store.state.username }}</h2>
      </header>
    </section>
    <div>
      <button>
        Followers
      </button>
      <button>
        Following
      </button>
    </div>
    <section>
      <MemoriesPage />
    </section>
    <section>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
        Settings
      </router-link>
    </section>
  </main>
</template>

<script>

import MemoriesPage from '@/components/Memories/MemoriesPage.vue';

export default {
  name: 'ProfilePage',
  components: {
    MemoriesPage
  },
  mounted() {
    MemoriesPage
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

<!-- want to be able to see all freets and interactions by user, have memories tab, have assessment tab
     view followers, view following, follow user -->
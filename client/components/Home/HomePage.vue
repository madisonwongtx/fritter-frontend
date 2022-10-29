<template>
  <main>
    <section v-if="$store.state.username">
      <FeedPage />
    </section>
    <section v-else>
      <h2>Fritter</h2>
      <LoginPage/>
    </section>
  </main>
</template>

<script>
import FeedPage from '@/components/Feed/FeedPage.vue';
import LoginPage from '@/components/Login/LoginPage.vue';

export default {
  name: 'HomePage',
  components: {FeedPage, LoginPage}
}
</script>
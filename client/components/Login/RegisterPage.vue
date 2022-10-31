<template>
  <main>
    <section>
      <header>
        <h2 class="welcome">New to Fritter?</h2>
      </header>
      <RegisterForm />
    </section>
    <section>
      <router-link
        to="/"
      >
        Back to Login
      </router-link>
    </section>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm,
  }
};
</script>

<style scoped>
.welcome {
  text-align: center;
  font-size: 85px; 
  margin-bottom: 0;
}

section {
  text-align: center;
}

</style>
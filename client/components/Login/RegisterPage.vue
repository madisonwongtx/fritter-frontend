<template>
  <main>
    <section>
      <header>
        <h2>New to Fritter?</h2>
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


<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <section>
      <LoginForm />
    </section>
    <section>
      Don't have an account?
      <router-link
        to="/register"
      >
        Sign up
      </router-link>
    </section>
  </main>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
};
</script>

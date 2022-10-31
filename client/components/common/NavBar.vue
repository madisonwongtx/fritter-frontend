<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <button class="button">
        <router-link 
          class="inside" 
          to="/"
        >
          Home🏠
        </router-link>
      </button>
      <button class="button">
        <router-link
          class="inside"
          v-if="$store.state.username"
          to="/profile"
        >
          Profile👤
        </router-link>
      </button>
      <button class="button">
        <router-link
          class="inside"
          v-if="$store.state.username"
          to="/follow"
        >
          Find Others🔍
        </router-link>
      </button>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: rgb(133, 226, 197);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.title {
    font-size: 36px;
    margin: 0 5px;
    font-weight: 2000;
    color: rgb(255, 255, 255)
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.button {
  background-color: rgb(252, 252, 252);
  color: rgb(105, 231, 199);
  padding: 5px;
  border-radius: 20px;
  border: none;
}

.inside{
  font-family: "Poppins";
  font-size: 18px;
  color: rgb(0, 2, 2);
  margin-left: 5px;
  margin-right: 5px;
  text-decoration: none;
}

.alerts {
    width: 25%;
}
</style>

<template>
  <article
    class="user"
  >
    <header>
      <h4 class="username">
        @{{ user.username }}
        <button
          v-if="follow"
        >
          Unfollow
        </button>
        <button
          v-else
        >
          Follow
        </button>
      </h4>
    </header>
  </article>
</template>

<script>

export default {
    name: 'FollowerComponent',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {follow: false};
    },
    mounted() {
      this.checkFollowing();
    },
    methods: {
      checkFollowing() {
        this.follow = this.$store.state.following.includes(this.user.username);
      }
    }
};
</script>

<style scoped>
.user {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>

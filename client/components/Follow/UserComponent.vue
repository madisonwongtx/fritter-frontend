<template>
  <article
    class="user"
  >
    <header>
      <h4 class="username">
        @{{ user.username }}
        <button
          v-if="follow"
          @click="unfollowUser"
        >
          Unfollow
        </button>
        <button
          v-else
          @click="followUser"
        >
          Follow
        </button>
      </h4>
    </header>
  </article>
</template>

<script>

export default {
    name: 'UserComponent',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        follow: false,
      };
    },
    mounted() {
      this.checkFollowing();
    },
    methods: {
      checkFollowing() {
        // this.follow = this.$store.state.following.includes(this.user.username);
        this.follow = false;
        for (const relation of this.$store.state.following) {
          if (relation.toFollow.username === this.user.username) {
            this.follow = true;
          }
        }
      },
      followUser() {
        const params = {
          method: 'POST',
          body: JSON.stringify({user: this.user.username}),
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully started following user!', status: 'success'
            });

          }
        };
        this.request(params);
        this.follow = true;
      },
      unfollowUser() {
        // console.log(this.user.username);
        const params = {
          method: 'DELETE',
          body: JSON.stringify({user: this.user.username}),
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully unfollowed user!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      async request(params) {
        /**
         * Submits a request to the follow's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request
         * @param params.callback - Function to run if the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }

        try {
          const r = await fetch('/api/follow', options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }

          this.$store.commit('refreshFollowing');
          this.$store.commit('refreshSuggested');
    
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
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

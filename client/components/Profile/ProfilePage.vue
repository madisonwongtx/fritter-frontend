<!-- Page for all items that deal with the user-->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Profile for @{{ $store.state.username }}</h2>
      </header>
    </section>
    <section class="options">
      <router-link
        v-if="$store.state.username"
        to="/memories"
      >
        <button>Memories 💫</button>
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/assessment"
      >
        <button>Good Framaritan Assessment 🧠</button>
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
        <button>Settings ⚙️</button>
      </router-link>
    </section>
    <div class="follow">
      <button
        @click="displayFollower"
      >
        Followers <br /> {{ $store.state.followers.length }}
      </button>
      <button
        @click="displayFollowing"
      >
        Following <br /> {{ $store.state.following.length }}
      </button>
    </div>
    <div
      v-if="showFollower"
      class="show"
    >
      <div
        v-if="$store.state.followers.length"
      >
        <UserComponent
          v-for="relationship in $store.state.followers"
          :key="relationship._id"
          :user="relationship.follower"
        />
      </div>
      <div
        v-else
      >
        You are have no followers 
      </div>
    </div>
    <div
      v-if="showFollowing"
      class="show"
    >
      <div
        v-if="$store.state.following.length"
      >
        <UserComponent
          v-for="relationship in $store.state.following"
          :key="relationship._id"
          :relationship="relationship"
          :user="relationship.toFollow"
        />
      </div>
      <div
        v-else
      >
        You are not following any users 
      </div>
    </div>
    <section>
      <h2>Your Contributions</h2>
      <section
        v-if="contributions.length"
      >
        <FreetComponent
          v-for="freet in contributions"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <section
        v-else
      >
        <h3>No posts yet!</h3>
      </section>
    </section>
  </main>
</template>

<script>

import FreetComponent from '@/components/Freet/FreetComponent.vue';
import UserComponent from '@/components/Follow/UserComponent.vue';

export default {
  name: 'ProfilePage',
  components: {
    FreetComponent,
    UserComponent
  },
  data() {
    return {
      contributions: [],
      showFollower: false,
      showFollowing: false
    };
  },
  created() {
    this.getContributions();
    this.getFollowers();
    this.getFollowing();
  },
  methods: {
    displayFollower() {
      if (this.showFollowing) {
        this.showFollowing = false;
      }
      this.showFollower = true;
    },
    displayFollowing() {
      if (this.showFollower) {
        this.showFollower = false;
      }
      this.showFollowing = true;
    },
    async getContributions(){
      const url = `/api/freets?author=${this.$store.state.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if(!r.ok) {
          throw new Error (res.error);
        }
        this.contributions = res;
      } catch (e) {
        this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async getFollowing() {
      const url = '/api/follow';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if(!r.ok) {
          throw new Error (res.error);
        }
        this.$store.commit('updateFollowing', res.follower);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async getFollowers() {
      const url = '/api/follow/followers';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if(!r.ok) {
          throw new Error (res.error);
        }
        this.$store.commit('updateFollowers', res.follower);
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
    font-size: 45px;
    margin-bottom: 0;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

.newPage {
  font-size: 20px;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.follow button {
  width: 150px;
  background-color: white;
  border-radius: 8px;
  border-width: 1px;
  width: 200px;
  border-style: dotted;
  font-family: "Poppins";
  font-weight: bold;
  font-size: 15px;
}

.show {
  margin-top: 5px;
  border-top-width: 5px;
}

.options {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.options button {
  font-family: "Poppins";
  font-size: 20px;
  background-color: rgb(169, 245, 226);
  border-radius: 8px;
  border-width: 0px;
  margin-bottom: 15px;
  margin-right: 5px;
}
</style>


<!-- want to be able to see all freets and interactions by user, have memories tab, have assessment tab
     view followers, view following, follow user -->
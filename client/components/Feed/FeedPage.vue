<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Home Feed
          </h2>
        </div>
        <div>
          <button
            class="button"
            v-if="$store.state.feed_filter"
            @click="switchFilter"
          >
            Show Interactions and Freets
          </button>
          <button
            class="button"
            v-else
            @click="switchFilter"
          >
            Show Freets Only
          </button>
        </div>
      </header>
      <section
        v-if="$store.state.feed.length"
      >
        <FeedComponent
          v-for="item in $store.state.feed"
          :key="item._id"
          :item="item"
        />
      </section>
      <article
        v-else
      >
        <h3>No feed found. Follow some users!</h3>
      </article>
    </section>
  </main>
</template>

<script>
import FeedComponent from '@/components/Feed/FeedComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';

export default {
  name: 'FeedPage',
  components: {FeedComponent, CreateFreetForm},
  data () {
    return {
      filter: this.$store.state.feed_filter
    }
  },
  created() {
    this.checkFeed();
    console.log(this.$store.state.feed);
  },
  methods: {
    checkFeed() {
        this.$store.commit('refreshFeed');
        this.$store.commit('refreshFeedFilter');
    }, 
    async switchFilter () {
      const url = '/api/filter';
      const params = {
        method: 'PUT',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully updated filter!', status: 'success'
          });
        }
      }
      const options = {method: params.method, headers: {'Content-Type': 'application/json'}};
      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if(!r.ok) {
          throw new Error (res.error);
        }
        this.$store.commit('refreshFeedFilter');
        this.$store.commit('refreshFeed');
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

.button {
  background-color: #ff9999;
  border: 3px solid #fa8072;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  margin:auto;
  width: 10em;
  height: 3em;
  font-size: 15px;
  font-family: "Poppins";
}


section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>

<!-- Template tells you waht it looks like and script is what it does -->
<template>
  <div>
    <button
      v-if="i_type !== 'heart'"
      style="background-color: white"
      @click="addInteraction('heart')"
    >
      ❤️
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      ❤️
    </button>

    <button
      v-if="i_type !== 'thumbs up'"
      style="background-color: white"
      @click="addInteraction('thumbs up')"
    >
      👍
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      👍
    </button>

    <button
      v-if="i_type !== 'thumbs down'"
      style="background-color: white"
      @click="addInteraction('thumbs down')"
    >
      👎 
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      👎
    </button>

    <button
      v-if="i_type !== 'happy'"
      style="background-color: white"
      @click="addInteraction('happy')"
    >
      😁
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      😁
    </button>

    <button
      v-if="i_type !== 'sad'"
      style="background-color: white"
      @click="addInteraction('sad')"
    >
      😢
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      😢
    </button>

    <button
      v-if="i_type !== 'angry'"
      style="background-color: white"
      @click="addInteraction('angry')"
    >
      😡
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      😡
    </button>

    <button
      v-if="i_type !== 'clapping'"
      style="background-color: white"
      @click="addInteraction('clapping')"
    >
      👏
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      👏
    </button>

    <button
      v-if="i_type !== 'laughing'"
      style="background-color: white"
      @click="addInteraction('laughing')"
    >
      😂
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      😂
    </button>

    <button
      v-if="i_type !== 'dead'"
      style="background-color: white"
      @click="addInteraction('dead')"
    >
      💀
    </button>
    <button
      v-else
      style="background-color:#ff9999"
      @click="deleteInteraction"
    >
      💀
    </button>
  </div>
</template>

<script>
export default {
  name: 'InteractionBar',
  props: {
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      i_type: '',
      any: false
    }
  },
  mounted () {
    this.checkInteraction();
  },
  methods: {
    checkInteraction() {
      this.$store.commit('refreshInteractions');
      this.any = false;
      this.i_type = '';
      for (const i of this.$store.state.interactions) {
        if (i.freet._id === this.freet._id) {
          this.i_type = i.interaction;
          this.any = true;
        }
      }
    },
    addInteraction(interaction_type) {
      if (this.any) {
        this.changeInteraction(interaction_type);
        return;
      } else {
        const params = {
          method: 'POST',
          body: JSON.stringify({interaction_type: interaction_type}),
          callback: () => {
            this.i_type = interaction_type;
            this.any = true;
            this.$store.commit('alert', {
              message: 'Successfully created interaction!', status: 'success'
            });
          }
        }
        this.request(params);
      }
    },
    changeInteraction(interaction_type) {
      const params = {
        method: 'PUT',
          body: JSON.stringify({interaction_type: interaction_type}),
          callback: () => {
            this.i_type = interaction_type;
            this.any = true;
            this.$store.commit('alert', {
              message: 'Successfully changed interaction!', status: 'success'
            });
          }
      }
      this.request(params);
     
    },
    deleteInteraction() {
      const params = {
        method: 'DELETE',
        callback: () => {
          this.i_type = '';
          this.any = false;
          this.$store.commit('alert', {
            message: 'Successfully deleted interaction!', status: 'success'
          });
        }
      };
      this.request(params)
    },
    async request(params) {
      /**
       * Submits a request to the interaction endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };

      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch (`/api/interactions/${this.freet._id}`, options);
        if(!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshInteractions');
        this.checkInteraction();
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
button {
  background-color: white;
  border: none;
  border-radius: 100px;
  border-width: 1px;
  font-size: 20px;
  margin-right: 0px;
  width: 2em;
}
</style>
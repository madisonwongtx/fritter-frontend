<!-- Template tells you waht it looks like and script is what it does -->
<template>
  <div>
    <button
      v-if="!like"
      @click="addInteraction('like')"
      style="background-color: aliceblue"
    >
      ❤️
    </button>
    <button
      v-else
      @click="deleteInteraction"
      style="background-color:aquamarine"
    >
      ❤️
    </button>
<!-- 
    <button
      v-if="!thumbsup"
      @click="addInteraction('thumbsup')"
    >
      👍
    </button>
    <button
      v-if="thumbsup"
      @click="deleteInteraction"
    >
      👍 Undo
    </button>

    <button
      v-if="!thumbsdown"
      @click="addInteraction('thumbsdown')"
    >
      👎 
    </button>
    <button
      v-if="thumbsdown"
      @click="deleteInteraction"
    >
      👎 Undo
    </button>

    <button
      v-if="!happy"
      @click="addInteraction('happy')"
    >
      😁
    </button>
    <button
      v-if="happy"
      @click="deleteInteraction"
    >
      😁 Undo
    </button>

    <button
      v-if="!sad"
      @click="addInteraction('sad')"
    >
      😢
    </button>
    <button
      v-if="sad"
      @click="deleteInteraction"
    >
      😢 Undo
    </button>

    <button
      v-if="!angry"
      @click="addInteraction('angry')"
    >
      😡
    </button>
    <button
      v-if="angry"
      @click="deleteInteraction"
    >
      😡 Undo
    </button>

    <button
      v-if="!clapping"
      @click="addInteraction('clapping')"
    >
      👏
    </button>
    <button
      v-if="clapping"
      @click="deleteInteraction"
    >
      👏 Undo
    </button>

    <button
      v-if="!laughing"
      @click="addInteraction('laughing')"
    >
      😂
    </button>
    <button
      v-if="laughing"
      @click="deleteInteraction"
    >
      😂 Undo
    </button>

    <button
      v-if="!dead"
      @click="addInteraction('dead')"
    >
      💀
    </button>
    <button
      v-if="dead"
      @click="deleteInteraction"
    >
      💀 Undo
    </button> -->
  </div>
</template>

<script>
export default {
  name: 'InteractionBar',
  data() {
    return {
      any: false, //Whether or not this freet has any interaction
      like: false,
      thumbsup: false,
      thumbsdown: false,
      happy: false,
      sad: false,
      angry: false,
      clapping: false,
      laughing: false,
      dead: false
    }
  },
  methods: {
    addInteraction(interaction_type) {
      if (this.any) {
        this.changeInteraction(interaction_type);
        return;
      } else {
        const params = {
          method: 'POST',
          body: JSON.stringify({interaction_type: interaction_type}),
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully created interaction!', status: 'success'
            });
          }
        };
        this.request(params);

        this.any = true;
        if(interaction_type === "like") {
          this.like = true;
        }
        if(interaction_type === "thumbsup") {
          this.thumbsup = true;
        }
        if(interaction_type === "thumbsdown") {
          this.thumbsdown = true;
        }
        if(interaction_type === "happy") {
          this.happy = true;
        }
        if(interaction_type === "sad") {
          this.sad = true;
        }
        if(interaction_type === "angry") {
          this.angry = true;
        }
        if(interaction_type === "clapping") {
          this.clapping = true;
        }
        if(interaction_type === "laughing") {
          this.laughing = true;
        }
        if(interaction_type === "dead") {
          this.dead = true;
        } 
      }
    },
    changeInteraction(interaction_type) {
      const params = {
        method: 'PUT',
          body: JSON.stringify({interaction_type: interaction_type}),
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully changed interaction!', status: 'success'
            });
          }
      }
      this.request(params);
      if(this.like) {
        this.like = false;
      }
      if(this.thumbsup) {
        this.thumbsup = false;
      }
      if(this.thumbsdown) {
        this.thumbsdown = false;
      }
      if(this.happy) {
        this.happy = false;
      }
      if(this.sad) {
        this.sad = false;
      }
      if(this.angry) {
        this.angry = false;
      }
      if(this.clapping) {
        this.clapping = false;
      }
      if(this.laughing) {
        this.laughing = false;
      }
      if(this.dead) {
        this.dead = false;
      }

      if(interaction_type === "like") {
        this.like = true;
      }
      if(interaction_type === "thumbsup") {
        this.thumbsup = true;
      }
      if(interaction_type === "thumbsdown") {
        this.thumbsdown = true;
      }
      if(interaction_type === "happy") {
        this.happy = true;
      }
      if(interaction_type === "sad") {
        this.sad = true;
      }
      if(interaction_type === "angry") {
        this.angry = true;
      }
      if(interaction_type === "clapping") {
        this.clapping = true;
      }
      if(interaction_type === "laughing") {
        this.laughing = true;
      }
       if(interaction_type === "dead") {
        this.dead = true;
      } 

    },
    deleteInteraction() {
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted interaction!', status: 'success'
          });
        }
      };
      this.request(params)
      this.any = false;
      if(this.like) {
        this.like = false;
      }
      if(this.thumbsup) {
        this.thumbsup = false;
      }
      if(this.thumbsdown) {
        this.thumbsdown = false;
      }
      if(this.happy) {
        this.happy = false;
      }
      if(this.sad) {
        this.sad = false;
      }
      if(this.angry) {
        this.angry = false;
      }
      if(this.clapping) {
        this.clapping = false;
      }
      if(this.laughing) {
        this.laughing = false;
      }
      if(this.dead) {
        this.dead = false;
      }
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
        this.$store.commit('refreshFreets');
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
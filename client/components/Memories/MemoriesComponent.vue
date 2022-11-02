<template>
  <article class="item">
    <section v-if="!isInteraction">
      <header>
        <h3 class="author">
          @{{ author }}
        </h3>
        <div
          v-if="$store.state.username === author"
          class="actions"
        >
          <button
            v-if="editing"
            @click="submitEdit"
          >
            ✅ Save changes
          </button>
          <button
            v-if="editing"
            @click="stopEditing"
          >
            🚫 Discard changes
          </button>
          <button
            v-if="!editing"
            @click="startEditing"
          >
            ✏️ Edit
          </button>
          <button @click="deleteFreet">
            🗑️ Delete
          </button>
        </div>
      </header>
      <textarea
        v-if="editing"
        class="content"
        :value="draft"
        @input="draft = $event.target.value"
      />
      <p
        v-else
        class="content"
      >
        {{ item ? item.content : '' }}
      </p>
      <p class="info">
        Posted at {{ date }}
        <i v-if="item.edited">(edited)</i>
      </p>
      <div v-if="$store.state.username !== null">
        <InteractionBar
          v-if="!editing"
          :freet="item" 
        />
      </div>
      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </section>
    <section v-else>
      <header>
        <h5 v-if="item.interaction==='heart'">
          Interacted with ❤️ by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='thumbs up'">
          Interacted with 👍 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='thumbs down'">
          Interacted with 👎 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='happy'">
          Interacted with 😁 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='sad'">
          Interacted with 😢 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='angry'">
          Interacted with 😡 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='clapping'">
          Interacted with 👏 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='laughing'">
          Interacted with 😂 by @{{ item.user.username }}
        </h5>
        <h5 v-if="item.interaction==='dead'">
          Interacted with 💀 by @{{ item.user.username }}
        </h5>
        
        <h3 class="author">
          @{{ author }}
        </h3>
        <div
          v-if="$store.state.username === author"
          class="actions"
        >
          <button
            v-if="editing"
            @click="submitEdit"
          >
            ✅ Save changes
          </button>
          <button
            v-if="editing"
            @click="stopEditing"
          >
            🚫 Discard changes
          </button>
          <button
            v-if="!editing"
            @click="startEditing"
          >
            ✏️ Edit
          </button>
          <button @click="deleteFreet">
            🗑️ Delete
          </button>
        </div>
      </header>
      <textarea
        v-if="editing"
        class="content"
        :value="draft"
        @input="draft = $event.target.value"
      />
      <p
        v-else
        class="content"
      >
        {{ item.freet.content }}
      </p>
      <p class="info">
        Posted at {{ date }}
        <i v-if="item.freet.edited">(edited)</i>
      </p>
      <div v-if="$store.state.username !== null">
        <InteractionBar
          v-if="!editing"
          :freet="item.freet" 
        />
      </div>
      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </section>
  </article>
</template>

<script>
import InteractionBar from '@/components/Interactions/InteractionBar.vue';
import moment from 'moment';


export default {
    name: 'MemoriesComponent',
    components: {InteractionBar},
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return { 
        isInteraction: false,
        author: '',
        editing: false,
        date: '',
        draft: '',
        alerts: {},
        freet: null,
      };
    },
    mounted () {
      this.checkType();
      this.convertDate();
    },
    methods: {
      checkType() {
        if ((typeof this.item === 'object') && ('freet' in this.item)) {
          this.isInteraction = true;
          this.author = this.item.freet.authorId.username;
          this.date = this.item.dateCreated;
          this.freet = this.item.freet;
        } else {
          this.isInteraction = false;
          this.author = this.item.authorId ? this.item.authorId.username : '';
          this.draft = this.item.content;
          this.freet = this.item;
          this.date = this.item.dateModified;
        }
      },
      convertDate () {
        this.date = moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
      },
      startEditing() {
        /**
         * Enables edit mode on this freet.
         */
        this.editing = true; // Keeps track of if a freet is being edited
        this.draft = this.freet.content; // The content of our current "draft" while being edited
      },
      stopEditing() {
        /**
         * Disables edit mode on this freet.
         */
        this.editing = false;
        this.draft = this.freet.content;
      },
      deleteFreet() {
        /**
         * Deletes this freet.
         */
        const params = {
          method: 'DELETE',
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully deleted freet!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      submitEdit() {
        /**
         * Updates freet to have the submitted draft content.
         */
        if (this.freet.content === this.draft) {
          const error = 'Error: Edited freet content should be different than current freet content.';
          this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
          setTimeout(() => this.$delete(this.alerts, error), 3000);
          return;
        }

        const params = {
          method: 'PATCH',
          message: 'Successfully edited freet!',
          body: JSON.stringify({content: this.draft}),
          callback: () => {
            this.$set(this.alerts, params.message, 'success');
            setTimeout(() => this.$delete(this.alerts, params.message), 3000);
          }
        };
        this.request(params);
      },
      async request(params) {
        /**
         * Submits a request to the freet's endpoint
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
          const r = await fetch(`/api/freets/${this.freet._id}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }

          this.editing = false;
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

<style scoped>

.item {
    border: 1px solid #111;
    border-style: dashed;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1.5em;
    position: relative;
}

.bottom {
  display: flex;
  flex-direction: row;
}

.actions button {
  border-radius: 18px;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.actions{
  /* how do i put on right side */
}

.content {
  font-weight: bold;
  width: 100em;
  font-family: "Poppins";
}
</style>

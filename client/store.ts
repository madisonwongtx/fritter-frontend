import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    feed: [], //feed for the logged in user
    feed_filter: false, //false for off and true for on
    username: null, // Username of the logged in user
    memories: [], //Memories for the logged in user
    following: [], //usernames of the users the current session user is following
    followers: [], //usernames of the users that follow the current session user
    suggested: [], //usernames that the user does not currently follow
    interactions: [], //all interactions made by the current session user
    quiz: null, //last quiz attempt
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0, //0 is unanswerd, 1 is acceptable, 2 is unacceptable
    question5: 0,
    question6: 0,
    question7: 0,
    question8: 0,
    score: 0,
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    async refreshFollowing(state) {
      const url = '/api/follow';
      const res = await fetch(url).then(async r => r.json());
      state.following = res.follower;
    },
    updateFeed(state, feed) {
      /**
       * Update the stored freets to the provided freets.
       * @param feed - Freets/interactions to store
       */
      state.feed = feed;
    },
    updateMems(state, memories) {
      /**
       * Update the stored freets to the provided freets.
       * @param memories - Freets/interactions to store
       */
      state.memories = memories;
    },
    updateFollowing(state, relationships) {
      /**
       * Updates the stored following to the provided following
       * @param usernames - users that the current session user follows
       */
      state.following = relationships;
    },
    updateFollowers(state, relationships) {
      /**
       * Updates the stored following to the provided following
       * @param usernames - users that the current session user follows
       */
      state.followers = relationships;
    },
    async refreshSuggested(state) {
      const url = '/api/follow/suggested';
      const res = await fetch(url).then(async r => r.json());
      state.suggested = res.result;
    },
    async refreshInteractions(state) {
      const url = '/api/interactions';
      const res = await fetch(url).then(async r => r.json());
      state.interactions = res.result;
    },
    updateFeedFilter(state, status) {
      state.feed_filter = status;
    },
    async refreshFeedFilter(state) {
      const url = '/api/filter';
      const res = await fetch(url).then(async r => r.json());
      state.feed_filter = res.result;
    },
    async refreshFeed(state) {
      const url = '/api/follow/feed';
      const res = await fetch(url).then(async r => r.json());
      // console.log(res.feed);
      state.feed = res.feed;
    },
    updateQuiz(state, questions) {
      state.quiz = questions;
    },
    updateQuestion2(state, answer) {
      state.question2 = answer;
    },  
    updateQuestion3(state, answer) {
      state.question3 = answer;
    }, 
    updateQuestion4(state, answer) {
      state.question4 = answer;
    }, 
    updateQuestion5(state, answer) {
      state.question5 = answer;
    }, 
    updateQuestion6(state, answer) {
      state.question6 = answer;
    }, 
    updateQuestion7(state, answer) {
      state.question7 = answer;
    }, 
    updateQuestion8(state, answer) {
      state.question8 = answer;
    }, 
    updateQuestion1(state, answer) {
      state.question1 = answer;
    },
    async refreshScore(state) {
      const url = '/api/assessment/score';
      const res = await fetch(url).then(async r => r.json());
      state.score = res.score;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;

<template>
  <main>
    <section>
      <header>
        <h1>Follow Page</h1>
      </header>
      <div>
        <CreateFollowForm
          value="username"
          placeholder="🔍 User to follow"
          button="Follow"
        />
      </div>
      <section>
        <h3>Suggested Users to Follow</h3>
        <section
          v-if="$store.state.suggested.length"
        >
          <UserComponent
            v-for="user in $store.state.suggested"
            :key="user._id"
            :user="user"
          />
        </section>
        <section
          v-else
        >
          You are following all other users.
        </section>
      </section>
    </section>
  </main>
</template>

<script>
import CreateFollowForm from '@/components/Follow/CreateFollowForm.vue';
import UserComponent from '@/components/Follow/UserComponent.vue';

export default {
  name: 'FollowPage',
  components: {
    CreateFollowForm,
    UserComponent
  },
  mounted (){
    this.updateSuggested();
  },
  methods: {
    updateSuggested() {
      this.$store.commit('refreshSuggested');
    }
  }
}
</script>

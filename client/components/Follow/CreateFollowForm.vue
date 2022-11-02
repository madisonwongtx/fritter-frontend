<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'CreateFollowForm',
  mixins: [InlineForm],
  methods: {
    async submit() {
      const params = {
        method: 'POST',
        body: JSON.stringify({user: this.value}),
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully started following user!', status: 'success'
          });
        }
      };
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch('/api/follow', options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('refreshFollowing');
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
  background-color:  #ff9999;
  font-family: "Poppins";
  border: 3px solid #fa8072;
  border-radius: 18px;
  width: 10em;
  margin-top: 1em;
  margin-left: 2em;
  font-size: 20px;
}

input {
  width: 20em;
  height: 3em;
  font-family: "Poppins";
  font-weight: bold;
}
</style>
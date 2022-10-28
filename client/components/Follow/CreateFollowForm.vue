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
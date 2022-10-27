<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFeedForm',
  mixins: [InlineForm],
  data () {
    return {
        url: '/api/follow/feed',
        method: 'GET',
        title: 'Get Home Feed',
        callback: () => {
            const message = 'Here is your feed!';
            this.$set(this.alerts, message, 'success');
            setTimeout(() => this.$delete(this.alerts, message), 3000);
        }
    };
  }
};
</script>
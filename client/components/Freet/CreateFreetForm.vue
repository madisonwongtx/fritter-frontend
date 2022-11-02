<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFreetForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Create a freet',
      refreshFreets: true,
      refreshFeed: true,
      callback: () => {
        this.$store.commit("refreshFeed");
        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

<style scoped>
form {
  border: 1px solid #111;
  border-style: dashed;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

.button{
  background-color: #ff9999;
  border-radius: 50px;
  border: none;
  text-decoration: none;
  width: 15em;
  height: 3em;
  font-family: "Poppins";
  border: 3px solid #fa8072;
  font-weight: bold;
}


textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>
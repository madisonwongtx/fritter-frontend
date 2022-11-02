<!-- Form for changing username (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangeUsernameForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''}
      ],
      title: 'Change username',
      callback: () => {
        const message = 'Successfully changed username!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

<style scoped>
form {
  border: 0px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  width: 20em;
  position: relative;
  font-size: 25px;
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

button {
  background-color: #ff9999;
  color: rgb(8, 12, 11);
  border-radius: 50px;
  text-decoration: none;
  width: 20em;
  height: 3em;
  font-size: 15px;
  font-family: "Poppins";
  border: 3px solid #fa8072;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>

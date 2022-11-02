<!-- Form for registering an account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RegisterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Create account',
      callback: () => {
        const message = 'Successfully created an account!';
        this.$router.push({name: 'Home'});
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
  margin-bottom: 14px;
  font-size: 25px;
  width: 300px;
  margin:auto;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

.button {
  background-color: #ff9999;
  color: rgb(8, 12, 11);
  border-radius: 50px;
  border: none;
  text-decoration: none;
  width: 13em;
  height: 3em;
  font-size: 15px;
  margin: auto;
  font-family: "Poppins";
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.6em 0;
}

form h3 {
  margin-top: 0;
  text-align: center;
  font-size: 35px;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>
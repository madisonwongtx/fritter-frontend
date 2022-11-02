<!-- Form for signing in (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/session',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Sign in',
      callback: () => {
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'You are now signed in!', status: 'success'
        });
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
  font-size: 25px;
  width: 20em;
  margin: auto;
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
  border: 3px solid #fa8072;
  text-decoration: none;
  margin:auto;
  width: 15em;
  height: 3em;
  font-size: 20px;
  font-family: "Poppins";
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: .6em 0;
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
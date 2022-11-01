<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteAccountForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'DELETE',
      setUsername: true,
      title: 'Delete account',
      fields: [],
      content: 'Deleting your account is permanent and irreversible. Proceed only if you understand these consequences.',
      callback: () => {
        this.$router.push({name: 'Home'}); // Goes to Home page after deleting account
        this.$store.commit('alert', {
          message: 'Your account has been deleted!', status: 'success'
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
  margin-bottom: 14px;
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
  width: 200px;
  height: 45px;
  font-size: 20px;
  font-family: "Poppins";
  border: 3px solid #fa8072;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}
</style>
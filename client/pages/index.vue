<template>
  <div>
    <h3 class="text-h3 mt-10">User Profile</h3>
    <h4 class="text-h4 mt-5">First name: {{ firstName }}</h4>
    <h4 class="text-h4 mt-5">Last name: {{ lastName }}</h4>
    <h4 class="text-h4 mt-5">Email: {{ email }}</h4>
  </div>
</template>

<script>
import * as axios from '~/utils/axios.ts';

export default {
  async asyncData() {
    const data = {
      firstName: '',
      lastName: '',
      email: '',
    };
    try {
      const { firstName, lastName, email } = await axios.get('api/users/me');
      data.firstName = firstName;
      data.lastName = lastName;
      data.email = email;
    } catch (ex) {
      console.error(ex);
    }
    return data;
  },
};
</script>

<template>
  <div>{{ message }}</div>
</template>

<script>
import * as axios from '~/utils/axios';

export default {
  async asyncData() {
    const { message } = await axios.get('api/auth');
    return { message };
  },
};
</script>

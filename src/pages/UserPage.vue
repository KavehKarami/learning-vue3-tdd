<template>
  <div data-testid="user-page">
    {{ user.username }}
  </div>
</template>

<script>
import services from "../api/api";
export default {
  data() {
    return {
      user: {},
    };
  },

  async mounted() {
    try {
      const { data: user } = await services.getUserById(this.$route.params.id);
      this.user = user;
    } catch (e) {
      console.log(e.message);
    }
  },
};
</script>

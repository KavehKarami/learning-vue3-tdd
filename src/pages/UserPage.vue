<template>
  <div data-testid="user-page">
    <ProfileCard :user="user" />
  </div>
</template>

<script>
import services from "../api/api";
import ProfileCard from "../components/ProfileCard.vue";
export default {
  name: "UserPage",
  components: { ProfileCard },
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

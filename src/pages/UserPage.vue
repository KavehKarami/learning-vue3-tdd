<template>
  <div data-testid="user-page">
    <ProfileCard v-if="!isLoading" :user="user" />
    <div v-if="isLoading" class="alert alert-secondary text-center">
      <BaseSpinner size="normal" />
    </div>
  </div>
</template>

<script>
import BaseSpinner from "../components/BaseSpinner.vue";
import services from "../api/api";
import ProfileCard from "../components/ProfileCard.vue";
export default {
  name: "UserPage",
  components: { ProfileCard, BaseSpinner },
  data() {
    return {
      user: {},
      isLoading: true,
    };
  },

  async mounted() {
    try {
      const { data: user } = await services.getUserById(this.$route.params.id);
      this.user = user;
    } catch (e) {
      console.log(e.message);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

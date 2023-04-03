<template>
  <div data-testid="activation-page">
    <div
      v-if="isSuccess"
      class="mt-3 alert alert-success"
      data-testid="success-message-box"
    >
      Account Activated Successful
    </div>
  </div>
</template>

<script>
import services from "../api/api.js";
export default {
  data() {
    return {
      isSuccess: false,
    };
  },

  async mounted() {
    try {
      await services.activate(this.$route.params.token);
      this.isSuccess = true;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

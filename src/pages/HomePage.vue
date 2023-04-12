<template>
  <div data-testid="home-page">
    <user-list />
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
export default {
  components: {
    UserList,
  },
};
</script>

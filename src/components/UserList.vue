<template>
  <div class="card">
    <div class="card-header">
      <h3>Users</h3>
    </div>

    <ul v-if="page.content.length" class="list-group list-group-flush">
      <li
        v-for="user in page.content"
        :key="user.id"
        class="list-group-item list-group-item-action"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>
<script>
import services from "../api/api.js";
export default {
  data() {
    return {
      page: {
        content: [],
        page: 0,
        size: 0,
        totalPages: 0,
      },
    };
  },
  mounted() {
    services
      .getUsers()
      .then((response) => (this.page = response.data))
      .catch((e) => console.log(e));
  },
};
</script>

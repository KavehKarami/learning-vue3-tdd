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
        @click="$router.push('/user/' + user.id)"
      >
        <UserListItem :user="user" />
      </li>
    </ul>
    <div class="card-footer text-center">
      <button
        v-if="page.page && !isLoading"
        class="btn btn-outline-secondary btn-sm float-start"
        @click="loadData(page.page - 1)"
      >
        &lt; previous
      </button>
      <button
        v-if="page.page + 1 < page.totalPages && !isLoading"
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(page.page + 1)"
      >
        next &gt;
      </button>

      <BaseSpinner v-if="isLoading" size="normal" />
    </div>
  </div>
</template>
<script>
import services from "../api/api.js";
import BaseSpinner from "./BaseSpinner.vue";
import UserListItem from "./UserListItem.vue";

export default {
  components: { UserListItem, BaseSpinner },

  data() {
    return {
      page: {
        content: [],
        page: 0,
        size: 0,
        totalPages: 0,
      },
      isLoading: true,
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    async loadData(page = 0) {
      try {
        this.isLoading = true;
        const { data: users } = await services.getUsers(page);
        this.page = users;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
li.list-group-item-action {
  cursor: pointer;
}
</style>

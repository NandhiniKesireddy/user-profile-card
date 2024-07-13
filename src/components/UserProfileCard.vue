<template>
  <v-container class="py-4">
    <UserSearch @search="handleSearch" @clear="clearUserData" class="mb-4" />
    <v-alert v-if="loading" type="info">Loading...</v-alert>

    <div v-else>
      <v-alert v-if="error" type="error">{{ error.message }}</v-alert>

      <div v-else-if="userDetails && Object.keys(userDetails).length">
        <v-card class="mb-4">
          <v-card-title class="text-xl font-semibold">
            User Name: {{ userDetails.name }}</v-card-title
          >
          <v-card-subtitle>Email : {{ userDetails.email }}</v-card-subtitle>
          <div class="flex justify-center">
            <v-img
              :src="`https://via.placeholder.com/150?text=${userDetails.username}`"
              alt="Profile Picture"
              class="mt-4"
              style="
                height: 500px;
                width: 90%;
                margin-left: 20px;
                margin-right: 20px;
              "
            />
          </div>
          <v-card-actions class="flex justify-center mt-4">
            <v-btn
              @click="togglePosts"
              class="mt-4 mx-auto"
              color="dark"
              style="
                margin-bottom: 10px;
                background-color: #1e88e5;
                color: white;
              "
            >
              Toggle Posts
            </v-btn>
          </v-card-actions>
        </v-card>

        <div v-if="showPosts" class="mt-4">
          <div v-for="post in userPosts" :key="post.id">
            <slot name="user-post" :post="post">
              <UserPost :post="post" />
            </slot>
          </div>
        </div>
      </div>
      <div v-else>
        <v-alert type="warning">No user data available</v-alert>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserSearch from "./UserSearch.vue";
import UserPost from "./UserPost.vue";

export default {
  components: {
    UserSearch,
    UserPost,
  },
  data() {
    return {
      userId: null,
      loading: false,
      showPosts: false,
    };
  },
  computed: {
    ...mapGetters("users", ["userDetails", "userPosts", "error"]),
  },
  methods: {
    ...mapActions("users", ["fetchUserDetails", "fetchUserPosts"]),
    async handleSearch(userId) {
      this.userId = userId;
      this.loading = true;
      await this.fetchUserDetails(userId);
      await this.fetchUserPosts(userId);
      this.loading = false;
    },
    togglePosts() {
      this.showPosts = !this.showPosts;
      this.$emit("toggle-posts", this.showPosts);
    },
    clearUserData() {
      this.$store.commit("users/CLEAR_USER_DATA");
      this.userId = null;
    },
  },
  mounted() {
    // Clear fetched data when the page loads
    this.$store.commit("users/CLEAR_USER_DATA");
  },
};
</script>

<style scoped>
/* Tailwind CSS styles */
.v-card {
  @apply shadow-lg rounded-lg border border-gray-200;
}
</style>

<template>
  <v-container fluid>
    <UserProfileCard @toggle-posts="handleTogglePosts">
      <template v-slot:user-post="{ post }">
        <UserPost :post="post" />
      </template>
    </UserProfileCard>
  </v-container>
</template>

<script>
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserPost from "@/components/UserPost.vue";
export default {
  name: "MainAppView",
  components: {
    UserProfileCard,
    UserPost,
  },
  methods: {
    handleTogglePosts(showPosts) {
      console.log("Posts visibility toggled:", showPosts);
    },
  },
};
</script>

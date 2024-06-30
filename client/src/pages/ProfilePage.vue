<template>
    <main-header></main-header>
    <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 10%">
      <q-card>
        <q-card-section style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 20%">
            <q-avatar>
              <img :src="user.avatarURL" alt="User Avatar">
            </q-avatar>
            <div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ user.name }}</div>
              <div class="text-caption text-black">
                <q-badge color="grey">Science</q-badge>
                <q-badge color="grey">Technology</q-badge>
              </div>
              <div class="text-caption">{{ user.description }}</div>
            </div>
          </div>
          <div>
            <q-btn color="black">Edit Profile</q-btn>
          </div>
        </q-card-section>
      </q-card>
  
      <div>
        <div class="text-h5">My Articles</div>
        <div class="text-caption">View all your articles</div>
      </div>
  
      <div v-for="article in articles" :key="article.id">
        <q-card>
          <q-card-section style="display: flex;">
            <div style="margin-right: 1%">
              <img :src="article.img" alt="Article Image">
            </div>
            <div>
              <div class="text-h6">{{ article.title }}</div>
              <div class="text-caption text-grey">{{ article.content }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <main-footer></main-footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import MainHeader from 'src/components/MainHeader.vue';
  import MainFooter from 'src/components/MainFooter.vue';
  import { auth } from '../store/auth';
  import  postsService  from '../services/posts';


  export default defineComponent({
    components: {
      MainHeader,
      MainFooter
    },
    ASYNC setup() {
        
      const user = auth.user;
      const { list } = postsService();
      const userArticles = await list();
      console.log(userArticles)
      return {
        user: user,
        articles: userArticles
        
      };
    },
  });
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  
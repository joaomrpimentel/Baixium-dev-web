<template>
  <div>
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
            <q-btn color="black" @click="showEditProfile = true">Edit Profile</q-btn>
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
      
      <!-- Edit Profile Dialog -->
      <q-dialog v-model="showEditProfile">
        <q-card style="width:40%;">
          <q-card-section>
            <div class="text-h6">Edit Profile</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="userName" label="Username" />
            <q-input v-model="currentPassword" type="password" label="Current Password" />
            <q-input v-model="newPassword" type="password" label="New Password" />
            <q-input v-model="confirmNewPassword" type="password" label="Confirm New Password" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="black" v-close-popup />
            <q-btn flat label="Save" color="black" @click="saveProfile" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import { auth } from '../store/auth';
import postsService from '../services/posts';

export default defineComponent({
  components: {
    MainHeader,
    MainFooter
  },
  setup() {
    const user = ref(auth.user);
    const showEditProfile = ref(false);
    const userName = ref(user.value?.name || '');
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const articles = ref([]);

    onMounted(async () => {
      const { list } = postsService();
      const userArticles = await list();
      articles.value = userArticles;
    });

    const saveProfile = () => {
      console.log('Username:', userName.value);
      console.log('Current Password:', currentPassword.value);
      console.log('New Password:', newPassword.value);
      console.log('Confirm New Password:', confirmNewPassword.value);
      showEditProfile.value = false;
    };

    return {
      user,
      showEditProfile,
      userName,
      currentPassword,
      newPassword,
      confirmNewPassword,
      articles,
      saveProfile
    };
  },
});
</script>

<style scoped>
/* Your styles here */
</style>

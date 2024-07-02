<template>
  <div>
    <main-header></main-header>
    <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 10%">
      <!-- Perfil do Usuário -->
      <q-card>
        <q-card-section style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 20%">
            <q-avatar>
              <img :src="user?.avatarURL" alt="User Avatar">
            </q-avatar>
            <div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ user?.name }}</div>
              <div class="text-caption text-black">
                <q-badge color="grey">Science</q-badge>
                <q-badge color="grey">Technology</q-badge>
              </div>
              <div class="text-caption">{{ user?.description }}</div>
            </div>
          </div>
          <div>
            <q-btn color="black" @click="showEditProfile = true">Edit Profile</q-btn>
          </div>
        </q-card-section>
      </q-card>
  
      <!-- Lista de Artigos do Usuário -->
      <div>
        <div class="text-h5">My Articles</div>
        <div class="text-caption">View all your articles</div>
      </div>
  
      <q-infinite-scroll @load="onLoad" :offset="250">
        <q-card v-for="article in readArticles" :key="article.id" class="clickable-card q-mb-md">
          <q-card-section @click="openDialog(article)">
            <div class="grey">{{ user?.name }}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ article.title }}</div>
            <div class="text-caption text-grey">
              {{ new Date(article.createdAt).toLocaleDateString() }}
            </div>
            <div class="text-caption text-grey">{{ article.tags }}</div>
            <div class="text-red text-weight-bold">
              <q-icon name="favorite" size="1.3rem" />
              {{ likes[article.id] || 0 }} LIKES
            </div>
          </q-card-section>
          <q-card-actions align="right" class="more-button">
            <q-btn flat round icon="more_horiz" @click="toggleMenu(article.id)"/>
            <q-menu v-model="menus[article.id]">
              <q-list>
                <q-item clickable v-close-popup @click="openEditDialog(article)">
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="openDeleteDialog(article)">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-card-actions>
        </q-card>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
  
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
  
      <!-- Detalhes do Artigo -->
      <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 75%;">
      <q-card-actions align="right">
        <q-btn flat round icon="close" @click="dialog = false" class="close-button" />
      </q-card-actions>

      <q-card-section>
        <div class="grey">{{ user?.name }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ selectedArticle.title }}</div>
        <div class="text-caption text-grey">
          {{ new Date(selectedArticle.createdAt).toLocaleDateString() }}
        </div>
        <div class="text-caption text-grey">{{ selectedArticle.tags }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body1">
          {{ selectedArticle.content }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="red" icon="favorite" @click="toggleLike(selectedArticle.id)">
          {{ likes[selectedArticle.id] || 0 }} Likes
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  
      <!-- Editar Artigo -->
      <q-dialog v-model="editDialog">
        <q-card class="q-pa-md" style="width: 75%;">
          <q-card-section>
            <div class="text-h6">Edit Article</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="selectedArticle.title" label="Title" />
            <q-input v-model="selectedArticle.content" label="Content" type="textarea" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save" @click="saveArticle" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <!-- Confirmar Exclusão do Artigo -->
      <q-dialog v-model="deleteDialog">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Confirm Deletion</div>
          </q-card-section>
          <q-card-section>
            Are you sure you want to delete this article?
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Delete" color="red" @click="confirmDeleteArticle" v-close-popup />
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

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string; // You may adjust this based on your actual date format
  tags: string[];
}

interface User {
  id: string;
  name: string;
  avatarURL: string;
  description: string;
}

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
    const articles = ref<Article[]>([]);
    const readArticles = ref<Article[]>([]);
    const likes = ref<{ [key: string]: number }>({});
    const selectedArticle = ref<Article>({ id: '', title: '', content: '', createdAt: '', tags: [] });
    const dialog = ref(false);
    const editDialog = ref(false);
    const deleteDialog = ref(false);
    const menus = ref<{ [key: string]: boolean }>({});

    onMounted(async () => {
      try {
        const userArticles = await postsService().listOnlyUsers(auth.user?.id || '1');
        articles.value = userArticles || [];
        onLoad();
      } catch (error) {
        console.error('Error fetching user articles:', error);
      }
    });

    const toggleLike = (id: string) => {
      if (!likes.value[id]) {
        likes.value[id] = 1;
        const likeResponse = postsService().sendLike(id);
        console.log(likeResponse);
      } else {
        console.warn('User already liked this article.');
      }
    };

    const openDialog = (article: Article) => {
      selectedArticle.value = article;
      dialog.value = true;
    };

    const openEditDialog = (article: Article) => {
      selectedArticle.value = { ...article };
      editDialog.value = true;
    };

    const openDeleteDialog = (article: Article) => {
      selectedArticle.value = article;
      deleteDialog.value = true;
    };

    const saveArticle = async () => {
      try {
        console.log(`Save article with id: ${selectedArticle.value.id}`);
        await postsService().edit(selectedArticle.value.id, selectedArticle.value);
        
        const index = articles.value.findIndex(article => article.id === selectedArticle.value.id);
        if (index !== -1) {
          articles.value[index] = { ...selectedArticle.value };
        }
        
        readArticles.value = articles.value.slice(0, readArticles.value.length);
      } catch (error) {
        console.error('Error updating article:', error);
      }
    };

    const confirmDeleteArticle = async () => {
      try {
        console.log(`Delete article with id: ${selectedArticle.value.id}`);
        await postsService().remove(selectedArticle.value.id);
        
        articles.value = articles.value.filter(article => article.id !== selectedArticle.value.id);
        readArticles.value = articles.value.slice(0, readArticles.value.length);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    };

    const onLoad = () => {
      readArticles.value = [...articles.value];
    };

    const toggleMenu = (id: string) => {
      menus.value[id] = !menus.value[id];
    };

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
      readArticles,
      likes,
      selectedArticle,
      dialog,
      editDialog,
      deleteDialog,
      menus,
      toggleLike,
      openDialog,
      openEditDialog,
      openDeleteDialog,
      saveArticle,
      confirmDeleteArticle,
      onLoad,
      toggleMenu,
      saveProfile
    };
  },
});
</script>

<style scoped>
/* Your styles here */
.clickable-card {
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.more-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.q-dialog .q-card {
  position: relative;
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}
</style>

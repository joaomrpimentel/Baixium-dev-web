<template>
  <main-header></main-header>
  <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 20%">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-card
        v-for="article in readArticles"
        :key="article.id"
        class="clickable-card q-mb-md"
      >
        <q-card-section @click="openDialog(article)">
          <div class="grey">{{ findUserName(article.userId) }}</div>
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
          <q-btn flat round dense icon="more_horiz" @click="toggleMenu(article.id)"/>
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
  </div>

  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 75%;">
      <q-card-actions align="right">
        <q-btn flat round icon="close" @click="dialog = false" class="close-button" />
      </q-card-actions>

      <q-card-section>
        <div class="grey">{{ findUserName(selectedArticle.userId) }}</div>
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

  <main-footer></main-footer>
</template>

<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import { onMounted, ref } from 'vue';
import postsService from '../services/posts';
import usersService from '../services/users';

export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
  },

  setup() {
    const articles = ref([]);
    const readArticles = ref([]);
    const likes = ref({});
    const users = ref([]);
    const dialog = ref(false);
    const editDialog = ref(false);
    const deleteDialog = ref(false);
    const selectedArticle = ref({});
    const menus = ref({});

    onMounted(async () => {
      try {
        const postsResponse = await postsService().list();
        const usersResponse = await usersService().list();

        users.value = usersResponse;
        articles.value = postsResponse;

        console.log('Users:', users.value);
        console.log('Articles:', articles.value);

        onLoad();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const toggleLike = (id) => {
      if (!likes.value[id]) {
        likes.value[id] = 1;
        const likeResponse = postsService().sendLike(id);
        console.log(likeResponse)
      } else {
        console.warn('User already liked this article.');
      }
    };

    const findUserName = (userId) => {
      if (!users.value) {
        console.warn('Users data is not loaded yet.');
        return 'Unknown';
      }
      const user = users.value.find((user) => user.id === userId);
      return user ? user.name : 'Unknown';
    };

    const openDialog = (article) => {
      selectedArticle.value = article;
      dialog.value = true;
    };

    const openEditDialog = (article) => {
      selectedArticle.value = { ...article };
      editDialog.value = true;
    };

    const openDeleteDialog = (article) => {
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

    const toggleMenu = (id) => {
      menus.value[id] = !menus.value[id];
    };

    const onLoad = () => {
      const start = readArticles.value.length;
      const end = start + 10;
      readArticles.value = [
        ...readArticles.value,
        ...articles.value.slice(start, end),
      ];
    };

    return {
      articles,
      readArticles,
      toggleLike,
      onLoad,
      dialog,
      editDialog,
      deleteDialog,
      findUserName,
      selectedArticle,
      openDialog,
      openEditDialog,
      openDeleteDialog,
      saveArticle,
      confirmDeleteArticle,
      likes,
      menus,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
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

<template>
  <main-header></main-header>
  <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 20%">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-card
        v-for="article in readArticles"
        :key="article.id"
        @click="openDialog(article)"
        class="clickable-card q-mb-md"
      >
        <q-card-section>
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
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>

  <q-dialog v-model="dialog">
    <q-card class="q-pa-md">
      <q-card-actions align="right">
        <q-btn
          flat
          round
          icon="close"
          @click="dialog = false"
          class="close-button"
        />
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
        <q-btn
          flat
          color="red"
          icon="favorite"
          @click="toggleLike(selectedArticle.id)"
        >
          {{ likes[selectedArticle.id] || 0 }} Likes
        </q-btn>
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
import usersService from '../services/users'; // Import usersService

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
    const selectedArticle = ref({});

    onMounted(async () => {
      const { list } = postsService();
      const usersResponse = await usersService().list(); // Fetch users
      const response = await list();
      users.value = usersResponse.data;
      articles.value = response;
      onLoad(); 
    });

    const toggleLike = (id) => {
      likes.value[id] = (likes.value[id] || 0) + 1;
    };

    const findUserName = (userId) => {
      const user = users.value.find((user) => user.id === userId);
      return user ? user.name : 'Unknown'; 
    };

    const openDialog = (article) => {
      selectedArticle.value = article;
      dialog.value = true;
    };

    const onLoad = () => {
      const start = readArticles.value.length;
      const end = start + 10;
      readArticles.value = [...readArticles.value, ...articles.value.slice(start, end)];
    };

    return {
      articles,
      readArticles,
      toggleLike,
      onLoad,
      dialog,
      findUserName,
      selectedArticle,
      openDialog,
      likes,
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

.q-dialog .q-card {
  position: relative;
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}
</style>

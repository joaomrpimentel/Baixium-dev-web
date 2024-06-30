<template>
  <main-header></main-header>
  <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 20%">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <q-card v-for="article in articles" :key="article.id" @click="openDialog(article)" class="clickable-card q-mb-md">
        <q-card-section>
          <div class="grey">{{ findUserName(article.userId) }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ article.title }}</div>
          <div class="text-caption text-grey">{{ new Date(article.createdAt).toLocaleDateString() }}</div>
          <div class="text-caption text-grey">{{ article.tags }}</div>
          <div class="text-red text-weight-bold"> <q-icon name="favorite" size="1.3rem"/> {{ article.likes || 0 }} LIKES  </div> 
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
        <q-btn flat round icon="close" @click="dialog = false" class="close-button" />
      </q-card-actions>

      <q-card-section>
        <div class="grey">{{ findUserName(selectedArticle.userId) }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ selectedArticle.title }}</div>
        <div class="text-caption text-grey">{{ new Date(selectedArticle.createdAt).toLocaleDateString() }}</div>
        <div class="text-caption text-grey">{{ selectedArticle.tags }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body1">
          {{ selectedArticle.content }}
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="red" icon="favorite" @click="toggleLike(selectedArticle.id)"> {{ selectedArticle.likes || 0 }} Likes </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <main-footer></main-footer>
</template>

<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter,
  },

  setup() {
    const articles = ref([]);
    const likes = ref({});
    const users = ref([]);
    const currentPage = ref(0);
    const dialog = ref(false);
    const selectedArticle = ref({});

    onMounted(async () => {
      try {
        const articlesResponse = await api.get(`articles?page=${currentPage.value}&limit=10`);
        const usersResponse = await api.get('users');

        articles.value = articlesResponse.data.map((article) => ({
          ...article,
          expanded: false,
        }));
        users.value = usersResponse.data;
      } catch (error) {
        console.error(error);
      }
    });

    const toggleLike = (id) => {
      likes.value[id] = (likes.value[id] || 0) + 1;
      // send this like to the server
    };

    const findUserName = (userId) => {
      const user = users.value.find((user) => user.id === userId);
      return user ? user.name : 'Unknown'; // in case user is not found
    };

    const openDialog = (article) => {
      selectedArticle.value = article;
      dialog.value = true;
    };

    const onLoad = (index, done) => {
      currentPage.value++;
      api.get(`articles?page=${currentPage.value}&limit=10`)
        .then((response) => {
          const newArticles = response.data.map((article) => ({
            ...article,
            expanded: false,
          }));
          articles.value = [...articles.value, ...newArticles];
          done();
        })
        .catch((error) => {
          console.error('Error loading more articles:', error);
          done();
        });
    };

    return {
      articles,
      toggleLike,
      findUserName,
      onLoad,
      dialog,
      selectedArticle,
      openDialog,
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

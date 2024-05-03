<template>
<main-header></main-header>
<div class="q-pa-md items-start q-gutter-md" style="margin: 0px 20%">
    <q-card v-for="article in articles" :key="article.id">
      <q-card-section>
        <div class="grey">{{ findUserName(article.userId) }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{article.title}}</div>
        <div class="text-caption text-grey">{{ new Date (article.createdAt).toLocaleDateString()}}</div>
        <div class="text-caption text-grey">{{article.tags}}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="red" icon="favorite"> {{ article.likes || 0 }} Likes </q-btn>

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="article.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="article.expanded = !article.expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="article.expanded">
          <q-separator />
          <q-card-section class="text-body1">
            {{ article.content }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
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

        onMounted(async () => {
        try {
            // por algum motivo list não tá funcionando, mas eu cansei... Depois alguém mexe
            const articlesResponse = await api.get('articles');
            const usersResponse = await api.get('users');

            // adicionar nos artigos a propriedade expanded para controlar a expansão dos artigos
            articles.value = articlesResponse.data.map((article) => ({
            ...article, 
            expanded: false, 
            }));
            articles.value = articlesResponse.data;
            users.value = usersResponse.data;
        } catch (error) {
            console.error(error);
        }
        });

        const toggleLike = (id) => {
        likes.value[id] = (likes.value[id] || 0) + 1; 
        // fazer o envio desse like
        };

        const findUserName = (userId) => {
        const user = users.value.find((user) => user.id === userId);
        return user ? user.name : 'Unknown'; // caso não tenha usuário
        };

        return {
        articles,
        toggleLike, 
        findUserName, 
        };
    },
    };
</script>
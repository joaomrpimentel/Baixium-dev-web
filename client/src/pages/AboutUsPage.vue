<template>
    <main-header></main-header>
    <q-body>
      <q-page>
        <q-container>
          <h4 style="text-align: center; margin-bottom: 20px;">Conheça nossa equipe</h4>
          <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://avatars.githubusercontent.com/u/136522676?v=4" />
              </q-avatar>
              <h5>João Marcos</h5>
            </div>
          <div class="row justify-center">
            <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://avatars.githubusercontent.com/u/69252647?v=4" />
              </q-avatar>
              <h5>Thalison Vinicius</h5>
            </div>
            <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://avatars.githubusercontent.com/u/57851959?v=4" />
              </q-avatar>
              <h5>Vinicius Caetano</h5>
            </div>
          </div>
        </q-container>
      </q-page>
    </q-body>
    <main-footer></main-footer>
</template>

<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import postsService from 'src/services/posts';
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'AboutUsPage',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
    methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
    },
    setup () {
        const posts = ref([]);
        const { list, remove } = postsService();
        const columns = [
            { name: 'id', field: 'id', label: 'id' },
            { name: 'author', field: 'author', label: 'author' },
            { name: 'actions', label: 'Actions', align: 'center'}
        ]

        const $q = useQuasar()

        onMounted(() => {
            getPosts()
        })

        const getPosts = async () => {
            try {
                const data = await list();
                console.log(data)
                posts.value = data
            } catch (error) {
                console.error(error);
            }
        }

        const handleDelete = async (id) => {
        try {
            $q.dialog({
            title: 'Deletar?',
            message: 'Deseja deletar esse post?',
            cancel: true,
            persistent: true
            }).onOk(async () => {
            await remove(id)
            $q.notify({message: 'Apagado com sucesso', icon: 'check', color: 'positive'})
            await getPosts()
            })
        } catch (error) {
            $q.notify({message: 'Erro ao apagar', icon: 'times', color: 'negative'})
        }
        }
        return { posts, columns, handleDelete }
    }
}
);

</script>

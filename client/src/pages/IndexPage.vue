<template>
    <main-header></main-header>
    <q-body>
      <div style="display: flex; justify-content: center; align-items: center; height: 70vh; flex-direction: column;">
        <div class="q-mt-sm">
          <h3>Welcome to Baixium</h3>
        </div>
        <div class="q-mt-sm">
            Share and explore knowledge with other students
        </div>
        <div class="q-mt-sm">
            <q-btn flat dense label="Sign Up" @click="navigateTo('register')" />
            <q-btn flat dense label="Login" @click="navigateTo('login')" />
        </div>
      </div>
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
    name: 'IndexPage',
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

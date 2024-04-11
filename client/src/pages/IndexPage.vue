<template>
    <q-header class="bg-grey-1 text-black" style="padding: 10px">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar square>
              <img src="https://cdn.discordapp.com/attachments/1227583527114248253/1227583583183573082/Baixium-logo.svg.svg?ex=6628ef4d&is=66167a4d&hm=d7cf8913c78feb2f1516fc8eb245cbda1355ae6715e4712fd9f9e8822c98b3f9&">
            </q-avatar>
            Baixium
          </q-toolbar-title>
          <div style="width: 13%" class="row justify-between">
            <div>
                <q-btn flat dense label="Create Post" @click="navigateTo('contacts')" />
            </div>
            <div>
                <q-btn flat dense label="Profile" @click="navigateTo('about')" />
            </div>
            <div>
                <q-btn flat dense label="Home" @click="navigateTo('home')" />
            </div>
          </div>
        </q-toolbar>
    </q-header>
    <q-body>
      <div style="display: flex; justify-content: center; align-items: center; height: 70vh; flex-direction: column;">
        <div class="q-mt-sm">
          <h3>Welcome to Baixium</h3>
        </div>
        <div class="q-mt-sm">
            Share and explore knowledge with other students
        </div>
        <div class="q-mt-sm">
            <q-btn flat dense label="Sing Up" @click="navigateTo('')" />
            <q-btn flat dense label="Login" @click="navigateTo('login')" />
        </div>
      </div>
    </q-body>
    <q-footer bordered class="bg-grey-1 text-primary">
    <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
        <q-tab name="About Us" label="About Us" />
        <q-tab name="Contact" label="Contact" />
        <q-tab name="Terms & Conditions" label="Terms & Conditions" />
    </q-tabs>
    </q-footer>
</template>

<script>
import postsService from 'src/services/posts';
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'IndexPage',
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

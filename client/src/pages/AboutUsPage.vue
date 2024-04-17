<template>
    <q-header class="bg-grey-1 text-black" style="padding: 10px">
        <q-toolbar>
          <q-toolbar-title>
            <div @click="navigateTo('home')" style="width: 100px; height: 50px;">
                <q-avatar square>
                    <img src="https://cdn.discordapp.com/attachments/1227583527114248253/1227583583183573082/Baixium-logo.svg.svg?ex=6628ef4d&is=66167a4d&hm=d7cf8913c78feb2f1516fc8eb245cbda1355ae6715e4712fd9f9e8822c98b3f9&" @click="navigateTo('home')">
                </q-avatar>
                Baixium 
          </div>
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
      <q-page>
        <q-container>
          <h4 style="text-align: center; margin-bottom: 20px;">Conheça nossa equipe</h4>
          <div class="row justify-center">
            <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/427935329_430913112848938_2370910870276119306_n.jpg?ccb=11-4&oh=01_ASARqEP9ZejTzW9KI8bUzwdlvdCieGm1vYZnsvGc_K2qkg&oe=662C22AB&_nc_sid=e6ed6c&_nc_cat=107" />
              </q-avatar>
              <h5>Thalison Vinicius</h5>
            </div>
            <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/427935329_430913112848938_2370910870276119306_n.jpg?ccb=11-4&oh=01_ASARqEP9ZejTzW9KI8bUzwdlvdCieGm1vYZnsvGc_K2qkg&oe=662C22AB&_nc_sid=e6ed6c&_nc_cat=107" />
              </q-avatar>
              <h5>João Marcos</h5>
            </div>
            <div class="col-3 text-center q-pa-md">
              <q-avatar size="250px" round>
                <img src="https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/427935329_430913112848938_2370910870276119306_n.jpg?ccb=11-4&oh=01_ASARqEP9ZejTzW9KI8bUzwdlvdCieGm1vYZnsvGc_K2qkg&oe=662C22AB&_nc_sid=e6ed6c&_nc_cat=107" />
              </q-avatar>
              <h5>Vinicius Caetano</h5>
            </div>
          </div>
        </q-container>
      </q-page>
    </q-body>
    <q-footer bordered class="bg-grey-1 text-primary">
    <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
        <q-tab name="About Us" label="About Us" @click="navigateTo('aboutUs')" />
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
    name: 'AboutUsPage',
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

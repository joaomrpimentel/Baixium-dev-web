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
    <div class="q-mt-lg" style="display: flex; justify-content: center; align-items: center; height: 70vh; flex-direction: column;">
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
        <q-page class="row items-center" style="margin: 0px 12%">
            <q-card class="q-pa-md shadow-2 my_card" bordered style="width:40%;">
            <q-card-section class="text-center">
                <div class="text-grey-9 text-h5 text-weight-bold">Sign Up</div>
                <div class="text-grey-8">Create an account below</div>
            </q-card-section>
            <q-card-section>
                <q-input dense outlined v-model="email" lazy-rules :rules="[this.required,this.isEmail]" label="Email Address"></q-input>
                <q-input dense outlined class="q-mt-md" v-model="name" type="text" lazy-rules :rules="[this.required]" label="Username" ></q-input>
                <q-input dense outlined class="q-mt-md" v-model="password" type="password" lazy-rules :rules="[this.required]" label="Password" ></q-input>
                <q-input dense outlined class="q-mt-md" v-model="password" type="password" lazy-rules :rules="[this.required]" label="Repeat your password" ></q-input>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8"> By creating an account, you agree to our
              <a href=" " class="text-dark text-weight-bold" style="text-decoration: none">Terms and Conditions</a></div>
            </q-card-section>
            <q-card-section>
                <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign Up" no-caps class="full-width"></q-btn>
            </q-card-section>
            </q-card>
        </q-page>
        </q-page-container>
    </q-layout>
    </div>
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

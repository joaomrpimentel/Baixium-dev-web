<template>
    <main-header></main-header>
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
                <q-input dense outlined v-model="email" lazy-rules :rules="[this.required,this.isEmail]" label="Email Address">
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
                <q-input dense outlined class="q-mt-md" v-model="name" type="text" lazy-rules :rules="[this.required]" label="Username" >
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input dense outlined class="q-mt-md" v-model="password" type="password" lazy-rules :rules="[this.required]" label="Password" >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
                <q-input dense outlined class="q-mt-md" v-model="password" type="password" lazy-rules :rules="[this.required]" label="Repeat your password" >
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
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
  <main-footer></main-footer>
</template>
<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import postsService from 'src/services/posts';
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'RegisterPage',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
    data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordFieldType: 'password',
      register: false,
      btnLabel: 'Login',
      visibility: false,
      visibilityIcon: 'visibility'
    }
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

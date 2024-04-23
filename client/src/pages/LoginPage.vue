<template>
  <main-header></main-header>
  <q-body>
    <div class="q-mt-lg" style="display: flex; justify-content: center; align-items: center; height: 70vh; flex-direction: column;">
      <q-layout view="lHh Lpr fff">
        <q-page style="margin: 0px 250px" class="row items-center">
          <div class="column q-pa-xm">
            <div class="row">
              <q-card square class="q-pa-md shadow-2 my_card" bordered style="width:600px;height:400px;">
                <q-card-section class="text-center">
                  <div class="text-grey-9 text-h5 text-weight-bold">Login</div>
                  <div class="text-grey-8">{{ randomTitle }}</div>
                  <q-fab color="black" @click="switchTypeFormAndNavigate" icon="add" class="absolute" style="top: 50px; right: 12px; transform: translateY(-50%);">
                  <q-tooltip>
                    Registration of a new user
                  </q-tooltip>
                  </q-fab>
                </q-card-section>
                <q-card-section>
                  <q-form>
                    <q-input ref="email" clearable v-model="email" type="email" lazy-rules :rules="[this.required,this.isEmail]" label="Email">
                      <template v-slot:prepend>
                        <q-icon name="email" />
                      </template>
                    </q-input>
                    <q-input ref="password" square clearable v-model="password" :type="passwordFieldType" lazy-rules :rules="[this.required]" label="Password">
                      <template v-slot:prepend>
                        <q-icon name="lock" />
                      </template>
                      <template v-slot:append>
                        <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer" />
                      </template>
                    </q-input>
                  </q-form>
                </q-card-section>
                <q-card-actions class="q-px-lg">
                  <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign Up" no-caps class="full-width"></q-btn>
                </q-card-actions>
                <q-card-section v-if="!register" class="text-center q-pa-sm">
                  <p class="text-grey-6">Forgot Password?</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
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
  name: 'LoginPage',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
  data () {
    return {
      titles: [
        'Welcome Back!',
        'Great to See You Again!',
        'Back to Our World!',
        'Happy to Have You Back!',
        'Welcome Back Once More!',
        'You\'ve Been Missed!',
        'Back to the Family!',
        'The Return of a Friend!',
        'Missed Your Presence!',
        'Reconnecting with Us!'
      ],
      title: 'Authorization',
      email: '',
      password: '',
      passwordFieldType: 'password',
      btnLabel: 'Login',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  computed: {
    randomTitle() {
      // Escolhe aleatoriamente um dos títulos do array titles
      return this.titles[Math.floor(Math.random() * this.titles.length)];
    }
  },
  methods: {
    // Muda a forma do do icone (faz um leve giro) e redireciona para a tela de cadastro
    switchTypeFormAndNavigate () {
      this.register = !this.register
      this.title = this.register ? 'New User' : 'Authorization'
      this.btnLabel = this.register ? 'Registration' : 'Login'
      setTimeout(() => {
        this.navigateTo('register');
    }, 600);
    },
    required (val) {
      return  (val && val.length > 0 || 'Field must be completed!')
    },
    diffPassword (val) {
       const val2 = this.$refs.password.value
       return (val && (val===val2) || 'Passwords do not match!')
     },
    isEmail (val) {
       const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
       return (emailPattern.test(val) || 'Enter a valid email')
     },
     submit () {
       if (this.register){
          this.$refs.email.validate()
          this.$refs.username.validate()
          this.$refs.password.validate()
          this.$refs.repassword.validate()
       } else {
          this.$refs.email.validate()
          this.$refs.password.validate()      
       }
       if (!this.register) 
         if (!this.$refs.email.hasError && (!this.$refs.password.hasError))
     {
       this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Logged in'
        })
     }
     },
    switchVisibility() {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon =  this.visibility ? 'visibility_off' : 'visibility'
    },
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
  },
  
}
);

</script>

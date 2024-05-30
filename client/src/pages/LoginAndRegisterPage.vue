<template>
  <main-header></main-header>
  <q-body>
    <div class="q-mt-lg" style="display: flex; justify-content: center; align-items: center; height: 70vh; flex-direction: column;">
      <q-layout view="lHh Lpr fff">
        <q-page class="row items-center" style="margin: 0px 12%">
              <q-card class="q-pa-md shadow-2 my_card" bordered style="width:40%;height:40%;">
                <q-card-section class="text-center">
                  <div class="text-grey-9 text-h5 text-weight-bold">{{ title }}</div>
                  <div v-if="!register" class="text-grey-8">{{ randomTitleLogin }}</div>
                  <div v-if="register" class="text-grey-8">{{ randomTitleRegister }}</div>
                </q-card-section>
                <q-card-section>
                  <q-fab color="black" @click="switchTypeForm" icon="add" class="absolute" style="top: 0; right: 12px; transform: translateY(-50%);">
                    <q-tooltip>
                      Registration of a new user
                    </q-tooltip>
                  </q-fab>
                  <q-form class="q-px-sm q-pt-xl">
                    <q-input ref="email" dense outlined v-model="email" type="email" lazy-rules :rules="[this.required,this.isEmail,this.short]" label="Email">
                      <template v-slot:prepend>
                        <q-icon name="email" />
                      </template>
                    </q-input>
                    <q-input ref="username" v-if="register" dense outlined v-model="username" lazy-rules :rules="[this.required,this.short]" type="username" label="User">
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                    <q-input  ref="password" dense outlined v-model="password" :type="passwordFieldType" lazy-rules :rules="[this.required,this.short]" label="Password"> 
                      <template v-slot:prepend>
                        <q-icon name="lock" />
                      </template>
                      <template v-slot:append>
                        <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer" />
                      </template>
                    </q-input>
                    <q-input ref="repassword" v-if="register" dense outlined v-model="repassword" :type="passwordFieldType" lazy-rules :rules="[this.required,this.short,this.diffPassword]" label="Repeat Password">
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
                  <q-btn style="border-radius: 8px;" color="dark" @click="submit" rounded size="md" :label="btnLabel" no-caps class="full-width" />
                  <q-card-section v-if="register" class="text-center q-pt-none">
                    <div class="text-grey-8"> By creating an account, you agree to our
                      <a href=" " class="text-dark text-weight-bold" style="text-decoration: none">Terms and Conditions</a></div>
                  </q-card-section>
                </q-card-actions>
                <q-card-section v-if="!register" class="text-center q-pa-sm">
                  <p class="text-grey-6">Forgot Password?</p>
                </q-card-section>
              </q-card>
        </q-page>
      </q-layout>
    </div>
  </q-body>
  <main-footer></main-footer>
</template>

<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import { auth } from '../store/auth'
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'LoginPage',
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
  data () {
    return {
      titlesLogin: [
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
      titlesRegister: [
      'Welcome to Our Community!',
      'Excited to Meet You!',
      'Joining Our Family!',
      'Happy to Have You Here!',
      'A New Beginning with Us!',
      'Starting Your Journey with Us!',
      'Welcome to Our World!',
      'Embarking on a New Adventure!',
      'Creating Memories Together!',
      'Building Something Special Together!'
      ],
      title: 'Log in',
      email: '',
      username: '',
      password: '',
      repassword: '',
      register: false,
      passwordFieldType: 'password',
      btnLabel: 'Login',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },
  computed: {
    randomTitleLogin() {
      // Escolhe aleatoriamente um dos títulos do array titlesLogin
      return this.titlesLogin[Math.floor(Math.random() * this.titlesLogin.length)];
    },
    randomTitleRegister() {
      // Escolhe aleatoriamente um dos títulos do array titles
      return this.titlesRegister[Math.floor(Math.random() * this.titlesRegister.length)];
    }
  },
  methods: {
    checkRegisterParam() {
      const registerParam = this.$route.query.register;
      this.register = registerParam === 'true';
      this.title = this.register ? 'Sign up' : 'Log in';
      this.btnLabel = this.register ? 'Sign up' : 'Log in';
    },
    required (val) {
      return  (val && val.length > 0 || 'Field must be completed!')
    },
    diffPassword (val) {
      const val2 = this.$refs.password.value
      return (val && (val===val2) || 'Passwords do not match!')
    },
    short(val) {
      return  (val && val.length > 3 || 'Password is too short')
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
        auth.isLoggedIn = true;
        this.navigateTo('feed-articles');
     }
     },
    switchTypeForm(){ 
      this.register = !this.register
      this.title = this.register ? 'Sign up' : 'Log in'
      this.btnLabel = this.register ? 'Sign up' : 'Log in'
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
  mounted() {
    this.checkRegisterParam(); // Verifica se estamos na parte de registro ou login
  },
  
}
);

</script>

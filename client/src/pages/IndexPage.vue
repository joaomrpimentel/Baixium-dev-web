<template>
  <main-header>
    <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@700&family=Arial:wght@400&display=swap" rel="stylesheet">
  </main-header>
  <q-body style="height: 100%; margin: 0; overflow: hidden;">
    <div style="display: flex; justify-content: space-between; align-items: center; height: 80vh; padding: 0 20rem; position: relative;">
      <div class="box" style="max-width: 60%; text-align: left; z-index: 2; padding: 1rem; border-radius: 0.5rem;">
        <h1 style="font-family: 'Georgia', serif; font-weight: 700; font-size: 4rem; margin: 0;">Welcome to Baixium</h1>
        <p style="font-family: 'Arial', sans-serif; font-weight: 400; font-size: 1.5rem; margin: 1rem 0;">Share and explore knowledge with other students.</p>
        <q-btn flat dense label="Sign Up" @click="navigateTo('register')" />
        <q-btn flat dense label="Login" @click="navigateTo('login')" />
      </div>
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 1;">
        <span v-for="letter in letters" :key="letter.id" :style="letter.style">B</span>
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
        if (routeName === 'login') {
          // Redirecionar para a parte de login da página de LoginAndRegisterPage
          this.$router.push({ name: 'login' })
        } else if (routeName === 'register') {
          // Redirecionar para a parte de registro da página de LoginAndRegisterPage
          this.$router.push({ name: 'login', query: { register: true } })
        }
      }
    },
    setup() {
      const posts = ref([]);
      const { list, remove } = postsService();
      const columns = [
        { name: 'id', field: 'id', label: 'id' },
        { name: 'author', field: 'author', label: 'author' },
        { name: 'actions', label: 'Actions', align: 'center' }
      ];

      const $q = useQuasar();

      onMounted(() => {
        getPosts();
        initializeLetters();
        setInterval(updateVisibility, 500); // Chama updateVisibility a cada 2 segundos
      });

      const getPosts = async () => {
        try {
          const data = await list();
          console.log(data);
          posts.value = data;
        } catch (error) {
          console.error(error);
        }
      };

      const handleDelete = async (id) => {
        try {
          $q.dialog({
            title: 'Deletar?',
            message: 'Deseja deletar esse post?',
            cancel: true,
            persistent: true
          }).onOk(async () => {
            await remove(id);
            $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' });
            await getPosts();
          });
        } catch (error) {
          $q.notify({ message: 'Erro ao apagar', icon: 'times', color: 'negative' });
        }
      };

      const letters = ref([]);
      const generateFixedPositionStyle = () => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        const box = {
          left: 20, 
          top: 20,
          width: 60,
          height: 40
        };

        // Verifica se está dentro de box
        if (x > box.left && x < box.left + box.width && 
            y > box.top && y < box.top + box.height) {
          return generateFixedPositionStyle();
        }

        return {
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          opacity: '1',
          transition: 'opacity 1s',
        };
      };

      const initializeLetters = () => {
        letters.value = Array.from({ length: 100 }, (_, id) => ({
          id,
          style: generateFixedPositionStyle(),
        }));
      };

      const updateVisibility = () => {
        letters.value = letters.value.map(letter => ({
          ...letter,
          style: {
            ...letter.style,
            opacity: Math.random() > 0.5 ? '1' : '0'
          }
        }));
      };

      return { posts, columns, handleDelete, letters };
    }
  });

</script>
  
<style>
  html, body {
      height: 100%;
      margin: 0;
      overflow: hidden;
  }
</style>

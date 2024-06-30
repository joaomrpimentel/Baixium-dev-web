<template>
    <main-header></main-header>
    <div class="q-pa-md items-start q-gutter-md" style="margin: 0px 10%">
      <q-card>
        <q-card-section style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 20%">
            <q-avatar>
              <img src="../assets/Baixium-logo.svg-1.svg">
            </q-avatar>
            <div>
              <div class="text-h5 q-mt-sm q-mb-xs">Baixium User</div>
              <div class="text-caption text-black">
                <q-badge color="grey">
                  Science
                </q-badge>
                <q-badge color="grey">
                  Technology
                </q-badge>
              </div>
              <div class="text-caption">Passionate about sharing knowledge</div>
            </div>
          </div>
          <div>
            <q-btn color="black" @click="showEditProfile = true">Edit Profile</q-btn>
          </div>
        </q-card-section>
      </q-card>
      
      <div>
        <div class="text-h5">My Articles</div>
        <div class="text-caption">View all your articles</div>
      </div>
      
      <div v-for="article in articles" :key="article.id">
        <q-card>
          <q-card-section style="display: flex;">
            <div style="margin-right: 1%">
              <img :src="article.img">
            </div>
            <div>
              <div>
                <div class="text-h6">{{ article.title }}</div>
                <div class="text-caption text-grey">{{ article.content }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      
      <!-- Edit Profile Dialog -->
      <q-dialog v-model="showEditProfile">
        <q-card style="width: 400px; max-width: 90%;">
          <q-card-section>
            <div class="text-h6">Edit Profile</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="userName" label="Username" />
            <q-input v-model="currentPassword" type="password" label="Current Password" />
            <q-input v-model="newPassword" type="password" label="New Password" />
            <q-input v-model="confirmNewPassword" type="password" label="Confirm New Password" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="black" v-close-popup />
            <q-btn flat label="Save" color="black" @click="saveProfile" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <main-footer></main-footer>
  </template>
  
  <script>
  import MainHeader from 'src/components/MainHeader.vue';
  import MainFooter from 'src/components/MainFooter.vue';
  
  export default {
    components: {
      'main-header': MainHeader,
      'main-footer': MainFooter,
    },
    data() {
      return {
        showEditProfile: false,
        userName: 'Baixium User',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        articles: [
          { id: 1, title: 'Article Title 1', content: 'Article Content 1', img: 'https://placehold.co/150' },
          { id: 2, title: 'Article Title 2', content: 'Article Content 2', img: 'https://placehold.co/150' },
          { id: 3, title: 'Article Title 3', content: 'Article Content 3', img: 'https://placehold.co/150' },
          { id: 4, title: 'Article Title 4', content: 'Article Content 4', img: 'https://placehold.co/150' },
          { id: 5, title: 'Article Title 5', content: 'Article Content 5', img: 'https://placehold.co/150' }
        ]
      };
    },
    methods: {
      saveProfile() {
        // Lógica para salvar as alterações do perfil :D
        console.log('Username:', this.userName);
        console.log('Current Password:', this.currentPassword);
        console.log('New Password:', this.newPassword);
        console.log('Confirm New Password:', this.confirmNewPassword);
        this.showEditProfile = false;
      },
    },
  };
  </script>
  

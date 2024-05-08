<template>
    <q-header class="bg-grey-1 text-black" style="padding: 10px">
        <q-toolbar>
          <q-toolbar-title>
            <div @click="navigateTo('home')" style="width: 100px; height: 50px;">
              <q-avatar square>
                <img src="../assets/Baixium-logo.svg-1.svg" @click="navigateTo('home')">
              </q-avatar>
              Baixium 
            </div>
          </q-toolbar-title>
          <div style="width: 13%" class="row justify-between">
            <div>
                <q-btn flat dense label="Create Post" @click="navigateTo('registerArticles')" />
            </div>
            <div>
                <q-btn flat dense label="Profile" @click="navigateTo('about')" />
            </div>
            <div>
                <q-btn flat dense label="Home" @click="navigateTo('feed-articles')" />
            </div>
          </div>
        </q-toolbar>
    </q-header>
</template>
<script>
export default {
  name: 'MainHeader',
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>


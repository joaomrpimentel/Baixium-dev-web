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
                <q-btn flat dense label="Create Post" @click="navigateTo('registerArticles')" />
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


<template>
    <q-header :class="{'dark-mode': isDark , 'light-mode': !isDark}" style="padding: 10px">
        <q-toolbar>
          <q-toolbar-title>
            <div @click="navigateTo('home')" style="width: 100px; height: 50px;">
              <q-avatar square>
                <img src="../assets/Baixium-logo.svg-1.svg" @click="navigateTo('home')">
              </q-avatar>
              Baixium
            </div>
          </q-toolbar-title>
          <div style="width: 18%" class="row justify-between">
            <div>
                <q-btn flat dense label="Create Post" @click="navigateTo('registerArticles')" />
            </div>
            <div>
                <q-btn flat dense label="Profile" @click="navigateTo('profile')" />
            </div>
            <div>
                <q-btn flat dense label="Home" @click="navigateTo('feed-articles')" />
            </div>
            <div>
                <dark-mode-toggle/>
            </div>
          </div>
        </q-toolbar>
    </q-header>
</template>
<script>

import DarkModeToggle from 'components/DarkModeToggle.vue';
export default {
  name: 'MainHeader',
  components: {
    DarkModeToggle
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
  },
  computed: {
    isDark() {
      return this.$q.dark.isActive
    }
  }
}
</script>


<template>
    <q-footer bordered class="bg-grey-1 text-primary">
        <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey-8" v-model="tab">
            <q-tab name="About Us" label="About Us" @click="navigateTo('aboutUs')" />
            <q-tab name="Contact" label="Contact" @click="navigateTo('contact')"/>
            <q-tab name="Terms & Conditions" label="Terms & Conditions"  @click="navigateTo('terms')"/>
        </q-tabs>
    </q-footer>
</template>
<script>
export default {
  name: 'MainFooter',
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>
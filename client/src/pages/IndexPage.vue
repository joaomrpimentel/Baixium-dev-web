<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';
export default defineComponent({
    name: 'IndexPage',
    setup () {
        const posts = ref([]);
        const columns = [
            { name: 'id', field: 'id', label: 'id' },
            { name: 'author', field: 'author', label: 'author' }
        ]
        onMounted(() => {
            getPosts()
        })

        const getPosts = async () => {
            try {
                const { data } = await api.get('posts');
                console.log(data)
                posts.value = data
            } catch (error) {
                console.error(error);
            }
        }
        return { posts, columns }
    }
}
);

</script>

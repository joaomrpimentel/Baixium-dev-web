<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="id"
    >

        <template v-slot:body-cell-actions="props">
        <q-td :props="props">
                <q-btn
                    align="center"
                    icon="delete"
                    @click="handleDelete(props.row.id)"
                    color="negative"
                />
            </q-td>
        </template>
    </q-table>
  </q-page>
</template>

<script>
import postsService from 'src/services/posts';
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'IndexPage',
    setup () {
        const posts = ref([]);
        const { list, post, update, remove } = postsService();
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

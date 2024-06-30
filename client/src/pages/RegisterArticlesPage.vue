<template>
    <main-header></main-header>
    
    <q-page class="">
        <h3 style="text-align: center; font-weight: bold;">Create a Post</h3>
        <div >
            <q-card style="width: 50%; margin: auto" >
                <q-form>
                    <q-card-section>

                        <sla style="font-weight: bold">Title</sla>
                        <q-input outlined v-model="title" placeholder="Enter post title"/>

                        <sla style="font-weight: bold">Content</sla>
                        <q-input outlined v-model="article_content" placeholder="Write your article here" type="textarea" rows="20" />

                    </q-card-section>
                    <q-card-actions>
                        <q-btn label="Post" @click="submit" :class="{'dark-mode full-width': !isDark , 'light-mode full-width': isDark}"/>
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </q-page>
    <main-footer></main-footer>
</template>
<script>
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
import postsService from 'src/services/posts';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { auth } from '../store/auth';

export default {
    components: {
        'main-header': MainHeader,
        'main-footer': MainFooter
    },
    computed: {
        isDark() {
            return this.$q.dark.isActive
        }
    },
    setup() {
        const user = ref(auth.user);
        const { post } = postsService();

        const createArticle = async (title, content, user) => {
            try {
                const data = await post({title: title, content: content, userid: user.id});
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        const $q = useQuasar();
        const title = ref('');
        const article_content = ref('');
        const submit = () => {
            createArticle(title.value, article_content.value, user.value.id);
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'edit',
                message: 'Post created successfully'
            });
        }
        
        return {
            title,
            article_content,
            submit
        }
    }
}


    
</script>


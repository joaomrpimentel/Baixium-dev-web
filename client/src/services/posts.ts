import useApi from '../composables/UseApi';

export default function postsService (){
    const{ list , post, remove } = useApi('posts');

    return{
        list,
        post,
        remove
    }
}
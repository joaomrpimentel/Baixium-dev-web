import useApi from '../composables/UseApi';

export default function postsService (){
    const{ list , post, remove } = useApi('articles');


    return{
        list,
        post,
        remove
    }
}
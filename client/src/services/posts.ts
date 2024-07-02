import useApi from '../composables/UseApi';

export default function postsService (){
    const{ list , post, remove } = useApi('articles');

    const sendLike = async (id: string | null) => {
        try {
          const { put } = useApi(`articles/${id}/like`);
          
          const  data  = await put();
          console.log(data)
          return data;
        } catch (error) {
          throw new Error('Error');
        }
      }

    const edit = async (id: string | null, form: any) => {
        try {
          const { put } = useApi(`articles/${id}`);
          
          const  data  = await put(form);
          console.log(data)
          return data;
        } catch (error) {
          throw new Error('Error');
        }
      }

    const listOnlyUsers = async (id: string | null) => {
        try {
          const { list } = useApi(`users/${id}/articles`);
          
          const  data  = await list();
          console.log(data)
          return data;
        } catch (error) {
          throw new Error('Error');
        }
      }

    return{
        list,
        post,
        remove,
        sendLike,
        edit,
        listOnlyUsers
    }
}
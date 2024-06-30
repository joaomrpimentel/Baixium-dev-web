import useApi from '../composables/UseApi';

export default function usersService() {
  const { list, post, remove } = useApi('users');
  
  const listUserArticles = async (id: string | null) => {
    try {
      const { list } = useApi(`users/${id}/articles`);
      
      const  data  = await list();
      console.log(data)
      return data;
    } catch (error) {
      throw new Error('erro');
    }
  }

  return {
    listUserArticles,
    list,
    post,
    remove,
  };
}

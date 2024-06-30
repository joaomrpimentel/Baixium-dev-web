import useApi from '../composables/UseApi';

export default function loginService (){
    const{ post } = useApi('users/login');

    return{
        post
    }
}
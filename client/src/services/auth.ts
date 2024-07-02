import useApi from '../composables/UseApi';

export function loginService (){
    const{ post } = useApi('/users/login');

    return{
        post
    }
}

export function registerService (){
    const{ post } = useApi('/users/register');

    return{
        post
    }
}
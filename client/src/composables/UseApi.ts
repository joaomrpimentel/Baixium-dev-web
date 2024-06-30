import { api } from '../boot/axios';

export default function useApi(url : string) {
    const list = async () => {
        try {
            const { data } = await api.get(url)
            console.log(data)
            return data
        } catch (error) {
            throw new Error('erro')
        }
    }

    const post = async (form : number) => {
        try {
            const { data } = await api.post(url, form)
            return data
        } catch (error) {
            throw new Error('erro')
        }
    }


    const remove = async (id : number) => {
        try {
            const { data } = await api.delete(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error('erro')
        }
    }
    
 



    return{
        list,
        post,
        remove
    }
}
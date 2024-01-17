import {defineStore} from "pinia";
import {ref} from "vue"
import axios from "axios"

export const useUserStore = defineStore("user",()=>{
  const userProfile = ref<any>({})
  const getUser = async () => {
    const { data } = await axios.get('http://localhost:5232/api/v1/Account/getProfile')
    userProfile.value = data.profile
  }

  return {userProfile,getUser}
})

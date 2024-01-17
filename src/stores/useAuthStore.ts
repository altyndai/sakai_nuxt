import { defineStore } from 'pinia'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { isJwtValid, tokenName } from '@/services/token'
import { useUserStore } from '@/stores/useUserStore'

export const useAuthStore = defineStore('auth',
    () => {
        const token: Ref<string | null> = ref(null)
        const isAuthenticate: ComputedRef = computed(() => token.value !== null)
        const userStore = useUserStore()
        const login = async (loginModel: any) => {

            try {
                const { data } = await axios.post('http://localhost:5232/api/v1/Account/login', loginModel)
                Object.assign(userStore.userProfile.value, data.profile)
                token.value = data.token as string
                axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
                Cookies.set(tokenName, token.value, { expires: 7 })
            }
            catch (error) {
                throw error
            }
        }

        const tryLogin = () => {
            const _jwtToken: string = Cookies.get(tokenName) as string
            if (!isJwtValid(_jwtToken)) {
                token.value = null

                return false
            }

            token.value = _jwtToken
            axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
            Cookies.set(tokenName, token.value, { expires: 7 })

            return true
        }
        const logout = () => {
            const router = useRouter()
            Cookies.remove(tokenName)
            token.value = null
            userStore.userProfile.value = null
            axios.defaults.headers.common.Authorization = ''
            router.push('/login/auth')
        }

        return { isAuthenticate, login, tryLogin, logout }
    })

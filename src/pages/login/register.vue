<script lang="ts" setup>
import axios from "axios";
import {useUserStore} from "~/stores/useUserStore";

definePageMeta({
  layout: 'login'
});
const router = useRouter()
const { $appState } = useNuxtApp();


const model = ref({
  email: '',
  password: '',
  userProfile: {
    firstName: '',
    lastName: '',
    patronymic: '',
  },
  checked: false
})

const userStore = useUserStore()
console.log(axios.defaults.headers.common.Authorization )

const submit = async () => {
  const { data } = await axios.post('http://localhost:5232/api/v1/Account/register', model.value)
  router.push("/")
}
const logoColor = computed(() => ($appState.darkTheme ? 'white' : 'dark'));
</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img :src="`/images/logo-${logoColor}.svg`" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;">
      </div>
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              Registration
            </div>
            <span class="text-600 font-medium">Sign up to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <div class="grid">
              <div class="col-6">
                <label for="email1" class="block text-900 text-xl font-medium mb-2">First name</label>
                <InputText
                  id="email1"
                  v-model="model.userProfile.firstName"
                  type="text"
                  class="w-full mb-3"
                  placeholder="First name"
                  style="padding:1rem; "
                />
              </div>
              <div class="col-6">
                <label for="email1" class="block text-900 text-xl font-medium mb-2">Last name</label>
                <InputText
                  id="email1"
                  v-model="model.userProfile.lastName"
                  type="text"
                  class="w-full mb-3"
                  placeholder="Last name"
                  style="padding:1rem;"
                />
              </div>
              <div class="col-12">
                <label for="email1" class="block text-900 text-xl font-medium mb-2">Patronymic</label>
                <InputText
                  id="email1"
                  v-model="model.userProfile.patronymic"
                  type="text"
                  class="w-full mb-3"
                  placeholder="Patronymic"
                  style="padding:1rem;"
                />
              </div>
              <div class="col-12">
                <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                <InputText
                  id="email1"
                  v-model="model.email"
                  type="text"
                  class="w-full mb-3"
                  placeholder="Email"
                  style="padding:1rem;"
                />
              </div>
              <div class="col-12">
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                <Password
                  id="password1"
                  v-model="model.password"
                  placeholder="Password"
                  :toggle-mask="true"
                  class="w-full mb-3"
                  input-class="w-full"
                  input-style="padding:1rem"
                />
              </div>
            </div>
            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="model.checked" :binary="true" class="mr-2" />
                <label for="rememberme1">I accept all terms & conditions</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Login now</a>
            </div>
            <Button @click="submit" label="Sign Up" class="w-full p-3 text-xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform:scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform:scale(1.6);
  margin-right: 1rem;
}
</style>

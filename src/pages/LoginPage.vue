<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div
          id="particles-js"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        ></div>
        <q-card
          class="login-form"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >
          <q-img
            src="https://www.mpfiltri.com/upload/images/b_MPFILTRI_header%20nuovo%20sito_07_2000x535_aziendatramonto-af6432.jpg"
          ></q-img>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h5 ellipsis">MP Filtri IOT (Beta)</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="loginVo.email"
                label="Username"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="loginVo.password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn
                  label="Login"
                  type="button"
                  color="primary"
                  glossy
                  style="width: 100%"
                  @click="loginFun"
                />
                <q-checkbox
                  v-model="checkboxState"
                  label="Do you agree with the terms & conditions?"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowReactive } from "vue";
import { useQuasar } from "quasar";
import { User } from "src/class/user";
import { useRouter, useRoute } from "vue-router";
const $q = useQuasar();
const username = ref("");
const password = ref("");
const checkboxState = ref(false);
const loginVo = shallowReactive(new User());
const router = useRouter();
const route = useRoute();
async function registerFun() {
  console.log(loginVo);
  try {
    const result = await loginVo.register();
    console.log(result.data.data);
    //save token
    if (result?.data.code === 200) {
      localStorage.setItem("token", result.data.data.token);
      router.push("/main");
    }
  } catch (error) {
    console.log(error);
  }

  //afte login change page
  // router.push();
  // await Router.a
}

async function loginFun() {
  try {
    const result = await loginVo.login();
    //save token
    if (result?.data.code === 200) {
      const token = result.data.data.token;
      if (token) {
        localStorage.setItem("token", token);
        router.push("/main");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function loginNotify() {
  if (username.value === "admin" && password.value === "admin") {
    localStorage.setItem("isLogin", "true");
    $q.notify({
      color: "positive",
      textColor: "white",
      message: "Login Successful",
      icon: "done_all",
    });
  } else {
    localStorage.setItem("isLogin", "false");
    $q.notify({
      color: "negative",
      message: "Login failed",
    });
  }
}
</script>

<style lang="scss" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #195ab6 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #103c4c 70%);
}
.login-form {
  position: absolute;
}
</style>

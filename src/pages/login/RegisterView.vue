<template>
  <!-- write register page -->
  <!-- page layout for login -->
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
          <!-- <q-img
              src="https://www.mpfiltri.com/upload/images/b_MPFILTRI_header%20nuovo%20sito_07_2000x535_aziendatramonto-af6432.jpg"
            ></q-img> -->
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h5 ellipsis">MP Filtri IOT (Beta)</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="">
              <q-input
                v-model="loginVo.username"
                label="Email"
                filled
                clearable
                lazy-rules
                :rules="[(val) => val.length > 0 || 'not empty']"
              />
              <q-input
                v-model="loginVo.password"
                label="Password"
                filled
                clearable
                lazy-rules
                :rules="[(val) => val.length > 0 || 'not empty']"
              />
              <q-input
                v-model="loginVo.password"
                label="Repeat Password"
                filled
                clearable
                lazy-rules
                :rules="[(val) => val.length > 0 || 'not empty']"
              />

              <div class="row">
                <q-input
                  class="col-8"
                  outlined
                  label="Submit"
                  color="primary"
                />
                <q-space />
                <q-btn
                  class="col-3"
                  label="Reset"
                  type="reset"
                  color="primary"
                ></q-btn>
                <p>get your email code</p>
              </div>

              <div class="row center"></div>

              <div>
                <q-btn
                  label="Register"
                  type="button"
                  color="primary"
                  glossy
                  style="width: 100%"
                  @click="loginFun"
                />
                <q-checkbox
                  v-model="checkboxState"
                  label="Do you agree with the terms & conditions ?"
                />
                <q-btn flat color="primary" dense>
                  Login in if you already had account</q-btn
                >
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
const loginVo = shallowReactive(new User());
</script>
<style scoped>
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

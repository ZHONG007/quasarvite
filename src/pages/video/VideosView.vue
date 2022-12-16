<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <!-- create card display for video display -->
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Video</div>
          </q-card-section>
          <q-card-section>
            <q-video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoplay
              controls
              width="100%"
              height="100%"
            />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowReactive } from "vue";
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

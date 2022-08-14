<template>
  <q-tabs v-model="tab" dense class="bg-grey-2 text-teal">
    <q-tab name="mails" label="Mails" />
    <q-tab name="alarms" label="Alarms" />
    <q-tab name="movies" label="Movies" />
  </q-tabs>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-3 ">
        <mobile-device-card></mobile-device-card>
      </div>
      <div class="col-3">
        <mobile-device-card></mobile-device-card>
      </div>
      <div class="col-3">
        <mobile-device-card></mobile-device-card>
      </div>
      <div class="col-3">
        <mobile-device-card></mobile-device-card>
      </div>
      <div class="col-3">
        <mobile-device-card></mobile-device-card>
      </div>
      <div class="col-3">
        <mobile-device-card></mobile-device-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import DeviceCard from "src/components/DeviceCard.vue";
import MobileDeviceCard from "src/components/mobile/MobileDeviceCard.vue";
import { ref } from "vue";
const tab = ref("mails");
</script>

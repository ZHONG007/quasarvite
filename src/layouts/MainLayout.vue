<template>
  <q-layout view="hhh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://www.pngitem.com/pimgs/m/11-115358_icon-of-a-cloud-with-the-letters-iot.png"
            />
          </q-avatar>
          MP Filtri IOT (Beta)
        </q-toolbar-title>
        <q-btn flat round icon="whatshot" />
        <q-btn flat round icon="message" />
        <q-btn flat round icon="fullscreen" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item to="/" active-class="q-item-no-link-highlighting" clickable>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Main Dashboard </q-item-section>
          </q-item>

          <q-item
            to="/bigdisplay"
            active-class="q-item-no-link-highlighting"
            clickable
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Devices </q-item-section>
          </q-item>

          <q-item to="/login" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Warning </q-item-section>
          </q-item>

          <q-item
            to="/bigdisplay"
            active-class="q-item-no-link-highlighting"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Rule </q-item-section>
          </q-item>

          <q-item
            to="/mobileindex"
            active-class="q-item-no-link-highlighting"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="phone" />
            </q-item-section>

            <q-item-section> Mobile </q-item-section>
          </q-item>
          <q-item
            to="/bigdisplay"
            active-class="q-item-no-link-highlighting"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Big Display </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

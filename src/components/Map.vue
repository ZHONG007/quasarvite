<template>
  <div id="#app">
    <VMap :accessToken="state.map.accessToken" :mapStyle="state.map.style" />
  </div>
  oooooooo
  <main class="w-screen h-screen">
    <v-map class="w-full h-full" :options="state.map" />
  </main>
</template>

<script>
import VMap from "v-mapbox";
import { reactive } from "vue";

export default {
  name: "App",
  components: {
    VMap,
  },
  setup() {
    const state = reactive({
      map: {
        accessToken:
          "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
        style: "mapbox://styles/mapbox/streets-v11?optimize=true",
        // style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: [-0.118092, 51.509865],
        zoom: 11,
        maxZoom: 32,
        crossSourceCollisions: false,
        failIfMajorPerformanceCaveat: false,
        attributionControl: false,
        preserveDrawingBuffer: true,
        hash: false,
        minPitch: 0,
        maxPitch: 60,
      },
    });

    return {
      state,
    };
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100px;
  height: 100px;
}
.w-screen {
  width: 100%;
}
.h-screen {
  height: 100%;
}
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
</style>

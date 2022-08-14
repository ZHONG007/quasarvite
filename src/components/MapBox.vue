<template>
  <div ref="mapContainer" style="width: 800px; height: 600px"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, shallowRef } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
const mapContainer = shallowRef<HTMLElement>();
onMounted(() => {
  mapboxgl.accessToken = `pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ`;
  const map = new mapboxgl.Map({
    container: mapContainer.value as HTMLElement,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-2.24, 53.48],
    zoom: 10,
    projection: "naturalEarth", // starting projection
  });

  const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat([-2.24, 53.48])
    .addTo(map);

  const marker2 = new mapboxgl.Marker().setLngLat([-2.24, 53.49]).addTo(map);
});
</script>

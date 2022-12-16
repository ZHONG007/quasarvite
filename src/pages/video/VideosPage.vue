<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="item in videoArray"
        :key="item.title"
        class="my-card col-3"
        flat
        bordered
      >
        <q-img
          :src="item.coverUrl"
        />
        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-caption text-grey">
            {{ item.description }}
            {{ item.createdAt }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <span> Looking for video: </span>
    <h1>{{ pageNo }}</h1>
    <button @click="goto(2)">跳转路由</button>
  </div>
</template>
<script lang="ts" setup>
import { Video } from "src/class/user";
import { onMounted, ref, shallowReactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
const route = useRoute();
const router = useRouter();
const videoArray = shallowReactive<Video[]>([]);
const pageNo = ref(route.params.id);
let page = 1;
function goto() {
  page++;
  router.push({ path: `/page/${page}` });
  pageNo.value = page.toString();
}

onMounted(async () => {
  await getVideos();
});

async function getVideos() {
  const res = await Video.getAllVideos();
  // const _videos = JSON.parse(videos);
  console.log(res.data);
  videoArray.push(...res.data);
}

async function deleteVideos() {
  const res = await Video.deleteAll();
  console.log(res);
}
</script>
<style lang="sass" scoped>
.my-card
  width: 80%
  max-width: 400px
</style>

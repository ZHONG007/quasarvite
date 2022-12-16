<template>
  <div>
    <h5>Create a video</h5>
    <q-card>
      <div class="row">
        <div class="col-12">
          <q-item-label header class="text-h6">Video Editor</q-item-label>
          <q-item class="full-width">
            <q-input
              outlined
              dense
              class="col-6"
              v-model="video.title"
              label="Video Title"
            />
          </q-item>
          <q-item class="full-width">
            <q-input
              outlined
              class="col-8"
              dense
              v-model="video.coverUrl"
              label="Video Cover Url"
            />
          </q-item>
          <q-item class="full-width">
            <q-input
              outlined
              class="col-8"
              dense
              v-model="video.description"
              label="Video Description"
            />
          </q-item>
          <q-item class="full-width">
            <q-input
              outlined
              class="col-3"
              dense
              v-model="singleTag"
              label="Tag"
            />
            <q-btn
              color="primary"
              @click="addStringTag"
              rounded
              label="Add Tag"
            />
          </q-item>
          <q-item>
            <p>Tags:</p>
            <template v-for="(item, i) in StringsTag" :key="item">
              <q-chip :v-model="true" removable @remove="remove(i)">{{
                item
              }}</q-chip>
            </template>
          </q-item>
          <q-item class="full-width">
            <q-space></q-space>
            <q-btn
              class="col-2"
              @click="save"
              color="primary"
              rounded
              label="Save Video"
            />
            <q-space></q-space>
          </q-item>
        </div>
      </div>
    </q-card>

    <div class="q-pa-md">
      <div>
        <q-input v-model="videoTag.content"></q-input>
        <q-btn @click="addTag">addTag</q-btn>
        <q-btn @click="getTags">getTags</q-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Video, VideoTag } from "src/class/user";
import { ref, shallowReactive } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const video = shallowReactive(new Video());
const videoTag = shallowReactive(new VideoTag());
const videoTagArray = shallowReactive<VideoTag[]>([]);
const StringsTag = shallowReactive<string[]>([]);
const videoTagsAdd = shallowReactive<VideoTag[]>([]);
const singleTag = ref<string>("");

//const nameRules = [(val: null|string) => (val && val.length > 0) || "Name is required"];
function addStringTag(): void {
  if(singleTag.value.length === 0) return;
  StringsTag.push(singleTag.value);
  console.log(StringsTag);
  singleTag.value = "";
}
function remove(i: number) {
  //remove ith element of array
  StringsTag.splice(i, 1);
  console.log("remove");
}
async function save() {
  console.log(video);
  const _tag = StringsTag.map((item) => {
    const tag = new VideoTag();
    tag.content = item;
    return tag;
  });
  console.log(_tag);
  video.videoTags.length = 0;
  video.videoTags.push(..._tag);
  console.log(video);
  try {
    await video.create();
  } catch (e) {
    console.log(e);
    return;
  }
}
function addTag() {
  console.log(videoTag);
  videoTag.create();
}
async function getTags() {
  console.log(videoTag);
  const res = await VideoTag.getAllVideoTags();
  videoTagArray.length = 0;
  videoTagArray.push(...res.data);
}
async function changeVideo() {
  const res = await Video.updateVideobyId(1);
  console.log(res.data);
}
</script>
<style lang="sass" scoped>
.my-card
  width: 80%
  max-width: 400px
</style>

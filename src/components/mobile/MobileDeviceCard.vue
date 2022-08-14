<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      ICM 2.0
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row">
        <div class="col-6">
          <!-- <q-avatar dense icon="directions" />87878 -->
          <q-input label="" dense readonly />
        </div>
        <div class="col-6">
          <q-input dense readonly v-model="text">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6">Serial No: 1630000</div>
        <div class="col-6">Model: ICM 2.0</div>
      </div>
      <div class="row">
        <div class="col-6">Iso Code: 18/16/15</div>
        <div class="col-6">Updated at: 2022/06/26</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="left">
      <q-btn dense flat>Action 1</q-btn>
      <q-btn dense flat>Action 2</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: false,
    default: "wifi",
  },
  bgColour: { type: String, required: false, default: "bg-primary" },
  titleText: { type: String, required: false, default: "title Text" },
  mainText: { type: String, required: false, default: "Main Text" },
});
const text = "device";

const lorem = "this is world";
</script>

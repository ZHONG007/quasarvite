<template>
  <q-card bordered>
    <q-item>
      <q-item-section avatar>
        <q-icon color="primary" name="wifi" />
      </q-item-section>

      <q-item-section>
        <q-item-label>ICM 2.0</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-8">
        <div>
          Serial no: 1630000 <br />
          Model: ICM 2.0 <br />Description: Machine A <br />
          Clealiness:16/15/12 <br />
          Status: <span class="text-success">Online</span>
        </div>
        <p></p>
      </q-card-section>

      <q-card-section class="col-4">
        <q-img
          :src="url"
          spinner-color="white"
          style="height: 90px; max-width: 150px"
        />
      </q-card-section>
    </q-card-section>

    <q-card-actions align="left">
      <q-btn flat round color="teal" label="Details" />
      <q-btn flat round color="secondary" label="Setting" />
      <q-btn flat round color="primary" label="Manage"  />
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

const lorem = "this is world";
const url = "https://www.mpfiltri.com/upload/prodotti/60/ICM2.0_1.jpg";
</script>

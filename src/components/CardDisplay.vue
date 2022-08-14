<template>
  <q-card class="text-white" :class="props.bgColour" >
    <div>
      <q-item>
        <q-item-section side>
          <q-icon size="30px" :name="props.icon" color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ props.titleText }}</q-item-label>
          <q-item-label class="text-h6">
            {{ props.mainText }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
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
</script>

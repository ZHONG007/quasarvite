<template>
  <q-page class="q-pa-sm">
    <p>group 1</p>
    <div class="row q-col-gutter-sm">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <card-display
              title-text="All Instruments"
              main-text="0"
              :bg-colour="bgColour"
              icon="hardware"
            ></card-display>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <card-display
              title-text="Good Instruments"
              main-text="0"
              bg-colour="bg-secondary"
              icon="work"
            ></card-display>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <card-display
              title-text="Warning"
              main-text="0"
              bg-colour="bg-warning"
              icon="warning"
            ></card-display>
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <card-display
              title-text="Information..."
              main-text="0"
              bg-colour="bg-positive"
              icon="info"
            ></card-display>
          </div>

          <div class="col-md-12 col-sm-12 col-xs-12">
            <pie-chart></pie-chart>
          </div>
        </div>
      </div>
      <div class="col">
        <map-box></map-box>
      </div>
    </div>

    <div class="q-gutter-sm">
      <q-radio v-model="shape" val="line" label="month" />
      <q-radio v-model="shape" val="rectangle" label="year" />
      <q-radio v-model="shape" val="ellipse" label="hour" />
      <q-radio v-model="shape" val="ellipse" label="week" />
    </div>
    <div>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <line-chart title-text="4um"></line-chart>
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <line-chart title-text="6um"></line-chart>
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12">
        <line-chart title-text="12um"></line-chart>
      </div>
    </div>

    <div class="row q-pa-sm">this is first page auto plugin {{ display }}</div>
    <div></div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MapBox from "src/components/MapBox.vue";
import InfoCard from "src/components/InfoCard.vue";
import CardDisplay from "src/components/CardDisplay.vue";
import PieChart from "src/components/echarts/PieChart.vue";
import LineChart from "src/components/echarts/LineChart.vue";
const display = ref(true);
const bgColour = ref("bg-primary");
const toggleDisplay = () => {
  bgColour.value = "bg-secondary";
};
const shape = ref("line");
</script>

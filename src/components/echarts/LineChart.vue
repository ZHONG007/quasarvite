<template>
  
  <div><v-chart class="chart" :option="option" /></div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, LineSeriesOption } from "echarts/charts";
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
]);

provide(THEME_KEY, "light");
const props = defineProps({
  titleText: { type: String, required: false, default: "title Text" },
});
const option = ref({
  title: {
    text: props.titleText,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      dataView: { readOnly: false },
      magicType: { type: ["line", "bar"] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value}",
    },
  },
  series: [
    {
      name: "Machine 1",
      type: "line",
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
      markLine: {
        data: [{ type: "average", name: "Avg" }],
      },
    },
    {
      name: "Machine 2",
      type: "line",
      data: [1, 0, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: "", value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: "average", name: "Avg" },
          [
            {
              symbol: "none",
              x: "90%",
              yAxis: "max",
            },
            {
              symbol: "circle",
              label: {
                position: "start",
                formatter: "Max",
              },
              type: "max",
              name: "",
            },
          ],
        ],
      },
    },
  ],
});
</script>
<style scoped>
.chart {
  height: 280px;
}
</style>

<template>
  <div class="panel-section">
    <div class="section-header">
      <div class="header-icon"></div>
      <span>养殖资源排名</span>
      <div class="header-line"></div>
    </div>
    <div class="panel-content">
      <div class="chart-container">
        <div class="chart-title">
          <span>{{ titleText }}</span>
          <div class="ranking-tabs">
            <span v-for="tab in tabs" :key="tab.type"
                  class="ranking-tab"
                  :class="{ active: currentType === tab.type }"
                  @click="switchType(tab.type)">
              {{ tab.label }}
            </span>
          </div>
        </div>
        <div id="branchRankingChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { branchRankingData } from '../data/branchData.js'

let chart = null
let autoSwitchInterval = null
const currentType = ref('cpu')
const tabs = [
  { type: 'cpu', label: '养殖' },
  { type: 'memory', label: '容量' },
  { type: 'storage', label: '存储' }
]
const titleText = ref('养殖能力核心数排名 TOP 15')

const typeNames = { cpu: '能力核心数', memory: '容量容量', storage: '存储容量' }
const typeUnits = { cpu: '核', memory: 'TB', storage: 'TB' }
const typeColors = {
  cpu: ['#002200', '#003311', '#004422', '#005533', '#006644', '#007755', '#008866', '#009977', '#00aa88', '#00bb99', '#00ccaa', '#00ddbb', '#00ffcc'],
  memory: ['#001412', '#002425', '#003438', '#00444b', '#00545f', '#006473', '#007487', '#00849b', '#0094af', '#00a4c3', '#00b4d7', '#00c4eb', '#00d4ff'],
  storage: ['#000044', '#000055', '#050066', '#0a0570', '#13107e', '#201b8c', '#2d269a', '#3a31a8', '#473cb6', '#5447c4', '#6152d2', '#6e5de0', '#7b68ee']
}

function updateChart(type) {
  if (!chart) return
  const data = branchRankingData[type]
  const sorted = [...data].sort((a, b) => b.value - a.value).slice(0, 15)
  const maxValue = sorted[0].value
  titleText.value = `养殖${typeNames[type]}排名 TOP 15`

  const option = {
    backgroundColor: 'transparent',
    grid: { top: 5, right: 72, bottom: 5, left: 95 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      max: maxValue * 1.15,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(0, 255, 204, 0.1)' } },
      // axisLabel: { color: '#6a8a9a', fontSize: 13, formatter: (v) => v >= 1000 ? (v/1000).toFixed(0)+'K' : v }
    },
    yAxis: {
      type: 'category',
      data: sorted.map(i => i.name).reverse(),
      axisLabel: { color: '#c0d8e8', fontSize: 16, interval: 0 }
    },
    series: [{
      type: 'bar',
      barWidth: '55%',
      data: sorted.slice().reverse().map((item, idx) => ({
        value: item.value,
        itemStyle: {
          // color: {
          //   type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          //   colorStops: [{ offset: 0, color: typeColors[type][idx] }, { offset: 1, color: typeColors[type][idx] + '88' }]
          // },
          color: typeColors[type][idx]+'88',
          borderRadius: [0, 3, 3, 0]
        }
      })),
      label: {
        show: true, position: 'right', color: '#00ffcc', fontSize: 16, fontWeight: 'bold',
        formatter: (params) => {
          const val = params.value
          return val +  typeUnits[type]
          // const isDecimal = val % 1 !== 0
          // return (isDecimal ? val.toFixed(1) : val.toLocaleString()) + ' ' + typeUnits[type]
        }
      }
    }]
  }
  
  chart.setOption(option, true)
}

function switchType(type) {
  currentType.value = type
  updateChart(type)
}

function startAutoSwitch() {
  const types = ['cpu', 'memory', 'storage']
  let idx = 0
  autoSwitchInterval = setInterval(() => {
    idx = (idx + 1) % types.length
    switchType(types[idx])
  }, 5000)
}

onMounted(() => {
  const dom = document.getElementById('branchRankingChart')
  chart = echarts.init(dom)
  setTimeout(() => {
    updateChart('cpu')
    startAutoSwitch()
  }, 2000);
  
  window.addEventListener('resize', handleResize);
})

const handleResize = () => {
  chart?.resize()
};

onUnmounted(() => {
  if (autoSwitchInterval) clearInterval(autoSwitchInterval)
  chart?.dispose()
  window.removeEventListener('resize', handleResize);
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.panel-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  min-height: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary-color, transparent);
  }
  // height: 840px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: linear-gradient(180deg, rgba($primary-color, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid $border-color;
  flex-shrink: 0;
  span {
    font-family: $font-display;
    font-size: 16px;
    font-weight: 600;
    color: $primary-color;
    letter-spacing: 1px;
    white-space: nowrap;
  }
}
.header-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  flex-shrink: 0;
}
.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, $border-color, transparent);
}
.panel-content {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}
.chart-container {
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 5px;
  padding: 8px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chart-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  flex-shrink: 0;
  span {
    font-size: 16px;
    color: #ffffff;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
}
.ranking-tabs {
  display: flex;
  gap: 4px;
}
.ranking-tab {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 3px;
  cursor: pointer;
  color: $text-muted;
  background: rgba($primary-color, 0.1);
  transition: all 0.3s ease;
  &:hover {
    color: $primary-color;
    background: rgba($primary-color, 0.2);
  }
  &.active {
    color: $bg-dark;
    background: $primary-color;
    font-weight: 600;
  }
}
.chart {
  flex: 1;
  min-height: 92px;
}
</style>
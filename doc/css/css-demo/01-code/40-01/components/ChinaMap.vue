<template>
  <div class="map-container">
    <div class="map-content">
      <div class="province-info-overlay" :class="{ active: overlayActive }">
        <div class="province-info-header">
          <span class="province-info-name">{{ currentProvince?.displayName || '--' }}</span>
          <span class="province-info-status" :class="{ active: isMonitoring }">{{ statusText }}</span>
        </div>
        <div class="province-info-divider"></div>
        <div class="province-info-grid">
          <div class="province-info-item">
            <span class="pii-icon project"></span>
            <span class="pii-label">规模</span>
            <span class="pii-value">{{ currentProvince?.projects || '--' }}</span>
          </div>
          <div class="province-info-item">
            <span class="pii-icon vm"></span>
            <span class="pii-label">数量</span>
            <span class="pii-value">{{ currentProvince?.vm || '--' }}</span>
          </div>
          <div class="province-info-item">
            <span class="pii-icon memory"></span>
            <span class="pii-label">能力</span>
            <span class="pii-value">{{ currentProvince?.memory || '--' }}</span>
          </div>
          <div class="province-info-item">
            <span class="pii-icon storage"></span>
            <span class="pii-label">成长</span>
            <span class="pii-value">{{ currentProvince?.storage || '--' }}</span>
          </div>
        </div>
        <div class="province-info-progress">
          <div class="province-info-progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
      <div id="chinaMap" class="map-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { branchData } from '../data/branchData.js'
// 地图信息
import mapInfo from './mapInfo.json'


let mapChart = null
let rotationInterval = null
let flashTimeout = null
let activeTimeout = null
let progressInterval = null

const overlayActive = ref(false)
const isMonitoring = ref(false)
const statusText = ref('切换中...')
const progressWidth = ref(0)
const currentProvince = ref(null)

const uniqueProvinces = [...new Map(branchData.map(p => [p.name, p])).values()]
let currentIndex = -1

onMounted(() => {
  initMap()
  window.addEventListener('resize', handleResize);
})

const handleResize = () => {
  mapChart?.resize()
};

async function initMap() {
  const chartDom = document.getElementById('chinaMap')
  mapChart = echarts.init(chartDom)
  try {
    // const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    // const chinaJson = await response.json()
    echarts.registerMap('china', mapInfo)
    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: params => params.name },
      series: [{
        type: 'map', map: 'china', roam: false, layoutCenter: ['50%', '50%'], layoutSize: '95%',
        label: { show: false },
        itemStyle: { areaColor: 'rgba(20, 35, 55, 0.8)', borderColor: 'rgba(0, 255, 204, 0.3)', borderWidth: 1 },
        emphasis: {
          itemStyle: { areaColor: 'rgba(0, 255, 204, 0.6)', borderColor: '#00ffcc', borderWidth: 3, shadowBlur: 20 },
          label: { show: true, color: '#00ffcc', fontSize: 14, fontWeight: 'bold' }
        },
        // data: branchData.map(item => ({ name: item.name, value: item.value[2] }))
        // 地图点数据，value值不重要，直接为0即可
        data: branchData.map(item => ({ name: item.name, value: 0 }))
      }]
    }
    mapChart.setOption(option)
    // 启动省份轮换
    setTimeout(() => switchToNextProvince(), 2000)
    rotationInterval = setInterval(switchToNextProvince, 8000)
  } catch (err) {
    console.error('地图加载失败', err)
    chartDom.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#8ba4b4;">地图加载中...</div>'
  }
}

function getDisplayName(name) {
  return name.replace(/省|市|自治区|回族|维吾尔|壮族/g, '')
}

function highlightProvince(name) {
  if (!mapChart) return
  mapChart.dispatchAction({ type: 'downplay', seriesIndex: 0 })
  mapChart.dispatchAction({ type: 'highlight', seriesIndex: 0, name })
}

function downplayProvince(name) {
  if (!mapChart) return
  mapChart.dispatchAction({ type: 'downplay', seriesIndex: 0, name })
}

function startFlashing(name) {
  statusText.value = '切换中...'
  isMonitoring.value = false
  let flashCount = 0
  const interval = setInterval(() => {
    if (flashCount >= 10) {
      clearInterval(interval)
      return
    }
    if (flashCount % 2 === 0) highlightProvince(name)
    else downplayProvince(name)
    flashCount++
  }, 150)
  flashTimeout = setTimeout(() => {
    clearInterval(interval)
    downplayProvince(name)
    startActive(name)
  }, 1500)
}

function startActive(name) {
  statusText.value = '监控中'
  isMonitoring.value = true
  highlightProvince(name)
  activeTimeout = setTimeout(() => {
    overlayActive.value = false
    downplayProvince(name)
    progressWidth.value = 0
    isMonitoring.value = false
  }, 6500)
}

function startProgressAnimation() {
  progressWidth.value = 0
  let progress = 0
  progressInterval = setInterval(() => {
    progress += 100 / 80 // 8秒内完成
    if (progress >= 100) {
      progress = 100
      clearInterval(progressInterval)
    }
    progressWidth.value = progress
  }, 100)
}

function switchToNextProvince() {
  if (flashTimeout) clearTimeout(flashTimeout)
  if (activeTimeout) clearTimeout(activeTimeout)
  if (progressInterval) clearInterval(progressInterval)

  let nextIndex
  do {
    nextIndex = Math.floor(Math.random() * uniqueProvinces.length)
  } while (nextIndex === currentIndex && uniqueProvinces.length > 1)
  currentIndex = nextIndex
  const province = uniqueProvinces[currentIndex]
  currentProvince.value = {
    ...province,
    displayName: getDisplayName(province.name)
  }
  overlayActive.value = true
  startFlashing(province.name)
  startProgressAnimation()
}



onUnmounted(() => {
  if (rotationInterval) clearInterval(rotationInterval)
  if (flashTimeout) clearTimeout(flashTimeout)
  if (activeTimeout) clearTimeout(activeTimeout)
  if (progressInterval) clearInterval(progressInterval)
  mapChart?.dispose()
  window.removeEventListener('resize', handleResize);
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.map-container {
  flex: 1;
  background: $bg-panel;
  border: 1px solid $border-color;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary-color, transparent);
    z-index: 10;
  }
  height: 840px;
}
.map-content {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
}
.map-chart {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
}
.province-info-overlay {
  position: absolute;
  left: 16px;
  bottom: 16px;
  width: 260px;
  background: linear-gradient(135deg, rgba(10, 20, 35, 0.95) 0%, rgba(15, 30, 50, 0.9) 100%);
  border: 1px solid rgba($primary-color, 0.2);
  border-radius: 10px;
  padding: 20px;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  &.active {
    border-color: rgba($primary-color, 0.5);
    box-shadow: 0 0 25px rgba($primary-color, 0.15);
  }
}
.province-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.province-info-name {
  font-family: $font-display;
  font-size: 24px;
  font-weight: 600;
  color: $primary-color;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba($primary-color, 0.3);
}
.province-info-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 10px;
  background: rgba($warning-color, 0.2);
  color: $warning-color;
  transition: all 0.3s ease;
  &.active {
    background: rgba($success-color, 0.2);
    color: $success-color;
  }
}
.province-info-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba($primary-color, 0.3), transparent);
  margin-bottom: 12px;
}
.province-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.province-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 8px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid rgba($primary-color, 0.1);
  transition: all 0.3s ease;
  &:hover {
    border-color: rgba($primary-color, 0.3);
    background: rgba(0, 0, 0, 0.35);
  }
}
.pii-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.vm::before { content: '◈'; color: $secondary-color; font-size: 16px; }
  &.memory::before { content: '▤'; color: #9d00ff; font-size: 16px; }
  &.storage::before { content: '▣'; color: $success-color; font-size: 16px; }
  &.project::before { content: '◎'; color: $warning-color; font-size: 16px; }
}
.pii-label {
  font-size: 13px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 5px;
}
.pii-value {
  font-family: $font-display;
  font-size: 20px;
  font-weight: 600;
  color: $text-primary;
}
.province-info-progress {
  height: 2px;
  background: rgba($primary-color, 0.1);
  border-radius: 1px;
  overflow: hidden;
  margin-top: 12px;
}
.province-info-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, $primary-color, $secondary-color);
  border-radius: 1px;
  transition: width 0.1s linear;
}
</style>
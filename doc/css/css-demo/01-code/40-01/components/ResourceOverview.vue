<template>
  <div class="panel-section">
    <div class="section-header">
      <div class="header-icon"></div>
      <span>养殖资源总览</span>
      <div class="header-line"></div>
    </div>
    <div class="panel-content">
      <div class="stat-grid">
        <!-- 统计卡片 -->
        <div v-for="item in stats" :key="item.label" class="stat-card wide">
          <div class="card-glow"></div>
          <div :class="['stat-icon', item.iconClass]"></div>
          <div class="stat-info wide-info">
            <span class="stat-value" :data-target="item.target">{{ displayValue(item) }}</span>
            <span class="stat-label">{{ item.label }}</span>
          </div>
        </div>

        <!-- 资源卡片（CPU/内存/存储） -->
        <div v-for="resource in resources" :key="resource.name" class="resource-card">
          <div class="resource-info">
            <div :class="['resource-icon', resource.iconClass]"></div>
            <div class="resource-text">
              <span class="resource-name">{{ resource.name }}</span>
              <div class="resource-main">
                <span class="resource-value" :data-target="resource.rawValue">{{ resource.displayValue }}</span>
                <span class="resource-unit">{{ resource.unit }}</span>
              </div>
            </div>
          </div>
          <div class="donut-group">
            <span class="donut-usage-label">利用率</span>
            <div class="resource-donut-wrap">
              <svg viewBox="0 0 60 60" class="donut-svg">
                <circle class="donut-track" cx="30" cy="30" r="24" />
                <circle class="donut-progress" cx="30" cy="30" r="24"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference"
                  :data-percent="resource.percent" />
              </svg>
              <div class="donut-label">{{ resource.percent }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const circumference = 2 * Math.PI * 24 // 约150.8

const stats = ref([])

const resources = ref([])

function displayValue(item) {
  return item.current.toLocaleString()
}

// 数字递增动画
function animateCounters() {
  const duration = 2000
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)

    stats.value.forEach(stat => {
      stat.current = Math.floor(stat.target * easeOutQuart)
    })
    resources.value.forEach(res => {
      const isDecimal = res.rawValue % 1 !== 0
      const val = res.rawValue * easeOutQuart
      res.current = isDecimal ? val : Math.floor(val)
      res.displayValue = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString()
    })

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  requestAnimationFrame(update)
}

// 环形图动画
function animateDonutCharts() {
  const donuts = document.querySelectorAll('.donut-progress')
  donuts.forEach(donut => {
    const percent = parseFloat(donut.getAttribute('data-percent'))
    const offset = circumference * (1 - percent / 100)
    setTimeout(() => {
      donut.style.strokeDashoffset = offset
    }, 400)
  })
}

onMounted(() => {
  setTimeout(() => {
    stats.value = [
      { label: '养殖台数量', target: 4, iconClass: 'cloud-icon', current: 0 },
      { label: '养殖平台集群数量', target: 18, iconClass: 'container-icon', current: 0 },
      { label: '养殖数量', target: 156, iconClass: 'zone-icon', current: 0 },
      { label: '畜牧数量', target: 2847, iconClass: 'vm-icon', current: 0 },
      { label: '可产生数量', target: 12480, iconClass: 'pod-icon', current: 0 },
      { label: '可收益数量', target: 1240, iconClass: 'server-icon', current: 0 },
      { label: '成年数量', target: 368, iconClass: 'disk-icon', current: 0 }
    ]
    resources.value = [
      { name: '养殖核心', rawValue: 45632, unit: '项', percent: 68, iconClass: 'cpu-icon', current: 0, displayValue: '0' },
      { name: '养殖容量', rawValue: 128, unit: '万', percent: 56, iconClass: 'mem-icon', current: 0, displayValue: '0' },
      { name: '经济容量', rawValue: 2.4, unit: '万', percent: 45, iconClass: 'disk-icon', current: 0, displayValue: '0' }
    ]
    animateCounters()
    // 等待 DOM 更新完成后再执行圆环动画
    nextTick(() => {
      animateDonutCharts()
    })
  }, 2000);
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
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary-color, transparent);
  }
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
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  flex: 1;
  width: 100%;
  min-height: 810px;
}

.stat-card {
  position: relative;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 5px;
  padding: 10px 12px;
  display: flex;
  align-items: center;      // 垂直居中对齐
  // gap: 10px;
  transition: all 0.3s ease;
  // width: 100%;
  // border: 5px solid blue;

  &.wide {
    grid-column: span 2;
    justify-content: flex-start;
    gap: 12px;
    padding: 10px 16px;

    .stat-icon {
      width: 22px;
      height: 22px;
    }
    .stat-info.wide-info {
      flex-direction: row;
      align-items: baseline;
      gap: 10px;
      .stat-value { font-size: 32px; }
      .stat-label { font-size: 16px; }
    }
  }

  &:hover {
    border-color: $primary-color;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba($primary-color, 0.2);
    .card-glow { opacity: 1; }
  }
}

.stat-info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex: 1;
  text-align: left;          // 文字靠左
  align-items: flex-start;   // 内部元素靠左对齐（如果改为flex列布局）
}

.resource-card {
  grid-column: span 2;
  background: $bg-card;
  border: 1px solid $border-color;
  border-radius: 5px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  // width: 100%;

  &:hover {
    border-color: $primary-color;
    box-shadow: 0 0 15px rgba($primary-color, 0.1);
  }
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, $primary-color, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-icon {
  width: 28px;
  height: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;           // 防止被压缩
}

// 图标样式（保持不变）
.cloud-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Cpath d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'/%3E%3C/svg%3E"); }
.container-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E"); }
.zone-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E"); }
.vm-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E"); }
.pod-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Ccircle cx='4' cy='12' r='2'/%3E%3Ccircle cx='20' cy='12' r='2'/%3E%3Ccircle cx='12' cy='4' r='2'/%3E%3Ccircle cx='12' cy='20' r='2'/%3E%3Cline x1='7' y1='12' x2='9' y2='12'/%3E%3Cline x1='15' y1='12' x2='17' y2='12'/%3E%3Cline x1='12' y1='7' x2='12' y2='9'/%3E%3Cline x1='12' y1='15' x2='12' y2='17'/%3E%3C/svg%3E"); }
.server-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Crect x='2' y='2' width='20' height='8' rx='2' ry='2'/%3E%3Crect x='2' y='14' width='20' height='8' rx='2' ry='2'/%3E%3Cline x1='6' y1='6' x2='6.01' y2='6'/%3E%3Cline x1='6' y1='18' x2='6.01' y2='18'/%3E%3C/svg%3E"); }
.disk-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpolyline points='3.27 6.96 12 12.01 20.73 6.96'/%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'/%3E%3C/svg%3E"); }
.cpu-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Crect x='4' y='4' width='16' height='16' rx='2' ry='2'/%3E%3Crect x='9' y='9' width='6' height='6'/%3E%3Cline x1='9' y1='1' x2='9' y2='4'/%3E%3Cline x1='15' y1='1' x2='15' y2='4'/%3E%3Cline x1='9' y1='20' x2='9' y2='23'/%3E%3Cline x1='15' y1='20' x2='15' y2='23'/%3E%3Cline x1='20' y1='9' x2='23' y2='9'/%3E%3Cline x1='20' y1='14' x2='23' y2='14'/%3E%3Cline x1='1' y1='9' x2='4' y2='9'/%3E%3Cline x1='1' y1='14' x2='4' y2='14'/%3E%3C/svg%3E"); }
.mem-icon { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300ffcc' stroke-width='2'%3E%3Cpath d='M6 19v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8'/%3E%3Cpath d='M6 19h12'/%3E%3Cpath d='M9 9V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3'/%3E%3C/svg%3E"); }

.stat-value {
  font-family: $font-display;
  font-size: 32px;
  font-weight: 700;
  color: $primary-color;
  text-shadow: 0 0 12px $primary-glow, 0 0 24px rgba($primary-color, 0.3);
  line-height: 1.2;
}
.stat-label {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
  line-height: 1.3;
}

.resource-icon {
  width: 36px;
  height: 36px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
}

.resource-details { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.resource-main { display: flex; align-items: baseline; gap: 2px; min-width: 70px; }
.resource-value {
  font-family: $font-display;
  font-size: 26px;
  font-weight: 700;
  color: $primary-color;
  text-shadow: 0 0 12px $primary-glow, 0 0 24px rgba($primary-color, 0.3);
  line-height: 1.2;
}
.resource-unit {
  font-family: $font-display;
  font-size: 14px;
  font-weight: 600;
  color: $primary-color;
  text-shadow: 0 0 8px $primary-glow;
}
.resource-name { font-size: 15px; color: $text-secondary; }
.donut-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-left: auto;
}
.donut-usage-label {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
}
.resource-donut-wrap {
  position: relative;
  width: 65px;
  height: 65px;
  flex-shrink: 0;
}
.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.donut-track {
  fill: none;
  stroke: rgba($primary-color, 0.12);
  stroke-width: 5;
}
.donut-progress {
  fill: none;
  stroke: $primary-color;
  stroke-width: 5;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 4px rgba($primary-color, 0.6));
}
.donut-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: $font-display;
  font-size: 13px;
  font-weight: 700;
  color: $primary-color;
  text-shadow: 0 0 8px $primary-glow;
  white-space: nowrap;
}
.resource-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  .resource-icon { width: 22px; height: 22px; }
  .resource-name { font-size: 16px; font-weight: 700; color: #ffffff; letter-spacing: 1px; }
  .resource-main { display: flex; align-items: baseline; gap: 2px; }
}
.resource-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
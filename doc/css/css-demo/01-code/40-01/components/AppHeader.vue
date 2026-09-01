<template>
  <header class="header">
    <div class="header-left">
      <div class="logo-container">
        <!-- <img class="brand-logo-image" :src="img" alt="XX养殖养殖基地" /> -->
        <div class="system-info">
          <span class="system-name">XX养殖养殖基地</span>
        </div>
      </div>
    </div>
    <div class="header-center">
      <div class="main-title">
        <div class="title-decoration left"></div>
        <div class="title-content">
          <div class="title-main">
            <span class="title-text">XX养殖养殖资源可视化中心</span>
          </div>
        </div>
        <div class="title-decoration right"></div>
      </div>
    </div>
    <div class="header-right">
      <div class="datetime-display">
        <div class="date">{{ currentDate }}</div>
        <div class="time">{{ currentTime }}</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')
let timer = null

function updateDateTime() {
  const now = new Date()
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }
  currentDate.value = now.toLocaleDateString('zh-CN', options)
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  updateDateTime()
  timer = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  background: linear-gradient(180deg, rgba($primary-color, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid $border-color;
  position: relative;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary-color, transparent);
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo-image {
  width: 38px;
  height: 38px;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba($primary-dark, 0.35));
}

.system-name {
  font-family: $font-display;
  font-size: 24px;
  font-weight: 700;
  color: $primary-color;
  text-shadow: 0 0 10px $primary-glow;
  letter-spacing: 1px;
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.main-title {
  text-align: center;
  display: flex;
  align-items: center;
  gap: 15px;
}

.title-decoration {
  width: 80px;
  height: 2px;
  position: relative;
  background: linear-gradient(90deg, transparent, $primary-color);

  &.left {
    background: linear-gradient(90deg, transparent, $primary-color);
  }
  &.right {
    background: linear-gradient(90deg, $primary-color, transparent);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 2px solid $primary-color;
    transform: rotate(45deg);
  }

  &.left::before {
    top: -4px;
    right: 0;
  }
  &.left::after {
    bottom: -4px;
    right: 0;
  }
  &.right::before {
    top: -4px;
    left: 0;
  }
  &.right::after {
    bottom: -4px;
    left: 0;
  }
}

.title-text {
  font-family: $font-display;
  font-size: 28px;
  font-weight: 900;
  color: $text-primary;
  letter-spacing: 14px;
  text-shadow: 0 0 10px $primary-glow, 0 0 20px $primary-glow, 0 0 40px rgba($primary-color, 0.3);
  position: relative;

}

.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.datetime-display {
  text-align: right;
}

.date {
  font-size: 13px;
  color: $text-secondary;
  letter-spacing: 1px;
}

.time {
  font-family: $font-display;
  font-size: 20px;
  font-weight: 700;
  color: $primary-color;
  text-shadow: 0 0 10px $primary-glow;
}
</style>
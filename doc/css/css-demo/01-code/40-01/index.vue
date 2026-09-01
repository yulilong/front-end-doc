<!--
  功能: 分行托管云资源可视化中心
  作者: 
  日期: 
-->
<template>
  <div class="demo-one">
    <AppHeader />

    <div class="content">
      <div class="left-panel">
        <ResourceOverview />
      </div>

      <div class="center-panel">
        <ChinaMap />

        <div class="data-flow-container">
          <div class="flow-line">
            <div class="flow-particle"></div>
            <div class="flow-particle"></div>
            <div class="flow-particle"></div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <BranchRanking />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="CloudResourceVisualizationCenter">
import { ref, reactive, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import ResourceOverview from "./components/ResourceOverview.vue";
import ChinaMap from "./components/ChinaMap.vue";
import BranchRanking from "./components/BranchRanking.vue";
</script>

<style lang="scss" scoped>
@import "./styles/variables.scss";
@import "./styles/font-family/font-family.css";

.demo-one {
  width: 100%;
  // min-height: 100vh; // 由内容撑开，背景完整覆盖
  position: relative; // 为网格覆盖提供定位参考
  background:
    radial-gradient(
      ellipse at 50% 0%,
      rgba($primary-color, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 0% 50%,
      rgba($secondary-color, 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      ellipse at 100% 50%,
      rgba($accent-color, 0.05) 0%,
      transparent 40%
    ),
    radial-gradient(
      ellipse at 50% 100%,
      rgba($primary-color, 0.05) 0%,
      transparent 50%
    ),
    $bg-dark;

  .content {
    // 作为绝对定位面板的参考容器
    position: relative;
    margin-top: 10px;
    padding-bottom: 10px;

    /* 左右面板使用绝对定位 */
    .left-panel {
      position: absolute;
      top: 0;
      left: 10px;
      width: 340px;
      // 增加半透明背景，提升视觉层次（可保留原设计）
      background: rgba($bg-panel, 0.6);
      backdrop-filter: blur(2px);
      z-index: 2;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    /* 中间面板：通过 margin 为左右绝对定位面板留出空间，间隙与原始 gap 一致 (12px) */
    .center-panel {
      margin-left: calc(340px + 22px); // 左面板宽度 + 原始间距
      margin-right: calc(420px + 22px); // 右面板宽度 + 原始间距
      background: transparent;
      min-width: 0;
      // 保持内部内容样式不变

      // 地图下面的移动线
      .data-flow-container {
        background: $bg-panel;
        border: 1px solid $border-color;
        border-radius: 6px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 25px;
        flex-shrink: 0;
        margin-top: 5px;
        
        .flow-line {
          flex: 1;
          height: 2px;
          background: $border-color;
          position: relative;
          overflow: hidden;
          .flow-particle {
            position: absolute;
            width: 20px;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              $primary-color,
              transparent
            );
            animation: flowParticle 2s linear infinite;
            &:nth-child(2) {
              animation-delay: 0.6s;
            }
            &:nth-child(3) {
              animation-delay: 1.2s;
            }
          }

          @keyframes flowParticle {
            0% {
              left: -20px;
            }
            100% {
              left: 100%;
            }
          }
        }
      }
    }

    .right-panel {
      position: absolute;
      top: 0;
      right: 10px;
      width: 420px;
      // height: 500px;
      // border: 5px solid red;
      background: rgba($bg-panel, 0.6);
      backdrop-filter: blur(2px);
      z-index: 2;
      display: flex;
      flex-direction: column;
      min-height: 875px;
      // border: 5px solid yellow;

    }
  }
}
</style>

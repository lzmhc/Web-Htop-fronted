<script setup lang="ts">
defineProps(['info']);
</script>
<template>
  <div class="card">
    <div class="head">
      <div class="icon"></div>
      <div class="title">
        <h3 class="name">{{ info.name }}</h3>
        <p>{{ info.type }}</p>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <div class="inner"></div>
      </div>
      <div class="right">
        <div class="percent">{{info.usage}}%</div>
        <div class="info-label">{{info.underline}}</div>
        <!-- <div class="usage-underline first"></div> -->
      </div>
    </div>
    <div class="footer">
      <div>{{info.bt1}}</div>
      <div>{{info.bt2}}</div>
      <div>{{info.bt3}}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  background-color: $white;
  display: grid;
  // grid-template-rows: repeat(3, 1fr);
  border-radius: 20px;
  overflow: hidden;
  .head {
    display: flex;
    padding: 20px;
    height: 135px;
    .icon {
      width: 64px;
      height: 64px;
      flex-shrink: 0;
      background-color: $blue-light;
      border-radius: 50%;
    }
    .title {
      display: grid;
      padding-left: 24px;
      .name {
        margin: 16px 0 0;
      }
      p {
        margin: 0;
        color: $gray;
      }
    }
  }
  .main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 20px;
    margin-bottom: 40px;
    // height: 200px;
    // grid-auto-columns: min-content;
    .left {
      display: grid;
      grid-auto-rows: min-content;
      gap: 16px;
      .inner {
        width: 12px;
        height: 12px;
        background-color: $blue-light;
      }
      &::before {
        content: '';
        width: 12px;
        height: 12px;
        background-color: $blue-light;
      }
      &::after {
        content: '';
        width: 12px;
        height: 12px;
        background-color: $blue-light;
      }
    }
    .right {
      display: grid;
      grid-auto-rows: min-content;
      justify-items: center;
      .percent {
        font-size: 64px;
        font-weight: bold;
      }
      .info-label {
        text-align: center;
        font-size: 10px;
        font-weight: bold;
        color: $gray;
        border-bottom: 4px solid $blue-light;
      }
      // &::after{
      //   content: '';
      //   width: 100%;
      //   background-color: $green-light;
      //   height: 4px;
      // }
    }
  }
  .footer{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50px;
    gap: 1px;
    >div{
      line-height: 1;
      background-color: $blue-light;
      display: grid;
      justify-items: center;
      align-items: center;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        top: -12px;
        width: 24px;
        height: 24px;
        background: radial-gradient(circle at center, $blue-dark 35%, $white calc(35% + 1px));
        border-radius: 50%;
      }
    }
  }
  .title p{
    color: brown !important;
  }
}
</style>

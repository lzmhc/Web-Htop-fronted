<script setup lang="ts">
import Card from './HomePage/Card.vue';
import { onMounted, ref,onUnmounted } from 'vue';
import type { System } from '@/types/system';
import { getSystemInfos } from '@/api/system';

const infos = ref<System>({} as System);
const processor = ref({
  name: '处理器',
  underline: '处理器占用率',
  type: '',
  usage: '',
  bt1: '',
  bt2: '',
  bt3: '',
});
const machine = ref({
  name: '主机',
  underline: '内存占用率',
  type: '',
  usage: '',
  bt1: '',
  bt2: '',
  bt3: '',
});
const storage = ref({
  name: '磁盘',
  underline: '磁盘占用率',
  type: '',
  usage: '',
  bt1: '',
  bt2: '',
  bt3: '',
});
const healthPercent = ref(0);
const memoryPercent = ref(0);
const displayMemory = ref('')
const displayMemory2 = ref('')
const refreshData = async () => {
  let temp: System;
  temp = await getSystemInfos();
  infos.value = temp;
  // processor.value.type = 'Intel(R) Core(TM) i7-8650U CPU @ 1.90GHz';
  processor.value.type = temp.processorDto.name;
  processor.value.usage = temp.processorDto.usedRate;
  processor.value.bt1 = temp.processorDto.coreCount + '核心';
  processor.value.bt2 = temp.processorDto.currentFreq;
  processor.value.bt3 = temp.processorDto.bitDepth;

  machine.value.type = temp.operatingSystemDto.family;
  // 由后端直接给出百分比，后期修改。  
  machine.value.usage = Math.floor(temp.globalMemoryDto.percentage*100) + '';
  // Math.floor(
  //   (temp.globalMemoryDto.usedMemory / temp.globalMemoryDto.totalMemory) * 100
  // ) + '' ;
  machine.value.bt1 = temp.globalMemoryDto.totalMemory;
  // DDR3，找不到信息反
  machine.value.bt2 = temp.globalMemoryDto.ramTypeOrOsBitDepth;
  // 进程数，也是没有
  machine.value.bt3 = temp.globalMemoryDto.procCount;

  storage.value.type = temp.storageDtoList[0].mainStorage;
  storage.value.usage = temp.storageDtoList[0].usedRate;
  storage.value.bt1 = temp.storageDtoList[0].total;
  storage.value.bt2 = temp.storageDtoList[0].diskCount;
  storage.value.bt3 = temp.globalMemoryDto.virtuallMemory;
  // 手动计算电池百分比
  healthPercent.value = Math.floor(
    (temp.powerDto.currentCapacity / temp.powerDto.maxCapacity) * 100
  );
  // 手动计算显存
  displayMemory.value = Math.floor(
    temp.graphicsCardDto.graphicsCardList[0].vram/1024/1024
  ) + 'MB';
  displayMemory2.value = Math.floor(
    temp.graphicsCardDto.graphicsCardList[1].vram/1024/1024
  ) + 'MB';
};
let refFlag:number;
onMounted(() => {
  refFlag = setInterval(refreshData, 1000);
});
onUnmounted(()=>{
  clearInterval(refFlag);
})
</script>
<template>
  <div class="main">
    <div class="wrapper">
      <div class="dashboard">
        <Card name="处理器" :info="processor" />
        <Card name="处理器" :info="machine" />
        <Card name="处理器" :info="storage" />
      </div>
      <div class="bottomPanel">
        <div class="graphics">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col />
              <!-- 其他列可以在这里继续设置或省略 -->
            </colgroup>
            <!-- <thead>
              <tr>
                <th>显卡1</th>
              </tr>
            </thead> -->
            <caption>
              显卡1
            </caption>
            <tbody>
              <tr>
                <td>显卡型号</td>
                <td>{{ infos.graphicsCardDto?.graphicsCardList[0].name }}</td>
              </tr>
              <tr>
                <td>设备ID</td>
                <td>
                  {{ infos.graphicsCardDto?.graphicsCardList[0].deviceId }}
                </td>
              </tr>
              <tr>
                <td>提供商</td>
                <td>{{ infos.graphicsCardDto?.graphicsCardList[0].vendor }}</td>
              </tr>
              <tr>
                <td>显存</td>
                <td>{{displayMemory}}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col />
              <!-- 其他列可以在这里继续设置或省略 -->
            </colgroup>
            <caption>
              显卡2
            </caption>
            <!-- <thead>
              <tr>
                <th>显卡2</th>
              </tr>
            </thead> -->
            <tbody>
              <tr>
                <td>显卡型号</td>
                <td>{{ infos.graphicsCardDto?.graphicsCardList[1].name }}</td>
              </tr>
              <tr>
                <td>设备ID</td>
                <td>
                  {{ infos.graphicsCardDto?.graphicsCardList[1].deviceId }}
                </td>
              </tr>
              <tr>
                <td>提供商</td>
                <td>{{ infos.graphicsCardDto?.graphicsCardList[1].vendor }}</td>
              </tr>
              <tr>
                <td>显存</td>
                <td>{{displayMemory2}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="power">
          <table>
            <colgroup>
              <col style="width: 100px" />
              <col />
              <!-- 其他列可以在这里继续设置或省略 -->
            </colgroup>
            <!-- <thead>
              <tr>
                <th>显卡1</th>
              </tr>
            </thead> -->
            <caption>
              电源
            </caption>
            <tbody>
              <tr>
                <td>设备名称</td>
                <td>
                  {{ infos.powerDto?.deviceName }}
                </td>
              </tr>
              <tr>
                <td>电池健康度</td>
                <td>{{ healthPercent }}%</td>
                <!-- <td>{{ infos.powerDto?.name }}</td> -->
              </tr>
              <tr>
                <td>提供商</td>
                <td>{{ infos.graphicsCardDto?.graphicsCardList[0].vendor }}</td>
              </tr>
              <tr>
                <td>电池制造商</td>
                <td>{{ infos.powerDto?.manufacturer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="footer">
        <a href="/about">
          <img src="/img/toggle.png" width="36px" alt="转换模式" class="toggle">
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.main {
  display: grid;
  min-height: 100vh;
  min-width: 960px;
  background-color: $htop-theme;
}
.dashboard {
  display: grid;
  margin-top: 70px;
  margin-bottom: 16px;
  padding: 0 64px;
  // height: 40%;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.bottomPanel {
  display: flex;
  padding: 0 64px;
  .graphics {
    flex: 1;
    justify-content: space-around;
    margin-right: 24px;
    padding: 20px;
    border-radius: 12px;
    background-color: $black-dark;
    display: flex;
    box-shadow: 3px 3px $red-light;
    caption {
      color: $white;
      margin-bottom: 8px;
    }
    tr {
      td:not(:last-child) {
        color: $white;
      }
      td:last-child {
        color: $gray;
      }
    }
  }
  .power {
    background-color: $yellow-light;
    border-radius: 12px;
    box-shadow: 3px 3px $red-light;
    padding: 20px;
    caption {
      color: $black-dark;
      margin-bottom: 8px;
    }
    tr {
      td:not(:last-child) {
        color: $black-dark;
      }
      td:last-child {
        color: $gray;
      }
    }
  }
}
.footer{
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 24px 0;
}
</style>

<template>
  <div class="pd-select-item">
    <div class="pd-select-line"></div>
    <div class="pd-select-list">
      <ul class="pd-select-ul" ref="list">
        <li class="pd-select-list-item" v-for="(el,index) in renderData " :class="{'hidden':setHidden(el.index)}" :key="index">{{el.value}}--1</li>
      </ul>
    </div>
    <ul class="pd-select-wheel" ref="wheel">
      <li class="pd-select-wheel-item" :class="{'hidden':setHidden(el.index)}" :style="setWheelItemDeg(el.index)" :index="el.index"
        v-for="(el,index) in renderData " :key="index">{{el.value}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "pdSelectItem",
  data() {
    return {
      startDgY: 0,
      listData: Array.from({ length: 12 }, (value, index) => 1 + index),
      spin: { start: -9, end: 9, branch: 9 }, // 选中上方，下方，以及展示页面个数
      type: "cycle",
      finger: { startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0 }
    };
  },
  props: {
    // listData: {
    //   type: Array,
    //   default: Array.from({ length: 12 }, (value, index) => 1 + index)
    // },
    // type: {
    //   type: String,
    //   default: "cycle"
    // },
    value: 100
  },
  computed: {
    renderData() {
      let temp = [];
      for (let k = this.spin.start; k <= this.spin.end; k++) {
        let data = {
          value: this.getSpinData(k),
          index: k
        };
        temp.push(data);
      }
      return temp;
    }
  },
  mounted() {
    /* 事件绑定 */
    this.$el.addEventListener("touchstart", this.itemTouchStart);
    this.$el.addEventListener("touchmove", this.itemTouchMove);
    this.$el.addEventListener("touchend", this.itemTouchEnd);
    /* 初始化状态 */
    let index = -1;
    if (index === -1) {
      // console.warn("当前初始值不存在，请检查后listData范围！！");
      this.setListTransform();
      this.getPickValue(0);
    } else {
      let move = index * 34;
      /* 因为往上滑动所以是负 */
      this.setStyle(-move);
      this.setListTransform(-move, -move);
    }
  },
  methods: {
    /* 根据type 控制滚轮显示效果 */
    setHidden(index) {
      if (this.type === "line") {
        return index < 0 || index > this.listData.length - 1;
      } else {
        return false;
      }
    },
    // 布置圆角
    setWheelItemDeg(index) {
      // 直径100 每一个内角20 圆
      return {
        transform: `rotate3d(1, 0, 0, ${(-index * 20) %
          360}deg) translate3d(0px, 0px, 100px)`
      };
    },
    // 下层圆进行旋转
    setWheelDeg(updateDeg, type, time = 1000) {
      if (type === "end") {
        this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
      } else {
        this.$refs.wheel.style.webkitTransition = "";
        this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
      }
    },
    // 上层正面页面滚动
    setListTransform(translateY = 0, marginTop = 0, type, time = 1000) {
      if (type === "end") {
        this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        this.$refs.list.style.webkitTransform = `translateY(${translateY -
          this.spin.branch * 34}px)`;
        this.$refs.list.style.marginTop = `${-marginTop}px`;
        // this.$refs.list.setAttribute("scroll", translateY); // 设置scroll滚动距离 每次滚动时进行计算
      } else {
        this.$refs.list.style.webkitTransition = "";
        this.$refs.list.style.webkitTransform = `translateY(${translateY -
          this.spin.branch * 34}px)`;
        this.$refs.list.style.marginTop = `${-marginTop}px`; // 保持scorll滚动 和 当前UL位置不变
        // this.$refs.list.setAttribute("scroll", translateY); // 设置scroll滚动距离 每次滚动时进行计算
      }
    },
    itemTouchStart(event) {
      let finger = event.changedTouches[0];
      this.finger.startY = finger.pageY; // 开始的Y值
      this.finger.startTime = event.timestamp || Date.now(); // 拖动起始时间
      // this.finger.transformY = this.$refs.list.getAttribute("scroll");
      this.finger.transformY = this.startDgY;
      event.preventDefault();
    },
    itemTouchMove(event) {
      let finger = event.changedTouches[0];
      this.finger.lastY = finger.pageY;
      this.finger.lastTime = event.timestamp || Date.now();
      /* 设置css */
      let move = this.finger.lastY - this.finger.startY;
      this.setStyle(move);
      event.preventDefault();
    },
    itemTouchEnd(event) {
      let finger = event.changedTouches[0];
      this.finger.lastY = finger.pageY;
      this.finger.lastTime = event.timestamp || Date.now();
      let move = this.finger.lastY - this.finger.startY;
      /* 计算速度 */
      /* 速度计算说明
           * 当时间小于300毫秒 最后的移动距离等于 move + 减速运动距离
           * */
      let time = this.finger.lastTime - this.finger.startTime;
      let v = move / time;
      /* 减速加速度a */
      let a = 1.8;
      /* 设置css */
      if (time <= 300) {
        move = v * a * time;
        time = 1000 + time * a;
        this.setStyle(move, "end", time);
      } else {
        this.setStyle(move, "end");
      }
    },
    /* 设置css */
    setStyle(move, type, time) {
      const singleHeight = 34;
      const deg = 20;
      const singleDeg = deg / singleHeight; // 每一度等于多少px
      let currentListMove = this.finger.transformY;
      let updateMove = move + Number(currentListMove); // scorll滚动距离
      /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
      if (this.type === "line") {
        if (updateMove > 0) {
          updateMove = 0;
        }
        if (updateMove < -(this.listData.length - 1) * singleHeight) {
          updateMove = -(this.listData.length - 1) * singleHeight;
        }
      }
      let updateDeg = -updateMove * singleDeg; // 根据滚动的直线距离计算圆应该滚动的角度

      let spinAim = Math.round(updateDeg / 20); // 每20度滚动一个，计算滚动个数

      let margin = Math.round(updateMove / singleHeight) * singleHeight; // scorll 滚动距离 整数 结束滚动的距离

      /* 计算touchEnd移动的整数距离 */
      let endMove = margin;
      let endDeg = Math.round(updateDeg / deg) * deg; // 滚动角度 整数 结束滚动角度

      // console.log(margin, endDeg);

      if (type === "end") {
        console.log(endMove);
        this.startDgY = endMove;
        // touch结束
        this.setListTransform(endMove, margin, type, time);
        this.setWheelDeg(endDeg, type, time);
        /* 设置$emit 延迟 */
        setTimeout(() => this.getPickValue(endMove), 1000);
      } else {
        this.updateMove = endMove;
        // touch - move 中
        this.setListTransform(updateMove, margin);
        this.setWheelDeg(updateDeg);
      }
      this.updateSpin(spinAim);
    },
    /* 更新spin */
    updateSpin(spinAim) {
      this.spin.start = this.spin.branch * -1 + spinAim;
      this.spin.end = this.spin.start + this.spin.branch * 2;
    },
    /* 整理数据 */
    getSpinData(index) {
      index = index % this.listData.length;
      return this.listData[index >= 0 ? index : index + this.listData.length];
    },
    /* 获取选中值 */
    getPickValue(move) {
      let index = Math.round(Math.abs(move / 34));
      let pickValue = this.getSpinData(index);
      // this.$emit("input", pickValue);
      // console.log(pickValue);
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener("touchstart", this.itemTouchStart);
    this.$el.removeEventListener("touchmove", this.itemTouchMove);
    this.$el.removeEventListener("touchend", this.itemTouchEnd);
  }
};
</script>

<style scoped>
html {
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "STHeitiSC-Light",
    "Arial", sans-serif;
  line-height: 1.8;
}

.pd-select-item {
  overflow: hidden;
  width: 100%;
  text-align: center;
  height: 220px;
  background: #fff;
  position: relative;
}

.pd-select-ul {
  position: relative;
  border: 1px solid red;
}

.pd-select-line,
.pd-select-list,
.pd-select-wheel {
  position: absolute;
  left: 0;
  right: 0;
  top: 93px;
}

.pd-select-line {
  z-index: 3;
}

.pd-select-list {
  z-index: 2;
  background: #fff;
  border: 1px solid red;
}

.pd-select-wheel {
  z-index: 1;
  text-align: right;
}

.pd-select-line:after,
.pd-select-line:before {
  position: absolute;
  top: 0;
  content: "";
  display: table;
  background: #2c97f1;
  width: 100%;
  height: 2px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.pd-select-line:before {
  bottom: -1px;
  top: auto;
}

.pd-select-line,
.pd-select-list {
  height: 34px;
  transform: translate3d(0px, 0px, 110px);
}

.pd-select-list {
  overflow: hidden;
}

.pd-select-list-item {
  text-shadow: 0 1px 1px rgba(102, 102, 102, 0.6);
  color: blue !important;
}

.pd-select-list-item,
.pd-select-wheel-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
  font-size: 18px;
  color: #a8a8a8;
}

.pd-select-wheel-item .hidden {
  visibility: hidden;
  opacity: 0;
}

.pd-select-wheel {
  transform-style: preserve-3d;
  height: 34px;
}

.pd-select-wheel-item {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  color: #a8a8a8;
  height: 34px;
}
</style>
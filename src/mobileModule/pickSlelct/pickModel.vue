<template>
  <div class="pick-select-item">
    <div class="pick-select-line" :style="{'height':`${liHeight}px`,'top':`${pHeight}px`}"></div>
    <div class="pick-select-list" :style="{'height':`${liHeight}px`,'top':`${pHeight}px`}">
      <ul class="pick-select-ul" ref="list">
        <li class="pick-select-list-item" :style="{'height':`${liHeight}px`}" v-for="(el,index) in renderData " :class="{'hidden':setHidden(el.index)}" :key="index">{{el.value}}{{postfix}}</li>
      </ul>
    </div>
    <ul class="pick-select-circle" :style="{'height':`${liHeight}px`,'top':`${pHeight}px`}" ref="circle">
      <li class="pick-select-circle-item" :class="{'hidden':setHidden(el.index)}" :style="setcircleItemDeg(el.index)" :index="el.index"
        v-for="(el,index) in renderData " :key="index">{{el.value}}{{postfix}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tempArr: [],
      stTime: "",
      liDeg: 25.7142, // 单个元素角度
      cCary: 100, // 半径
      pHeight: (206 - 44.5) / 2, // 居中定位
      liHeight: 44.5, // 单元素高度
      accelerated: 1.8, // 加速度
      spin: { start: -7, end: 7, branch: 7 }, // 选中上方，下方，以及展示页面个数
      finger: { startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0 }
    };
  },
  props: {
    postfix: {
      default: ""
    },
    listData: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "cycle" // line 非无限滚动 cycle 无限滚动
    },
    value: {}
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
    let self = this;
    // 初始化取值数据
    self.tempArr = [];
    for (let k = this.spin.start; k <= this.spin.end; k++) {
      let data = {
        value: this.getSpinData(k),
        index: k
      };
      self.tempArr.push(data);
    }
    /* 事件绑定 */
    this.$el.addEventListener("touchstart", this.itemTouchStart);
    this.$el.addEventListener("touchmove", this.itemTouchMove);
    this.$el.addEventListener("touchend", this.itemTouchEnd);
    this.$el.addEventListener("touchcancel", this.touchcancel);
    /* 初始化状态 */
    let index = this.listData.indexOf(self.value);
    if (index == -1) {
      this.setListTransform();
      this.getPickValue(0);
    } else {
      let move = index * this.liHeight;
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
    setcircleItemDeg(index) {
      return {
        transform: `rotate3d(1, 0, 0, ${(-index * this.liDeg) %
          360}deg) translate3d(0px, 0px, ${this.cCary}px)`,
        height: `${this.liHeight}px`
      };
    },
    // 下层圆进行旋转
    setcircleDeg(upickateDeg, type, time = 1000) {
      if (type === "end") {
        this.$refs.circle.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        this.$refs.circle.style.webkitTransform = `rotate3d(1, 0, 0, ${upickateDeg}deg)`;
      } else {
        this.$refs.circle.style.webkitTransition = "";
        this.$refs.circle.style.webkitTransform = `rotate3d(1, 0, 0, ${upickateDeg}deg)`;
      }
    },
    // 上层页面滚动
    setListTransform(translateY = 0, marginTop = 0, type, time = 1000) {
      if (type === "end") {
        this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        this.$refs.list.style.webkitTransform = `translateY(${translateY -
          this.spin.branch * this.liHeight}px)`;
        this.$refs.list.style.marginTop = `${-marginTop}px`;
        this.$refs.list.setAttribute("scroll", translateY); // 设置scroll滚动距离 每次滚动时进行计算
      } else {
        this.$refs.list.style.webkitTransition = "";
        this.$refs.list.style.webkitTransform = `translateY(${translateY -
          this.spin.branch * this.liHeight}px)`;
        this.$refs.list.style.marginTop = `${-marginTop}px`; // 相互抵消UL的滚动
        this.$refs.list.setAttribute("scroll", translateY); // 设置scroll滚动距离 每次滚动时进行计算
      }
    },
    itemTouchStart(event) {
      let finger = event.changedTouches[0];
      this.finger.startY = finger.pageY; // 开始的Y值
      this.finger.startTime = event.timestamp || Date.now(); // 拖动起始时间
      this.finger.transformY = this.$refs.list.getAttribute("scroll");
      event.preventDefault();
    },
    itemTouchMove(event) {
      let finger = event.changedTouches[0];
      this.finger.lastY = finger.pageY;
      this.finger.lastTime = event.timestamp || Date.now();
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
           * 当时间小于300毫秒(相当于快速滑动) 最后的移动距离等于 move + 减速运动距离
           * */
      let time = this.finger.lastTime - this.finger.startTime;
      let v = move / time; // 运动距离 / 运动时间
      if (time <= 300) {
        move = v * this.accelerated * time;
        time = 1000 + time * this.accelerated;
        this.setStyle(move, "end", time);
      } else {
        this.setStyle(move, "end");
      }
    },
    // ios 上滑出现控制中心时 防止无法回归
    touchcancel(event) {
      let finger = event.changedTouches[0];
      this.finger.lastY = finger.pageY;
      this.finger.lastTime = event.timestamp || Date.now();
      let move = this.finger.lastY - this.finger.startY;
      /* 计算速度 */
      /* 速度计算说明
           * 当时间小于300毫秒(相当于快速滑动) 最后的移动距离等于 move + 减速运动距离
           * */
      let time = this.finger.lastTime - this.finger.startTime;
      let v = move / time; // 运动距离 / 运动时间
      if (time <= 300) {
        move = v * this.accelerated * time;
        time = 1000 + time * this.accelerated;
        this.setStyle(move, "end", time);
      } else {
        this.setStyle(move, "end");
      }
    },
    /* 设置css */
    setStyle(move, type, time) {
      const singleDeg = this.liDeg / this.liHeight; // 每一度等于多少px
      let currentListMove = this.finger.transformY;
      let upickateMove = move + Number(currentListMove); // scorll滚动距离
      /* 根据滚轮类型 line or cycle 判断 upickateMove最大距离 */
      if (this.type === "line") {
        if (upickateMove > 0) {
          upickateMove = 0;
        }
        // 非无限滚动，滚动最大距离不能超过 数组长度*当前高度
        if (upickateMove < -(this.listData.length - 1) * this.liHeight) {
          upickateMove = -(this.listData.length - 1) * this.liHeight;
        }
      }
      let upickateDeg = -upickateMove * singleDeg; // 根据滚动的直线距离计算圆应该滚动的角度
      let spinAim = Math.round(upickateDeg / this.liDeg); // 根据单个角度计算个数
      let margin = Math.round(upickateMove / this.liHeight) * this.liHeight; // scorll 滚动距离 整数 结束滚动的距离
      /* 计算touchEnd移动的整数距离 */
      let endMove = margin;
      let endDeg = Math.round(upickateDeg / this.liDeg) * this.liDeg; // 滚动角度 整数 结束滚动角度
      this.upickateSpin(spinAim);
      if (type === "end") {
        // touch结束
        this.setListTransform(endMove, margin, type, time);
        this.setcircleDeg(endDeg, type, time);
        /* 设置$emit 延迟 */
        // clearTimeout(this.stTime);
        setTimeout(() => this.getPickValue(endMove), 0);
      } else {
        // touch - move 中
        this.setListTransform(upickateMove, margin);
        this.setcircleDeg(upickateDeg);
      }
    },
    /* 更新数据源 */
    upickateSpin(spinAim) {
      let self = this;
      this.spin.start = this.spin.branch * -1 + spinAim;
      this.spin.end = this.spin.start + this.spin.branch * 2;
      self.tempArr = [];
      for (let k = this.spin.start; k <= this.spin.end; k++) {
        let data = {
          value: this.getSpinData(k),
          index: k
        };
        self.tempArr.push(data);
      }
    },
    /* 整理数据 */
    getSpinData(index) {
      index = index % this.listData.length;
      return this.listData[index >= 0 ? index : index + this.listData.length];
    },
    /* 获取选中值 */
    getPickValue(move) {
      let index = Math.round(Math.abs(move / this.liHeight));
      this.$emit("input", this.tempArr[this.spin.branch].value);
      this.$emit("change", {
        value: this.tempArr[this.spin.branch].value,
        start: this.spin.start,
        end: this.spin.end
      });
    }
  },
  watch: {
    value: {
      handler(val) {
        var self = this;
      },
      deep: true
    },
    listData(val) {
      let self = this;
      self.$nextTick(function() {
        this.$emit("change", {
          value: this.tempArr[this.spin.branch].value,
          start: this.spin.start,
          end: this.spin.end
        });
      });
    }
  },
  updated() {},
  beforeDestroy() {
    this.$el.removeEventListener("touchstart", this.itemTouchStart);
    this.$el.removeEventListener("touchmove", this.itemTouchMove);
    this.$el.removeEventListener("touchend", this.itemTouchEnd);
    this.$el.removeEventListener("touchcancel", this.touchcancel);
  }
};
</script>

<style scoped>
.pick-select-line {
  z-index: 3;
  width: 100%;
}

.pick-select-list {
  transform: translate3d(0px, 0px, 100px);
}
.pick-select-list-item,
.pick-select-circle-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pick-select-circle {
  transform-style: preserve-3d;
  margin: 0;
  padding: 0;
}

.pick-select-circle-item {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  color: #c0c0c0;
  margin: 0;
  padding: 0;
}

.pick-select-item {
  overflow: hidden;
  width: 100%;
  text-align: center;
  height: 206px;
  background: #fff;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.pick-select-ul {
  position: relative;
}

.pick-select-line,
.pick-select-list,
.pick-select-circle {
  position: absolute;
  left: 0;
  right: 0;
}

.pick-select-list {
  z-index: 2;
  background: #fff;
}

.pick-select-circle {
  z-index: 1;
}

.pick-select-line:after,
.pick-select-line:before {
  position: absolute;
  top: 0;
  content: "";
  display: block;
  background: rgba(195, 222, 250, 1);
  width: 100%;
  height: 2px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.pick-select-line:before {
  bottom: -1px;
  top: auto;
}

.pick-select-list {
  overflow: hidden;
}

.pick-select-list-item {
  text-shadow: 0 1px 1px rgba(102, 102, 102, 0.6);
  color: #2c2c2c !important;
}

.pick-select-circle-item .hidden {
  visibility: hidden;
  opacity: 0;
}
</style>
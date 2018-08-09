<template>
  <div class="pick-content">
    <div class="numPicker-bottom">
      <div id="numPicker-main">
        <ul ref="list" id="numPicker-mainUl" @touchstart="pockerShowTouchstart($event)" @touchmove="pockerShowTouchmove($event)" @touchend="pockerShowTouchend($event)">
          <li class="numPicker-li" v-for="(item,index) in listData" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="numPicker-bottom-select">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    postfix: {
      default: ""
    },
    defIndex: {
      default: "1"
    },
    defStateIndex: {
      default: "1"
    },
    selectIndex: {
      default: "1"
    },
    pockerunit: {
      default: "1"
    },
    listData: {
      type: Array,
      default: [1, 2, 3, 4, 5, 6]
    },
    type: {
      type: String,
      default: "cycle" // line 非无限滚动 cycle 无限滚动
    },
    value: {}
  },
  data() {
    return {
      tempArr: [],
      stTime: "",
      liHeight: 48, // 单元素高度
      accelerated: 1.8, // 加速度
      spin: { start: -5, end: 5, branch: 5 }, // 选中上方，下方，以及展示页面个数
      finger: { startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0 }
    };
  },
  created: function() {
    var self = this;
  },
  mounted: function() {},
  update() {
    var self = this;
    self.listArrFun();
  },
  watch: {},
  update() {},
  methods: {
    listArrFun() {
      var self = this;
    },
    cancelClick(event) {
      var self = this;
    },
    confirmClick(event) {
      var self = this;
      event.preventDefault();
    },
    setStyle(move, type, time) {
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
      console.log(upickateMove, currentListMove, move, "移动");
      // let spinAim = Math.round(upickateDeg / this.liDeg); // 根据单个角度计算个数
      // let margin = Math.round(upickateMove / this.liHeight) * this.liHeight; // scorll 滚动距离 整数 结束滚动的距离
      // /* 计算touchEnd移动的整数距离 */
      // let endMove = margin;
      // let endDeg = Math.round(upickateDeg / this.liDeg) * this.liDeg; // 滚动角度 整数 结束滚动角度
      // this.upickateSpin(spinAim);
      // if (type === "end") {
      //   // touch结束
      //   this.setListTransform(endMove, margin, type, time);
      // } else {
      //   // touch - move 中
      //   this.setListTransform(upickateMove, margin);
      // }
    },
    // 滚动事件
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
    pockerShowTouchstart(event) {
      event.preventDefault();

      let finger = event.changedTouches[0];
      this.finger.startY = finger.pageY; // 开始的Y值
      this.finger.startTime = event.timestamp || Date.now(); // 拖动起始时间
      this.finger.transformY = this.$refs.list.getAttribute("scroll");
      event.preventDefault();
      console.log(this.finger.startY, this.finger.transformY, "开始");
    },
    pockerShowTouchmove(event) {
      event.preventDefault();
      var self = this;
      let finger = event.changedTouches[0];
      this.finger.lastY = finger.pageY;
      this.finger.lastTime = event.timestamp || Date.now();
      let move = this.finger.lastY - this.finger.startY;
      this.setStyle(move);
      event.preventDefault();
      // console.log(this.finger.startY, this.finger.lastY, move, "移动");
    },
    pockerShowTouchend(event) {
      var self = this;
      console.log(event, "结束");
    }
  }
};
</script>
<style scoped>
.numPicker-top {
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.numPicker-bottom {
  width: 100%;
  height: 230px;
  position: relative;
  border: 1px solid red;
  overflow: hidden;
}

.numPicker-cencel,
.numPicker-confirm {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #4390e1;
}

.numPicker-confirm {
  margin-right: 18px;
}

.numPicker-cencel {
  margin-left: 18px;
}

.numPicker-li {
  height: 48px;
  width: 100%;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
}

#numPicker-main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 240px;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 1000000000;
}

#numPicker-mainUl {
  overflow: hidden;
}

.numPicker-li:nth-child(1) {
  margin-top: 96px;
}

.numPicker-li:nth-last-of-type(1) {
  margin-bottom: 96px;
}

.numPicker-bottom-select {
  position: absolute;
  top: 96px;
  left: 0;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #c3defa;
  border-top: 1px solid #c3defa;
}

.pick-content {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 240px;
  background-color: #fff;
  z-index: 10000000000000000000;
}
</style>
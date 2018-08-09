<template>
  <div class="pick-content" v-show="viewTrue">
    <div class="pick-content-top" @click="cancelClick($event)">

    </div>
    <div class="pick-content-content">
      <div class="numPicker-top">
        <div class="numPicker-cencel" @click="cancelClick($event)">
          取消
        </div>
        <div class="numPicker-confirm" @click="confirmClick($event)">
          确定
        </div>
      </div>
      <div class="numPicker-bottom">
        <div id="numPicker-main">
          <ul id="numPicker-mainUl" :style="{'transform':istranslate3d,'transition':istransition,'webkitTransform':iswebkitTransform,'webkitTransition':iswebkitTransition}"
            @touchstart="pockerShowTouchstart($event)" @touchmove="pockerShowTouchmove($event)" @touchend="pockerShowTouchend($event)">
            <li class="numPicker-li" v-for="(item,index) in numLists" :key="index">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="numPicker-bottom-select">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 单选弹出
  props: ["numLists", "defIndex", "defStateIndex", "pockerunit", "selectIndex"],
  data() {
    return {
      viewTrue: false,
      defState: "",
      pockerShowstartY: 0,
      pockerShowEndY: 0,
      pockerShowMoveY: 0,
      maxHeight: 0,
      temps: 0,
      topLinst: 48,
      istranslate3d: "translate3d(0, 0, 0)",
      iswebkitTransform: "translate3d(0, 0, 0)",
      istransition: "transform 0.2s ease-out",
      iswebkitTransition: "transform 0.2s ease-out"
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
  watch: {
    defStateIndex: {
      handler(val) {},
      deep: true
    },
    pockerunit: function(val) {
      var self = this;
      this.viewTrue = val;
      self.defState = this.defStateIndex;
      self.listArrFun();
    },
    numLists: {
      handler(newValue, oldValue) {},
      deep: true
    }
  },
  update() {},
  methods: {
    listArrFun() {
      var self = this;
      this.maxHeight = this.numLists.length * self.topLinst - self.topLinst;
      if (
        self.defIndex * self.topLinst - self.topLinst >=
        this.numLists.length * self.topLinst - self.topLinst
      ) {
        self.istranslate3d =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.temps = self.numLists.length * self.topLinst - self.topLinst;
      } else {
        self.istranslate3d =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.temps = self.defIndex * self.topLinst;
      }
    },
    cancelClick(event) {
      var self = this;
      event.preventDefault();
      this.$emit(
        "cancel",
        self.numLists[self.temps / self.topLinst],
        self.defState
      );
      if (
        self.defIndex * self.topLinst - self.topLinst >=
        this.numLists.length * self.topLinst - self.topLinst
      ) {
        self.istranslate3d =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.temps = self.numLists.length * self.topLinst - self.topLinst;
      } else {
        self.istranslate3d =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.temps = self.defIndex * self.topLinst;
      }
    },
    confirmClick(event) {
      var self = this;
      event.preventDefault();
      this.$emit(
        "confirm",
        self.numLists[self.temps / self.topLinst],
        self.defState
      );
      if (
        self.defIndex * self.topLinst - self.topLinst >=
        this.numLists.length * self.topLinst - self.topLinst
      ) {
        self.istranslate3d =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.temps = self.numLists.length * self.topLinst - self.topLinst;
      } else {
        self.istranslate3d =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.temps = self.defIndex * self.topLinst;
      }
    },
    opFun() {
      var self = this;
      if (
        self.defIndex * self.topLinst - self.topLinst >=
        this.numLists.length * self.topLinst - self.topLinst
      ) {
        self.istranslate3d =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" +
          (self.numLists.length * self.topLinst - self.topLinst) +
          "px, 0)";
        self.temps = self.numLists.length * self.topLinst - self.topLinst;
      } else {
        self.istranslate3d =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.iswebkitTransform =
          "translate3d(0, -" + self.defIndex * self.topLinst + "px, 0)";
        self.temps = self.defIndex * self.topLinst;
      }
    },
    pockerShowTouchstart(event) {
      // event.preventDefault();
      this.pockerShowstartY = 0;
      this.pockerShowstartY = event.changedTouches[0].pageY;
    },
    pockerShowTouchmove(event) {
      // event.preventDefault();
      var self = this;
      this.pockerShowMoveY = event.changedTouches[0].pageY;
      var moveNum = this.pockerShowstartY - this.pockerShowMoveY;
      if (self.temps == self.maxHeight || self.temps == 0) {
      } else {
        if (self.temps == 0 && moveNum < 0) {
          self.istranslate3d =
            "translate3d(0, " + 2.5 * self.topLinst + "px, 0)";
          self.iswebkitTransform =
            "translate3d(0, " + 2.5 * self.topLinst + "px, 0)";
        } else {
          self.istranslate3d =
            "translate3d(0, -" + (self.temps + moveNum) + "px, 0)";
          self.iswebkitTransform =
            "translate3d(0, -" + (self.temps + moveNum) + "px, 0)";
        }
      }
    },
    pockerShowTouchend(event) {
      event.preventDefault();
      var self = this;
      this.pockerShowEndY = 0;
      this.pockerShowEndY = Math.abs(event.changedTouches[0].pageY);
      var tempDis = self.temps + (this.pockerShowstartY - this.pockerShowEndY);
      self.temps =
        tempDis < 0 ? 0 : tempDis < self.maxHeight ? tempDis : self.maxHeight;
      var yNumber = self.temps % self.topLinst;
      if (yNumber < self.topLinst / 2) {
        self.temps = self.temps - yNumber;
      } else {
        self.temps = self.temps + (self.topLinst - yNumber);
      }
      self.istranslate3d = "translate3d(0, -" + self.temps + "px, 0)";
      self.iswebkitTransform = "translate3d(0, -" + self.temps + "px, 0)";
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

.pick-content-top {
  width: 100%;
  height: calc(100vh - 290px);
}

.pick-content-content {
  height: 290px;
  width: 100%;
  background-color: #fff;
}

.numPicker-bottom {
  width: 100%;
  height: 240px;
  position: relative;
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10000000000000000000;
}
</style>
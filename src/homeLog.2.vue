<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <div class="pick">
      <div class="pickLi">
        <div class="pickList" v-for="(item,index) in 12" :key="index">
          {{item}}
        </div>
      </div>
      <div class="pickLiB pickLi">
        <ul class="pickLiUl" :style="{'transform':istranslate3d,'transition':istransition,'webkitTransform':iswebkitTransform,'webkitTransition':iswebkitTransition}"
          @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
          <li class="pickList"></li>
          <li class="pickList"></li>
          <li class="pickList" v-for="(item,index) in mLists" :key="index">
            {{item}}
          </li>
          <li class="pickList"></li>
          <li class="pickList"></li>
        </ul>
      </div>
      <div class="pickLi">
        <div class="pickList" v-for="(item,index) in 60" :key="index">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  components: {
    "v-pickModel": pickModel
  },
  data() {
    return {
      hLists: [],
      mLists: [],
      sLists: [],
      istranslate3d: "translate3d(0, 0, 0)",
      iswebkitTransform: "translate3d(0, 0, 0)",
      istransition: "transform 500ms cubic-bezier(0.1, 0.57, 0.1, 1)",
      iswebkitTransition: "transform 500ms cubic-bezier(0.1, 0.57, 0.1, 1)",
      pockerShowstartY: 0,
      pockerShowMoveY: 0,
      maxHeight: 0,
      topLinst: 40,
      temps: 0,
      pockerShowEndTime: 0,
      pockerShowstartTime: 0,

      startX: 0,
      translateX: 0,
      startFinger: 0,
      maxWidth: 0,
      lastTime: 0
    };
  },
  methods: {
    touchStart(e) {
      e.stopPropagation();
      this.lastTime = new Date().getTime();
      this.startFinger = e.changedTouches[0].clientY;
      this.startX = this.translateX;
    },
    touchMove(e) {
      e.stopPropagation();
      var self = this;
      let nowFinger = e.changedTouches[0].clientY;
      let distance = nowFinger - this.startFinger;
      this.translateX = distance + this.startX;
      // 加速滚动 * 0.8
      if (this.translateX > 0) {
        this.translateX *= 0.8;
      } else if (this.translateX < -this.maxWidth) {
        this.translateX = distance * 0.8 + this.startX;
      }
      self.istranslate3d = "translate3d(0, " + self.translateX + "px, 0)";
      self.iswebkitTransform = "translate3d(0, " + self.translateX + "px, 0)";
    },
    touchEnd(e) {
      e.stopPropagation();
      var slide = document.querySelector(".pickLiB");
      var nav = document.querySelector(".pickLiUl");
      this.maxWidth = nav.offsetHeight - slide.offsetHeight;
      var self = this;
      var endTime = new Date().getTime();
      var nowFinger = e.changedTouches[0].clientY,
        distance = nowFinger - this.startFinger, //距离差
        timeDis = endTime - this.lastTime, //时间差
        speed = distance / timeDis * 100; // 滚动惯性距离
      // 惯性
      this.translateX += speed;
      // 边界 回弹
      if (this.translateX > 0) {
        this.translateX = 0;
      } else if (this.translateX < -this.maxWidth) {
        this.translateX = -this.maxWidth;
      }
      this.translateX =
        Math.round(self.translateX / self.topLinst) * self.topLinst;
      // self.temps =
      //   tempDis < 0 ? 0 : tempDis < self.maxHeight ? tempDis : self.maxHeight;
      // var yNumber = self.temps % self.topLinst;
      // if (yNumber < self.topLinst / 2) {
      //   self.temps = self.temps - yNumber;
      // } else {
      //   self.temps = self.temps + (self.topLinst - yNumber);
      // }
      // if (this.translateX < -600 && this.translateX > -1200) {
      //   for (var i = 0; i < 20; i++) {
      //     self.mLists.push(i);
      //   }
      // }
      // if (this.translateX < -600) {
      //   for (var i = 0; i < 20; i++) {
      //     self.mLists.push(i);
      //   }
      // }
      self.istranslate3d = "translate3d(0, " + self.translateX + "px, 0)";
      self.iswebkitTransform = "translate3d(0, " + self.translateX + "px, 0)";
    }
  },
  created: function() {
    var self = this;
    this.maxHeight = 60 * self.topLinst - self.topLinst;
    self.temps = 1 * self.topLinst;
    for (var i = 0; i < 2; i++) {
      self.mLists.push(i);
    }
  },
  mounted() {
    var slide = document.querySelector(".pickLiB");
    var nav = document.querySelector(".pickLiUl");
    this.maxWidth = nav.offsetHeight - slide.offsetHeight;
  },
  watch: {},
  filters: {}
};
</script>
<style>
.pickList {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  width: 100%;
  border: 1px solid red;
}

.pickLiUl {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
}

.pickLi {
  width: 33.33333333333%;
  height: 200px;
  overflow: hidden;
  /* -webkit-overflow-scrolling: touch; */
}

.pick {
  width: 100%;
  height: 200px;
  display: flex;
}
</style>
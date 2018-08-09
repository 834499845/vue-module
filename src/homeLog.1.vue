<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    <div class="pick">
      <div class="pickLi">
        <div class="pickList" v-for="(item,index) in 12" :key="index">
          {{item}}
        </div>
      </div>
      <div class="pickLi">
        <ul class="pickLiUl" :style="{'transform':istranslate3d,'transition':istransition,'webkitTransform':iswebkitTransform,'webkitTransition':iswebkitTransition}"
          @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
          <li class="pickList" v-for="(item,index) in 60" :key="index">
            {{item}}
          </li>
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
export default {
  data() {
    return {
      hLists: [],
      mLists: [],
      sLists: [],
      istranslate3d: "translate3d(0, 0, 0)",
      iswebkitTransform: "translate3d(0, 0, 0)",
      istransition: "transform 0.2s linear",
      iswebkitTransition: "transform 0.2s linear",
      pockerShowstartY: 0,
      pockerShowMoveY: 0,
      maxHeight: 0,
      topLinst: 40,
      temps: 0,
      pockerShowEndTime: 0,
      pockerShowstartTime: 0
    };
  },
  components: {},
  methods: {
    touchStart(e) {
      this.pockerShowstartY = 0;
      this.pockerShowstartY = event.changedTouches[0].pageY;
      this.pockerShowstartTime = new Date().getTime();
    },
    touchMove(e) {
      var self = this;
      this.pockerShowMoveY = event.changedTouches[0].pageY;
      var moveNum = this.pockerShowstartY - this.pockerShowMoveY;
      // console.log(moveNum);
      if (self.temps == self.maxHeight || self.temps == 0) {
      } else {
        // console.log(self.topLinst);
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
    touchEnd(e) {
      var self = this;
      this.pockerShowEndTime = new Date().getTime();
      console.log(
        this.pockerShowEndTime - this.pockerShowstartTime,
        this.pockerShowstartY,
        event.changedTouches[0].pageY
      );
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
      // self.istranslate3d = "translate3d(0, -" + self.temps + "px, 0)";
      // self.iswebkitTransform = "translate3d(0, -" + self.temps + "px, 0)";
    }
  },
  created: function() {
    var self = this;
    this.maxHeight = 60 * self.topLinst - self.topLinst;
    self.temps = 1 * self.topLinst;
  },
  mounted() {},
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
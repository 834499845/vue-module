// 时分秒
<template>
  <div class="timeModelMian" v-if="isDateShow">
    <div class="pickBg" @click="cancelClick">
    </div>
    <div class="pickMain">
      <div class="butPick">
        <div class="butPickLeft" @click="cancelClick">
          取消
        </div>
        <div class="butPickRight" @click="confimClick">
          确认
        </div>
      </div>
      <div class="pickList">
        <pickModel v-show="type > 0" @change="changeYarClick" :listData="hDatas" v-model="hVal" :postfix="yarnfix"></pickModel>
        <pickModel v-show="type > 1" @change="changeMouClick" :listData="mDatas" v-model="mVal" :postfix="mouthfix"></pickModel>
        <pickModel v-show="type > 2" @change="changeDayClick" :listData="dDatas" v-model="sVal" :postfix="dayfix"></pickModel>
      </div>
    </div>
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  components: {
    pickModel
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    endDate: {}, // 设置开始和结束时间
    startDate: {},
    yarnfix: {}, // 时分秒后缀
    mouthfix: {},
    dayfix: {},
    type: {
      default: "3" // 1 只有时 2 时分 3 时分秒
    },
    value: {} // 最终值
  },
  data() {
    return {
      isDateShow: false,
      hDatas: [],
      mDatas: [],
      dDatas: [],
      hVal: 0,
      mVal: 0,
      sVal: 0,
      cutH: { start: 0, end: 23 }, // 时 截止
      cutM: { start: 0, end: 59 }, // 分 截止
      cutS: { start: 0, end: 59 }, // 秒 截止
      newTime: {
        y: 0,
        m: 0,
        d: 0,
        h: 0,
        min: 0,
        s: 0
      }
    };
  },
  methods: {
    // 取消
    cancelClick() {
      this.$emit("click", "cancel");
    },
    // 确认
    confimClick() {
      let timeStr = `${this.hVal}:${this.mVal}:${this.sVal}`;
      this.$emit("click", timeStr);
      this.$emit("input", timeStr);
    },
    // 分跟随时变更
    changeYarClick(val) {
      let self = this;
      self.hVal = val.value;
      if (self.startDate) {
        let hStartVal,
          mStartVal,
          sStartVal = "";
        let startDate = new Date(`2018/04/25 ${self.startDate}`);
        hStartVal = startDate.getHours();
        mStartVal = startDate.getMinutes();
        sStartVal = startDate.getSeconds();
        if (self.hVal == hStartVal) {
          self.cutM.start = mStartVal;
        } else {
          self.cutM.start = 0;
        }
      } else {
        self.cutM.start = 0;
      }
      if (self.endDate) {
        let hEndVal,
          mEndVal,
          dEndVal = "";
        let endDate = new Date(`2018/04/25 ${self.endDate}`);
        hEndVal = endDate.getHours();
        mEndVal = endDate.getMinutes();
        dEndVal = endDate.getSeconds();
        if (self.hVal == hEndVal) {
          self.cutM.end = mEndVal;
        } else {
          self.cutM.end = 59;
        }
      } else {
        self.cutM.end = 59;
      }
      self.mListFun();
    },
    // 秒数随分变更
    changeMouClick(val) {
      let self = this;
      self.mVal = self.getSpinData(self.mDatas, val);
      if (self.startDate) {
        let hStartVal,
          mStartVal,
          sStartVal = "";
        let startDate = new Date(`2018/04/25 ${self.startDate}`);
        hStartVal = startDate.getHours();
        mStartVal = startDate.getMinutes();
        sStartVal = startDate.getSeconds();
        if (self.hVal == hStartVal && self.mVal == mStartVal) {
          self.cutS.start = sStartVal;
        } else {
          self.cutS.start = 1;
        }
      } else {
        self.cutS.start = 1;
      }
      if (self.endDate) {
        let hEndVal,
          mEndVal,
          dEndVal = "";
        let endDate = new Date(`2018/04/25 ${self.endDate}`);
        hEndVal = endDate.getHours();
        mEndVal = endDate.getMinutes();
        dEndVal = endDate.getSeconds();
        if (self.hVal == hEndVal && self.mVal == mEndVal) {
          self.cutS.end = dEndVal;
        } else {
          self.cutS.end = 59;
        }
      } else {
        self.cutS.end = 59;
      }
      self.sListFun();
    },
    // 天选中
    changeDayClick(val) {
      let self = this;
      self.sVal = self.getSpinData(self.dDatas, val);
    },
    // 时分秒
    listsFun(pDate) {
      let self = this;
      let hSelectVal,
        mSelectVal,
        sSelectVal = "";
      // 设置选中时间
      if (pDate) {
        let date = new Date(`2018/04/25 ${pDate}`);
        hSelectVal = self.decimalismFun(date.getHours());
        mSelectVal = self.decimalismFun(date.getMinutes());
        sSelectVal = self.decimalismFun(date.getSeconds());
      } else {
        hSelectVal = self.newTime.h;
        mSelectVal = self.newTime.min;
        sSelectVal = self.newTime.s;
      }
      // 截止时间
      let hEndVal,
        mEndVal,
        dEndVal = "";
      if (self.endDate) {
        let endDate = new Date(`2018/04/25 ${self.endDate}`);
        hEndVal = endDate.getHours();
        mEndVal = endDate.getMinutes();
        dEndVal = endDate.getSeconds();

        self.cutH.end = hEndVal;
        if (hSelectVal == hEndVal) {
          self.cutM.end = mEndVal;
        } else {
          self.cutM.end = 59;
        }
        if (hSelectVal == hEndVal && mSelectVal == mEndVal) {
          self.cutS.end = dEndVal;
        } else {
          self.cutS.end = 59;
        }
      } else {
        self.cutH.end = 23;
        self.cutM.end = 59;
        self.cutS.end = 59;
      }
      // 开始时间
      if (self.startDate) {
        let hStartVal,
          mStartVal,
          sStartVal = "";
        let startDate = new Date(`2018/04/25 ${self.startDate}`);
        hStartVal = startDate.getHours();
        mStartVal = startDate.getMinutes();
        sStartVal = startDate.getSeconds();
        self.cutH.start = hStartVal;
        if (hSelectVal == hStartVal) {
          self.cutM.start = mStartVal;
        } else {
          self.cutM.start = 0;
        }
        if (hSelectVal == hStartVal && mSelectVal == mStartVal) {
          self.cutS.start = sStartVal;
        } else {
          self.cutS.start = 0;
        }
      } else {
        self.cutH.start = 0;
        self.cutM.start = 0;
        self.cutS.start = 0;
      }
      // 时
      self.hListFun();
      self.hVal = `${hSelectVal}`;
      // 分
      self.mListFun();
      self.mVal = `${mSelectVal}`;
      // 秒
      self.sListFun();
      self.sVal = `${sSelectVal}`;
    },
    // 时 数据变更
    hListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutH.start; k <= self.cutH.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.hDatas = arr;
    },
    // 分 数据变更
    mListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutM.start; k <= self.cutM.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.mDatas = arr;
    },
    // 秒 数据变更
    sListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutS.start; k <= self.cutS.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.dDatas = arr;
    },
    // 获取选中值
    getSpinData(arr, val) {
      let self = this;
      let tempArr = [];
      for (let k = val.start; k <= val.end; k++) {
        let index = k % arr.length;
        let valStr = arr[index >= 0 ? index : index + arr.length];
        let data = {
          value: valStr,
          index: k
        };
        tempArr.push(data);
      }
      let selectVal = tempArr[7].value;
      return selectVal;
    },
    // 十进一
    decimalismFun(val) {
      return `${val > 9 ? `${val}` : `0${val}`}`;
    },
    // 获取当前时间
    newDateFun() {
      let date = new Date();
      this.newTime.y = date.getFullYear();
      this.newTime.m = this.decimalismFun(date.getMonth() + 1);
      this.newTime.d = this.decimalismFun(date.getDate());
      this.newTime.h = this.decimalismFun(date.getHours());
      this.newTime.min = this.decimalismFun(date.getMinutes());
      this.newTime.s = this.decimalismFun(date.getSeconds());
      this.listsFun(this.value);
    }
  },
  created: function() {
    this.newDateFun();
  },
  computed: {},
  mounted() {},
  watch: {
    // 显示隐藏状态
    show(val) {
      this.isDateShow = val;
    }
  },
  filters: {}
};
</script>
<style>
.pickBg {
  height: calc(100vh - 256px);
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
}

.pickMain {
  height: 256px;
  display: flex;
  flex-wrap: wrap;
}

.butPickLeft {
  width: 90px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: rgba(67, 144, 225, 1);
  margin-left: 17px;
}

.butPickRight {
  width: 90px;
  height: 50px;
  font-size: 16px;
  color: rgba(67, 144, 225, 1);
  line-height: 50px;
  margin-right: 17px;
  text-align: right;
}

.butPick {
  height: 50px;
  width: 100vw;
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pickList {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-color: #fff;
  height: 206px;
}

.timeModelMian {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-wrap: wrap;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
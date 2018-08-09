<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="timeModelMian" v-show="isDataShow">
    <div class="pickClor" @click="calicClick">

    </div>
    <div class="pickMain">
      <div class="butPick">
        <div class="butPickLeft" @click="calicClick">
          取消
        </div>
        <div class="butPickRight" @click="confimClick">
          确认
        </div>
      </div>
      <div class="pickList" v-if="type == 'time'">
        <v-pickModel :listData="houDatas" v-model="houVal"></v-pickModel>
        <v-pickModel :listData="minDatas" v-model="minVal"></v-pickModel>
        <!-- <v-pickModel :listData="secDatas" v-model="secVal"></v-pickModel> -->
      </div>
      <div class="pickList" v-else-if="type == 'date'">
        <v-pickModel :listData="yarDatas" v-model="yarVal" :postfix="yarnfix"></v-pickModel>
        <v-pickModel @change="changeMouClick" :listData="mouDatas" v-model="mouVal" :postfix="mouthfix"></v-pickModel>
        <v-pickModel :listData="dayDatas" v-model="dayVal" :postfix="dayfix"></v-pickModel>
      </div>
      <div class="pickList" v-else-if="type == 'datetime'">
        <v-pickModel :listData="yarDatas" v-model="yarVal" :postfix="yarnfix"></v-pickModel>
        <v-pickModel @change="changeMouClick" :listData="mouDatas" v-model="mouVal" :postfix="mouthfix"></v-pickModel>
        <v-pickModel :listData="dayDatas" v-model="dayVal" :postfix="dayfix"></v-pickModel>
        <v-pickModel :listData="houDatas" v-model="houVal"></v-pickModel>
        <v-pickModel :listData="minDatas" v-model="minVal"></v-pickModel>
        <!-- <v-pickModel :listData="secDatas" v-model="secVal"></v-pickModel> -->
      </div>
    </div>
    <!-- <div>
      {{yarVal}}-{{mouVal}}-{{dayVal}}-{{houVal}}-{{minVal}}-{{secVal}}
    </div> -->
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  components: {
    "v-pickModel": pickModel
  },
  props: {
    DataShow: {
      type: Boolean,
      default: false
    },
    yarnfix: {},
    mouthfix: {},
    dayfix: {},
    type: {
      type: String,
      default: "time" // time 时分秒 date 年月日 datetime 年月日时分秒
    },
    value: {}
  },
  data() {
    return {
      isDataShow: false,
      yarDatas: [],
      mouDatas: [],
      dayDatas: [],
      houDatas: [],
      minDatas: [],
      secDatas: [],
      yarVal: 1,
      mouVal: 1,
      dayVal: 1,
      houVal: 1,
      minVal: 1,
      secVal: 1
    };
  },
  methods: {
    // 取消
    calicClick() {
      this.$emit("click", "cancel");
    },
    // 确认
    confimClick() {
      var timeStr = "";
      if (this.type == "time") {
        timeStr = `${this.houVal}:${this.minVal}`;
      } else if (this.type == "date") {
        timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal}`;
      } else if (this.type == "datetime") {
        timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal} ${
          this.houVal
        }:${this.minVal}:${this.secVal}`;
      }
      this.$emit("click", timeStr);
      this.$emit("input", timeStr);
    },
    changeMouClick() {
      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = [];
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
    },
    mGetDate(year, month) {
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    dtFun() {
      let date = new Date();
      let newYarStr = date.getFullYear();
      let temp = [];
      for (let k = -10; k <= 10; k++) {
        let data = `${newYarStr * 1 + k}`;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${newYarStr}`;
      this.mouDatas = Array.from(
        { length: 12 },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      this.mouVal =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
      this.dayVal =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      this.houDatas = Array.from(
        { length: 24 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
      this.secDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.secVal =
        date.getSeconds() > 9
          ? `${date.getSeconds()}`
          : `0${date.getSeconds()}`;
    },
    timeDateFun(t) {
      let date = new Date();
      if (t) {
        date = new Date(t);
      } else {
        date = new Date();
      }

      let newYarStr = date.getFullYear();
      let temp = [];
      for (let k = -10; k <= 10; k++) {
        let data = `${newYarStr * 1 + k}`;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${newYarStr}`;
      this.mouDatas = Array.from(
        { length: 12 },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      this.mouVal =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
      this.dayVal =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      this.houDatas = Array.from(
        { length: 24 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
      this.secDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.secVal =
        date.getSeconds() > 9
          ? `${date.getSeconds()}`
          : `0${date.getSeconds()}`;
    },
    dateFun(t) {
      let date = new Date();
      if (t) {
        date = new Date(`${t} 00:00:00`);
      } else {
        date = new Date();
      }
      let newYarStr = date.getFullYear();
      let temp = [];
      for (let k = -10; k <= 10; k++) {
        let data = newYarStr * 1 + k;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${newYarStr}`;
      this.mouDatas = Array.from(
        { length: 12 },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      this.mouVal =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
      this.dayVal =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      this.houDatas = Array.from(
        { length: 24 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
    },
    timeFun(t) {
      let date = "";
      if (t) {
        date = new Date(`2018/02/02 ${t}`);
      } else {
        date = new Date();
      }
      this.houDatas = Array.from(
        { length: 24 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
    }
  },
  created: function() {
    // this.dtFun();
    if (this.type == "time") {
      this.dtFun();
    } else if (this.type == "date") {
      this.dtFun();
    } else {
      this.dtFun();
    }
  },
  mounted() {},
  watch: {
    DataShow(val) {
      if (this.type == "time") {
        this.timeFun(this.value);
      } else if (this.type == "date") {
        this.dateFun(this.value);
      } else {
        if (this.value) {
          this.timeDateFun(this.value);
        }
      }
      this.isDataShow = val;
    }
  },
  filters: {}
};
</script>
<style>
.pickClor {
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
<template>
  <div class="mian">
    <div class="mianTime" @click="dateShowClick()">
      年月日=={{dateVal}}---{{startDateStr}}---{{endDateStr}}
    </div>
    <div class="mianTime" @click="timeShowClick()">
      时分秒=={{timeVal}}---{{startTimeStr}}---{{endTimeStr}}
    </div>
    <div class="mianTime" @click="dateTimeShowClick()">
      年月日时分秒=={{dateTimeVal}}<br>{{startDateTimeStr}}<br>{{endDateTimeStr}}
    </div>
    <div class="mianSelect" @click="selectShowClick(1)">
      单选1-val == {{selectFirstVal}}
    </div>
    <div class="mianSelect" @click="selectShowClick(2)">
      单选2-val == {{selectSenoudVal}}
    </div>
    <!--  时间选择-年月日 -->
    <dateModel :type='dateType' :startDate="startDateStr" :endDate="endDateStr" @click="dateClick" :show="isDateShow" v-model="dateVal"></dateModel>
    <!--  时间选择-时分秒 -->
    <timeModel :type='timeType' :startDate="startTimeStr" :endDate="endTimeStr" @click="timeClick" :show="isTimeShow" v-model="timeVal"></timeModel>
    <!--  时间选择-年月日时分秒 -->
    <!--  :type='dateType' -->
    <dateTimeModel :startDate="startDateTimeStr" hfix="点" :endDate="endDateTimeStr" @click="dateTimeClick" :show="isdateTimeShow" v-model="dateTimeVal"></dateTimeModel>
    <!-- 单选 -->
    <selectModel @click="selectClick" :show="isSelectShow" :pitch="pitchVal" :lists="selectLists"></selectModel>
  </div>
</template>
<script>
import dateModel from "./pickSlelct/dateModel";
import selectModel from "./pickSlelct/selectModel";
import timeModel from "./pickSlelct/timeModel";
import dateTimeModel from "./pickSlelct/dateTimeModel";
export default {
  components: {
    dateModel,
    selectModel,
    timeModel,
    dateTimeModel
  },
  data() {
    return {
      // 时分秒
      isdateTimeShow: false,
      dateTimeVal: "2016/08/09 18:05:12",
      startDateTimeStr: "2015/08/08 08:05:15",
      endDateTimeStr: "2018/08/09 18:05:15",
      timeType: 3,
      // 时分秒
      isTimeShow: false,
      timeVal: "09:05:51",
      startTimeStr: "09:05:15",
      endTimeStr: "18:05:15",
      timeType: 3,
      // 年月日
      isDateShow: false,
      dateVal: "2015/08/12",
      endDateStr: "2018/08/09",
      startDateStr: "2015/08/08",
      dateType: 3,
      // 单选
      isSelectShow: false,
      selectFirstVal: "", // 单选对应参数
      selectSenoudVal: "", //
      selectIndex: "", // 多个单选时对应选中
      selectLists: [], // 单选列表
      pitchVal: "" // 选中值
    };
  },
  methods: {
    // 时间-年月日时分秒
    dateTimeClick(val) {
      this.isdateTimeShow = false;
      if (val != "cancel") {
        console.log(val);
        this.dateTimeVal = val;
      }
    },
    dateTimeShowClick() {
      this.isdateTimeShow = true;
    },
    // 时间-时分秒
    timeClick(val) {
      this.isTimeShow = false;
      if (val != "cancel") {
        console.log(val);
        this.timeVal = val;
      }
    },
    timeShowClick() {
      this.isTimeShow = true;
    },
    // 时间-年月日
    dateClick(val) {
      this.isDateShow = false;
      if (val != "cancel") {
        console.log(val);
        this.dateVal = val;
      }
    },
    dateShowClick() {
      this.isDateShow = true;
    },
    // 单选
    selectClick(val) {
      this.isSelectShow = false;
      if (val != "cancel") {
        console.log(val);
        if (this.selectIndex == 1) {
          this.selectFirstVal = val;
        } else {
          this.selectSenoudVal = val;
        }
      }
    },
    selectShowClick(index) {
      this.selectIndex = index;
      if (index == 1) {
        this.selectLists = [1, 2, 3, 4, 5, 6, 7, 8];
        this.pitchVal = 1;
      } else {
        this.selectLists = ["A", "B", "C", "D"];
        this.pitchVal = "A";
      }

      this.isSelectShow = true;
    }
  },
  created: function() {},
  mounted() {},
  watch: {},
  filters: {}
};
</script>
<style>
.mianTime {
  width: 100%;
  min-height: 44px;
  border: 1px solid red;
  text-align: center;
  line-height: 44px;
}
.mianSelect {
  width: 100%;
  height: 44px;
  border: 1px solid red;
  text-align: center;
  line-height: 44px;
}
.mian {
  height: 100vh;
  width: 100%;
  background-color: #fff;
}
</style>
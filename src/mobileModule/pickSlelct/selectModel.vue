<template>
  <div class="selectModel" v-if="isShow">
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
       <pickModel :listData="lists" v-model="selectVal"></pickModel>
      </div>
    </div>
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pitch: {},
    lists: {}
  },
  components: {
    pickModel
  },
  data() {
    return {
      selectVal: "",
      isShow: false
    };
  },
  methods: {
    // 取消
    cancelClick() {
      this.$emit("click", "cancel");
    },
    // 确认
    confimClick() {
      this.$emit("click", this.selectVal);
      this.$emit("input", this.selectVal);
    }
  },
  created: function() {},
  mounted() {},
  watch: {
    // 显示隐藏状态
    show(val) {
      this.isShow = val;
    },
    pitch(val) {
      this.selectVal = val;
    }
  },
  filters: {}
};
</script>
<style scoped>
.hmeMian {
  height: 100vh;
  width: 100%;
  background-color: #ccc;
  display: flex;
  flex-wrap: wrap;
}
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

.selectModel {
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
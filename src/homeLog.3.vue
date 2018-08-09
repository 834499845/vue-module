<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="hmeMian">
    <div class="pick">
      <div class="pickLi">
        <v-pickModel :list="lists"></v-pickModel>
      </div>
      <!-- <div class="pickLi">
        <v-pickModel></v-pickModel>
      </div>
      <div class="pickLi">
        <v-pickModel></v-pickModel>
      </div>
      <div class="pickLi">
        <v-pickModel></v-pickModel>
      </div>
      <div class="pickLi">
        <v-pickModel></v-pickModel>
      </div> -->
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
      lists: []
    };
  },
  methods: {},
  created: function() {
    this.lists = [1, 2, 3, 4, 5, 6, 7, 8];
  },
  mounted() {},
  watch: {},
  filters: {}
};
</script>
<style>
.pickLi {
  width: 100%;
  height: 200px;
  overflow: hidden;
  /* -webkit-overflow-scrolling: touch; */
}

.pick {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  /* border: 1px solid red; */
  background-color: #fff;
}
.hmeMian {
  height: 100vh;
  width: 100%;
  background-color: #ccc;
}
</style>
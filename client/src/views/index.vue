<template>
  <div class="index">
    <head-nav></head-nav>
    <left-menu></left-menu>
    <div class="right-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";
export default {
  name: "index",
  components: { HeadNav, LeftMenu }
};
</script>

<style lang="css" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.right-container {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  /* height: 100%; */
  overflow: auto;
}
</style>

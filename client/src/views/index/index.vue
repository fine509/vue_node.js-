<template>
  <div class="index">
        <keep-alive>
    <head-nav> </head-nav>
      </keep-alive>
    <div class="index1">
      <left-nav></left-nav>
     <keep-alive>
        <router-view></router-view>
     </keep-alive>
    </div>
  </div>
</template>

<script>
import HeadNav from "components/common/HeadNav";
import LeftNav from "components/common/LeftNav";

export default {
  name: "index",

  components: {
    HeadNav,
    LeftNav,
  },
};
</script>

<style scoped>
.index1 {
  width: 100%;
  position: absolute;
  top: 70px;
  bottom: 0;
}
</style>
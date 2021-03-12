<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import qs from "qs";
import jwtDecode from "jwt-decode";
export default {
  name: "App",
  created() {
    //判断token是否有,有的话放入vuex里面，解决刷新vuex更新问题
    if (localStorage.logintoken) {
      const token_decode = jwtDecode(localStorage.logintoken); //解析token
      this.$store.dispatch("setAu", !this.isEmpty(token_decode));
      this.$store.dispatch("setUser", token_decode);
    }
  },
  methods: {
    //判断一个对象是否为空,为空返回真
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value === "Array" && value.length === 0)
      );
    },
  },
};
</script>

<style>
body,
html,
#app {
  height: 100%;
  width: 100%;
}
</style>

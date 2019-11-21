<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  component: {},
  created() {
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      // token 存储到 vuex 中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded)); // 如果不为空 传递过去的是真
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value == undefined ||
        value == null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home">
    <div class="xiong"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  activated() {
    this.getuser();
  },
  methods: {
    getuser() {
      this.$axios
        .get(`/api/users/current/${this.$store.getters.user.id}`)
        .then((user) => {
          console.log(user);
          if (!user.data.color && !user.data.fruit) {
            alert("请尽快去添加密保，以完善用户信息");
          }
        });
    },
  },
};
</script>

<style scoped>
@import url("~assets/css/normalize.css");
.home {
  width: 85%;
  height: 100%;
  margin-left: 15%;
  background: url('~assets/img/homebg.jpg');
  background-size: 100% 100%;
}


</style>
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
  background: url('~assets/img/321.jpg');
  background-position: 100% 100%;
}

.xiong {
  position: absolute;
  width: 200px;
  height: 100px;
  background: url("~assets/img/11.png") no-repeat;
  /* 我们元素可以添加多个动画， 用逗号分隔 */
  animation: bear 0.4s steps(8) infinite, move 8s forwards;
}

@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}

@keyframes move {
  0% {
    bottom: 0;
    left: 15%;
  }
  100% {
    bottom: 0;
    left: 65%;
    /* margin-left: -100px; */
    transform: translateX(-50%);
  }
}
</style>
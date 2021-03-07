<template>
  <div class="home">
    <header class="header">
      <p class="title">{{ pmOrAm }}好，欢迎回来</p>
      <main class="timeDate">
        <p class="time">现在是{{ time }}:{{ second }}</p>
        <p class="date">{{ date }}</p>
      </main>
    </header>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      time: "10:30",
      date: "2021/03/06",
      pmOrAm: "早上",
      second: "00",
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  creater() {
    this.getuser();
  },
  activated() {
    this.getuser();
    this.getTime();
    this.getAccuracyTime = setInterval(() => {
      this.getTime();
    }, 1000);
  },
  deactivated() {
    clearInterval(this.getAccuracyTime);
  },
  methods: {
    getuser() {
      this.$axios
        .get(`/api/users/current/${this.$store.getters.user.id}`)
        .then((user) => {
          if (!user?.data?.color && !user?.data?.fruit) {
            this.$message({
              message: "请尽快去添加密保，以完善用户信息",
              type: "warning",
            });
          }
        });
    },
    getTime() {
      const time = new Date();
      let date = `${time.getFullYear()}/${
        time.getMonth() + 1
      }/${time.getDate()}/星期${this.weeks[time.getDay()]}`;
      let hours = time.getHours();
      let minutes = String(time.getMinutes());
      let hoursMinutes = `${hours}:${
        minutes.length === 1 ? "0" + minutes : minutes
      }`;
      let second = String(time.getSeconds());
      this.second = second.length === 1 ? `0${second}` : second;
      this.date = date;
      this.time = hoursMinutes;
      if (+hours >= 0 && +hours < 12) {
        this.pmOrAm = "早上";
      } else if (+hours >= 12 && +hours < 18) {
        this.pmOrAm = "下午";
      } else {
        this.pmOrAm = "晚上";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("~assets/css/normalize.css");
.size {
  color: #999;
  font-family: "Lucida Sans Unicode";
  font-style: oblique;
  font-weight: 700;
  margin-left: 50px;
}
.home {
  width: 85%;
  height: 100%;
  margin-left: 15%;
  background: url("~assets/img/homebg4.jpg");
  background-size: 100% 105%;

  .header {
    float: left;
    margin: 200px 0 0 200px;
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: 100px;
    color: rgb(71, 70, 70);
    .title {
      margin-bottom: 0;
      font-size: 26px;
    }
    .timeDate {
      font-size: 24px;
      .time {
        will-change: transform; // 创建新的渲染层
      }
    }
  }
}
</style>
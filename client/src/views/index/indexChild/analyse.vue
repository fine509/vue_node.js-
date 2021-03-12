<template>
  <div class="analyse">
    <div class="charts">
      <div ref="mycharts1" class="charts1"></div>
      <div ref="mycharts2" class="charts2"></div>
    </div>
    <aside class="checkouType">
      <button class="checkoutType-btn-1" @click="checkoutType(cashType.income)">
        收入</button
      ><button
        class="checkoutType-btn-2"
        @click="checkoutType(cashType.expenditure)"
      >
        支出
      </button>
    </aside>
  </div>
</template>

<script>
import LoginVue from "../../login_register/Login.vue";

let echarts = require("echarts");

export default {
  name: "Analyse",
  data: () => {
    return {
      data: [],
      cashType: {
        income: "收入",
        expenditure: "支出",
      },
      showData: [],
    };
  },
  async activated() {
    await this.getMessage();
  },
  async mounted() {
    await this.getMessage(); //异步请求变同步
  },
  methods: {
    async getMessage() {
      await this.$axios
        .get("/api/profile/" + this.$store.getters.user.id)
        .then((res) => {
          this.data = res.data.map((item) => {
            if (Number(item.cash) < 0) {
              item.money = this.cashType.expenditure;
            } else {
              item.money = this.cashType.income;
            }
            return item;
          });
        });
      this.showData = this.handleData(
        this.data,
        "人民币",
        this.cashType.income
      );
    },
    handleData(data, remark, type) {
      //处理每种货币的类型
      let handleData = [];
      data.forEach((item) => {
        if (item.remark === remark) {
          if (item.money === type) {
            handleData.push(item.type);
          }
        }
      });
      handleData = Array.from(new Set(handleData));
      return handleData;
    },
    checkoutType(type) {
      this.showData = this.handleData(this.data, "人民币", type);
    },
    getCharts(dom, data) {
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "资金数据统计",
        },
        tooltip: {},
        xAxis: {
          data,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    getPieCharts(dom, data) {
      let myChart = echarts.init(dom);
      // 绘制图表
      myChart.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ],
      });
    },
  },
  watch: {
    showData(newValue, oldValue) {
      this.getCharts(this.$refs.mycharts1, newValue);
      this.getPieCharts(this.$refs.mycharts2, newValue);
    },
  },
};
</script>

<style scoped lang="scss">
.analyse {
  width: 84%;
  margin-left: 16%;
  height: 100%;
  /* //box-sizing: border-box; */
}
.charts {
  float: left;
  margin: 180px 0 0 200px;
}
.charts1 {
  float: left;
  width: 330px;
  height: 220px;
}
.charts2 {
  float: left;
  width: 330px;
  height: 220px;
  margin-top: -20px;
}
.checkouType {
  padding: 50px 0 0 0;
  .checkoutType-btn-1 {
    border: 1px solid #999;
    border-right-color: #000;
  }
  .checkoutType-btn-2 {
    border: 1px solid #999;
  }
}
</style>
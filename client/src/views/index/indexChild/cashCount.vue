<template>
  <div class="fundlist">
    <div>
      <el-form :inline="true" ref="add_data" :model="searchData">
        <!-- 查询 -->
        <el-form-item label="按照时间查询" class="search">
          <el-date-picker
            v-model="searchData.startTime"
            type="datetime"
            placeholder="选择开始时间时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="searchData.endTime"
            type="datetime"
            placeholder="选择结束时间时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <div class="typeChoose">
            <span class="title">按照类型查询</span>
            <el-select v-model="value" clearable placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.type"
                :label="item.type"
                :value="item.type"
              >
              </el-option>
            </el-select>
            <el-button
              class="searchbtn"
              type="primary"
              size="small"
              icon="search"
              @click="typesearch()"
              >查询</el-button
            >
          </div>
        </el-form-item>
        <add :add="add" @editfiles="editfile" :formData="formData"></add>
      </el-form>
      <!-- 按照类型 -->
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-if="tableData.length > 0"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="创建时间"
          width="230"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              dateTurn(scope.row.date)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="describe"
          label="描述"
          width="120"
        >
        </el-table-column>
        <el-table-column align="center" label="收入" width="90">
          <template slot-scope="scope">
            <span style="color: red">{{ scope.row.incode }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expend" label="支出" width="90">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cash" label="资金情况" width="90">
          <template slot-scope="scope">
            <span style="color: blue">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="200"
          prop="operation"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="mini"
              icon="edit"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="delete1(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row v-if="tableData.length > 0">
        <el-col :span="24">
          <div class="paginations">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.pageindex"
              :page-sizes="paginations.pagesizes"
              :page-size="paginations.pagesize"
              :layout="paginations.layout"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="count_income" v-if="count.length">
      <div>总收入：{{ count[0] }}</div>
      <div>总支出：{{ count[1] }}</div>
      <div>合计：{{ count[2] }}</div>
    </div>
  </div>
</template>

<script>
import Add from "components/common/add.vue";
export default {
  name: "CashCount",
  data() {
    return {
      paginations: {
        pageindex: 1, //当前位于哪页
        total: 0, //总数
        pagesize: 5, //一页显示多少条
        pagesizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //翻页属性
      },
      //展示的数据数组
      tableData: {},

      add: {
        show: false,
        title: "编辑信息",
        option: "edit",
      },
      //用来传给add组件判断是编辑还是增加。
      formData: {
        type: "",
        describe: "",
        incode: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
        pid: "",
      },
      //全部的数据数组
      allTableData: {},
      //查询时间的时间数据
      searchData: {
        startTime: "",
        endTime: "",
      },
      //用于过滤的数据数组
      filterData: {},

      types: [
        {
          type: "娱乐",
        },
        {
          type: "日常",
        },
        {
          type: "医药",
        },
        {
          type: "工资",
        },
        {
          type: "其他",
        },
        {
          type: "股票",
        },
      ],
      value: "",
      count: [],
    };
  },
  components: {
    Add,
  },

  //判断每次出去进来后有没有新增数据
  activated() {
    this.getfile();
  },

  methods: {
    //一开始
    creatGet() {
      this.$axios
        .get("/api/profile/" + this.$store.getters.user.id)
        .then((res) => {
          if (res) {
            this.allTableData = res.data;
            this.filterData = res.data;
            this.setpaginations()
          }
        })
        .catch((err) => console.log(err));
    },
    getfile() {
      //发送网络请求到后台/api/profile获取所有数据
      this.$axios
        .get("/api/profile/" + this.$store.getters.user.id)
        .then((res) => {
          if (res) {
            this.allTableData = res.data;
            this.filterData = res.data;

            this.typesearch();
          }
        })
        .catch((err) => console.log(err));
    },

    //设置分页的方法
    setpaginations() {
      //分页属性
      this.paginations.total = this.allTableData.length;
      this.paginations.pageindex = 1;
      this.paginations.pagesize = 5;
      //设置默认的分页数据
      this.tableData =
        this.allTableData.length > 0
          ? this.allTableData.filter((item, index) => {
              return index < this.paginations.pagesize;
            })
          : {};
    },
    //实现编辑
    edit(row) {
      this.add = {
        show: true,
        title: "编辑信息",
        option: "edit",
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        incode: row.incode,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: "",
        pid: row._id,
      };
    },
    delete1(row) {
      this.$axios.delete("/api/profile/delete/" + row._id).then((res) => {
        this.$message({
          message: "数据删除成功",
          type: "success",
        });
        //判断当前删除是时间查询还是类型查询
        this.getfile();
      });
    },

    //实现分页功能
    handleSizeChange(page_size) {
      //切换size
      this.paginations.pageindex = 1;
      this.paginations.pagesize = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    //实现换页功能
    handleCurrentChange(page) {
      this.paginations.pageindex = page;
      this.tableData = this.allTableData.filter((item, index) => {
        return (
          index < this.paginations.pagesize * page &&
          index >= this.paginations.pagesize * (page - 1)
        );
      });
    },
    // //按时间查询
    // handsearch() {
    //   if (!this.searchData.startTime || !this.searchData.endTime) {
    //     this.$message({
    //       type: "warning",
    //       message: "请选择时间",
    //     });
    //   }
    //   const sTime = this.searchData.startTime.getTime();
    //   const eTime = this.searchData.endTime.getTime();
    //   this.allTableData = this.filterData.filter((item, index) => {
    //     const time = new Date(item.date).getTime();
    //     return time > sTime && time < eTime;
    //   });

    //   this.sum(this.allTableData);

    //   //刷新类型查询内容
    //   this.value = "";
    //   //重新设置分页数据
    //   this.setpaginations();
    // },
    //遍历算总合
    sum(Data) {
      let incode = 0;
      let expend = 0;
      let cash = 0;
      Data.forEach((value, index, array) => {
        incode += value.incode - 0;
        expend += value.expend - 0;
        cash += value.cash - 0;
      });
      this.count[0] = incode;
      this.count[1] = expend;
      this.count[2] = cash;
    },

    //日期转化
    dateTurn(date) {
      return new Date(date).toLocaleString();
    },

    //查询
    typesearch() {
      if (
        !this.searchData.startTime &&
        !this.searchData.endTime &&
        !this.value
      ) {
        this.$message({
          type: "warning",
          message: "请选择时间或者类型",
        });
          this.creatGet();
        
      } else {
        const sTime = this.searchData.startTime
          ? this.searchData.startTime.getTime()
          : 0;
        const eTime = this.searchData.endTime
          ? this.searchData.endTime.getTime()
          : Math.pow(2, 53);

        this.allTableData = this.filterData.filter((item, index) => {
          const time = new Date(item.date).getTime();
          if (this.value)
            return time > sTime && time < eTime && item.type == this.value;
          else {
            return time > sTime && time < eTime;
          }
        });

        this.sum(this.allTableData);

        //重新设置分页数据
        this.setpaginations();
      }
    },
    //编辑成功后修改
    editfile() {
      this.getfile();
    },
  },
};
</script>

<style scoped>
.fundlist {
  width: 85%;
  margin-left: 15%;
  height: 100%;
  /* //box-sizing: border-box; */
}
.fundlist .btnright {
  float: right;
  margin: 10px 30px 5px 0 !important;
}
.fundlist .container .el-table {
  height: 300px;
  overflow: auto;
}
.fundlist .paginations {
  text-align: right;
  margin-right: 10px;
  margin-top: 10px;
}
.fundlist .search {
  margin-top: 15px;
  margin-bottom: 5px !important;
}

.fundlist .searchbtn {
  margin-left: 10px;
}
.fundlist .typeChoose {
  font-size: 14px;
  color: #606266;
  margin-top: 15px;
}
.typeChoose .title {
  margin-right: 11px;
}
.count_income {
  position: fixed;
  bottom: 76px;
  left: 238px;
}
.count_income div {
  margin: 5px;
}
.count_income div:nth-child(1) {
  color: red;
}
.count_income div:nth-child(2) {
  color: green;
}
.count_income div:nth-child(3) {
  color: blue;
}
</style>

<template>
  <div class="fundlist">
    <div>
      <el-form :inline="true" ref="add_data" >
   

        <el-form-item class="btnright">
          <el-button type="primary" size="small" icon="view" @click="handleadd"
            >添加</el-button
          >
        </el-form-item>
        <add :add="add" @editfiles='getfile' @getfiles="getfile" :formData="formData"></add>
      </el-form>
    </div>
<!-- / 表格 -->
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
        <el-table-column align="center" prop="remark" label="备注" width="80">
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
  </div>
</template>

<script>
import Add from "components/common/add.vue";
export default {
  name: "FundList",
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
        title: "",
        option: "",
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
     
      //用于过滤的数据数组
      filterData: {},
    };
  },
  components: {
    Add,
  },
 
  activated(){
    this.getfile()
  },
  methods: {
     //发送网络请求到后台/api/profile获取所有数据 //设置分页数据
    getfile() {
  
      this.$axios
        .get("/api/profile/" + this.$store.getters.user.id)
        .then((res) => {
          if (res) {
            this.allTableData = res.data;
            this.filterData = res.data;
          }
          
          this.setpaginations();
        })
        .catch((err) => console.log(err));
    },

    //设置分页的方法   //分页属性     //设置默认的分页数据
    setpaginations() {
    
      this.paginations.total = this.allTableData.length;
      this.paginations.pageindex = 1;
      this.paginations.pagesize = 5;
  
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pagesize;
      });
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
    //删除数据
    delete1(row) {
      this.$axios.delete("/api/profile/delete/" + row._id).then((res) => {
        this.$message({
          message: "数据删除成功",
          type: "success",
        });
      });
      this.getfile();
    },
    //实现增加
    handleadd() {
      (this.add = {
        show: true,
        title: "添加信息",
        option: "add",
      }),
        (this.formData = {
          type: "",
          describe: "",
          incode: "",
          expend: "",
          cash: "",
          remark: "",
          id: "",
          pid: "",
        });
    },
    //实现分页功能 //切换size
    handleSizeChange(page_size) {
      
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

    dateTurn(date) {
      return new Date(date).toLocaleString();
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
  height: 305px;
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
</style>
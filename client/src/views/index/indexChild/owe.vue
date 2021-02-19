<template>
  <div class="owe">
    <header>
      <div class="search">
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
            <el-input 
                placeholder="根据名字查找"
                v-model="value" class="searchInput"
                clearable>
              </el-input>
          </el-form-item>
          <el-button class="searchBtn" size="mini" type="primary" @click='typeSearch'>查询</el-button>
        </el-form>
         <el-form :inline="true" ref="add_data" >
        <el-form-item class="btnleft">
          <el-button type="primary" size="small" icon="view" @click="transformType('人民币')"
            >人民币</el-button
          >
        </el-form-item>
        <el-form-item class="btnleft">
          <el-button type="primary" size="small" icon="view" @click="transformType('美元')"
            >美元</el-button
          >
        </el-form-item>
        <el-form-item class="btnleft">
          <el-button type="primary" size="small" icon="view" @click="transformType('欧元')"
            >欧元</el-button
          >
        </el-form-item>
        <el-form-item class="btnleft">
          <el-button type="primary" size="small" icon="view" @click="selectAll"
            >查看全部</el-button
          >
        </el-form-item>
      </el-form>
        <!-- 按照类型 -->
      </div>
      <el-button class="add" size="mini" type="primary" @click="add"
        >添加</el-button
      >
      <boadd :form="form" :add="isadd" @addSuccess="addsuccess"></boadd>
    </header>

    <div class="contain">
      <el-table :data="filters" style="width: 100%">
        <el-table-column label="序号" width="50" align="center" type="index">
        </el-table-column>
        <el-table-column label="日期" width="220" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              dateTurn(scope.row.date)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="债主" align="center" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center" width="150">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.cash }}</el-tag>
            </div>
          </template>
        </el-table-column>
         <el-table-column label="货币类型" align="center" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page class="pages" :pages="pages"  @handleSizeChange='handleSizeChange' 
  @handleCurrentChange='handleCurrentChange'></page>
  
  </div>
</template>

<script>
import Boadd from "components/common/Boadd.vue";
import Page from "components/common/page.vue";
import { HandlePage } from "assets/js/handlePage.js";
export default {
  name: "Owe",
  components: { Page, Boadd },
  mixins: [HandlePage],
  data() {
    return {
      count:0,  
      //查询时间的时间数据
      searchData: {
        startTime: "",
        endTime: "",
      },
      isadd: {
        show: false,
        methods: "add",
      },
      form: {
        name: "",
        cash: "",
      },
      value:'',
      alls1:[]
    };
  },
  created() {
    this.getinfo();
  },

  methods: {
   async getinfo() {
      await this.$axios
        .get(`/api/owe/findall/${this.$store.getters.user.id}`)
        .then((res) => {
          this.alls = res.data;
          this.alls1 = res.data
          this.pages.total = this.alls.length;
          this.handlePage();
          this.count=0;
         for(let item of this.filters){
        this.count+=(item.cash-0)
      }
        });
    },
    add() {
      (this.isadd = {
        show: true,
        methods: "add",
        title: "增加欠债",
        type: "owe",
      }),
        (this.form = {});
    },
    edit(item) {
      (this.isadd = {
        show: true,
        methods: "edit",
        title: "修改",
        type: "owe",
      }),
        (this.form = {
          cash: item.cash,
          name: item.name,
          pid: item._id,
          desc:item.desc
        });
    },
    remove(item) {
      this.$axios
        .delete(`/api/owe/delete/${item._id}`)
        .then( async(res) => {
          await this.getinfo()
         this.handPageCheck()
          this.$message({type:'success',message:'删除成功'})
        });
    },
 async addsuccess(){
   await this.getinfo();
   this.handPageCheck(); 
  },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.dialogFormVisible = true;
    },
    dateTurn(date) {
      return new Date(date).toLocaleString();
    },
    submit(from) {
      this.dialogFormVisible = false;
    },
      //查询
    typeSearch() {
      if (!this.searchData.startTime && !this.searchData.endTime&& !this.value) {
        this.$message({
          type: "warning",
          message: "请选择时间或者输入名字",
        });
          this.getinfo()
      }
      else {
        this.handPageCheck()
      } 
    },
    handPageCheck(){
        const sTime = this.searchData.startTime?this.searchData.startTime.getTime():0;
      const eTime = this.searchData.endTime? this.searchData.endTime.getTime():Math.pow(2, 53);
      this.filters = this.alls.filter((item, index) => {
        const time = new Date(item.date).getTime();
        if(this.value)return time > sTime && time < eTime && item.name.includes(this.value);
        else {return time > sTime && time < eTime}
      });
      this.alls1 = this.filters
      this.pages.total=this.filters.length;
       this.count=0;
      for(let item of this.filters){
        this.count+=(item.cash-0)
      }
    },
     //判断显示什么货币类型
      async transformType(type){
      let all = this.alls1
      this.alls = all.filter(item=>{return item.desc === type})
      this.handlePage();
    },
    selectAll(){
     this.alls = this.alls1
      this.handlePage();
    }
    
  },
};
</script>

<style scoped>
.owe {
  width: 85%;
  margin-left: 15%;
  height: 100%;
  /* //box-sizing: border-box; */
}

.owe .contain {
  width: 100%;
  height: 329px;
  overflow: auto;
  padding: 2rem 0 0 0;
}
.owe .add {
  float: right;
  margin: 2.5rem 10rem 0 0;
}
.owe .btnleft {
  padding: 10px 5px 0px 15px !important;
  margin-bottom: -10px;
}
.owe .search {
  margin: 1rem 0 0 2rem;
  float: left;
}
.owe .search .searchInput{
  margin-left: 4rem;
  display: inline-block;
  width: 200px;
}
.owe .searchBtn{
 display: inline-block;
 margin: 1.5rem 0 0 3rem;
}
.count_income {
  position: fixed;
  bottom: 96px;
  left: 238px;
}
.count_income div {
  display: inline-block;
    font-size: 16px;
  margin: 5px;

}
.count_income div:nth-child(1) {
  color: red;
}
.count_income div:nth-child(2) {
  color: green;
}

</style>

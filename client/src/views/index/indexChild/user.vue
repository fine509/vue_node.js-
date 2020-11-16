<template>
  <div class="user">
    <div class="container">
      <el-table :data="userData" style="width: 100%" v-if="userData.length > 0">
        <el-table-column align="center" type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="创建时间"
          width="250"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ dateTurn(scope.row.date) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="名字" width="140">
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" width="150">
        </el-table-column>

        <el-table-column align="center" prop="_id" label="ID" width="190">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row._id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="identity"
          label="身份"
          width="100"
        >
          <template slot-scope="scope">
            <span style="color: #00d053">{{
              scope.row.identity === "manager" ? "管理员" : "用户"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          width="190"
          prop="operation"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delete1(scope.row)"
              v-if="scope.row.identity !== 'manager'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      //接受所有用户
      userData: [],
    };
  },
  created() {
    this.getusers();
  },
  methods: {
    getusers() {
      //发送请求获取所有用户信息
      this.$axios.get("/api/users/all").then((res) => {
        this.userData = res.data;
      });
    },
    delete1(row) {
      //删除
      this.$axios.delete("/api/users/delete/" + row._id).then((res) => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getusers();
      });
    },
      dateTurn(date){
      return new Date(date).toLocaleString()
    }
  },
};
</script>

<style scoped>
.user {
  width: 85%;
  margin-left: 15%;
  height: 100%;
  overflow: auto;
  /* //box-sizing: border-box; */
}
.user .container {
  height: 100%;
}
</style>
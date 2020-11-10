<template>
  <div class="profile">
    <div class="left">
      <div class="leftimg"><img :src="getuser.avatar" alt="" /></div>
    </div>
    <div class="right">
      <div class="username">
        <span class="iconfont">&#xe616;</span>
        {{ getuser.name }}
        <el-button size="small" @click="modifyname">修改名字</el-button>
        <el-button size="small" @click="modifypassword">修改密码</el-button>
        <el-input
          v-if="isshow"
          placeholder="请输入修改的名字"
          class="inputname"
          size="small"
          v-model="modify.name"
        >
        </el-input>
        <el-input
          v-if="passwordshow"
          placeholder="请输入原来的密码"
          type="password"
          size="small"
          v-model="modify.password"
        >
        </el-input>
        <el-input
          v-if="passwordshow"
          placeholder="请输入修改的密码"
          type="password"
          size="small"
          v-model="modify.password1"
        >
        </el-input>

        <el-button
          size="small"
          @click="modifySure"
          v-if="isshow"
          class="suremodify"
          >确认修改</el-button
        >
        <el-button
          size="small"
          @click="modifyEnd"
          v-if="isshow"
          class="suremodify"
          >取消修改</el-button
        >
        <el-row class="rowrow">
          <el-button
            size="small"
            @click="passwordSure"
            v-if="passwordshow"
            class="suremodify"
            >确认修改</el-button
          >
          <el-button
            size="small"
            @click="modifyEnd"
            v-if="passwordshow"
            class="suremodify"
            >取消修改</el-button
          >
        </el-row>
      </div>

      <div class="usertype">
        <span class="iconfont">&#xe627;</span>
        {{ ismanager }}
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Profile",
  data() {
    return {
      isshow: false,
      passwordshow: false,
      modify: {
        name: "",
        password: "",
        password1: "",
      },
      modify1: {
        name: "",
        password: "",
        password1: "",
      },
      dataName: {
        name: "",
        password: "",
        password1: "",
      },
      getuser: {},
    };
  },
  created() {
    //一开始就获取数据并赋值渲染
    this.getuserr();
  },
  computed: {
    ismanager() {
      return this.getuser.identity === "manager" ? "管理员" : "用户";
    },
  },
  methods: {
    modifyname() {
      this.isshow = true;
      this.passwordshow = false;
    },
    modifySure() {
      this.isshow = false;

      this.dataName = this.modify;

      //通过用户id修改名字
      this.$axios
        .post(
          "/api/users/edit/" + this.$store.getters.user.id,
          qs.stringify(this.dataName)
        )
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.modify = this.modify1;
        });
      //修改成功重新获取数据，将数据赋给getuser重新渲染
      this.getuserr();
      //通过事件总线通知HeadNav去修改名字
      this.$bus.$emit("nameModify");
    },
    getuserr() {
      this.$axios
        .get("/api/users/current/" + this.$store.getters.user.id)
        .then((res) => {
          this.getuser = res.data;
        });
    },
    modifyEnd() {
      this.isshow = false;
      this.passwordshow = false;
    },
    modifypassword() {
      this.passwordshow = true;
      this.isshow = false;
    },
    passwordSure() {
      this.dataName = this.modify;

      this.$axios
        .post(
          "/api/users/editpassword/" + this.$store.getters.user.id,
          qs.stringify(this.dataName)
        )
        .then((res) => {
          this.$message({
            type: "success",
            message: "成功修改",
          });
          this.modify = this.modify1;
          this.passwordshow = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  scoped>
.profile {
  width: 100%;
  height: 100%;
}

.profile .left {
  float: left;
  width: 25%;
  height: 100%;
}
.profile .left .leftimg {
  margin-top: 73%;
  margin-left: 58%;
}
.profile .left img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.profile .right {
  float: right;
  width: 60%;
  height: 100%;
  background-color: #ecebec;
  margin-top: 1px;
}
.profile .right div {
  width: 200px;
  height: 30px;
  margin-left: 20px;
}
.profile .right .username {
  width: 100%;
  margin-top: 32%;
  transform: translateY(-40%);
}

.profile .iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inputname {
  display: inline-block !important;
}
.suremodify {
  margin-left: 2px;
  height: 31px;
}
.profile .rowrow {
  text-align: right;
  margin-top: 10px;
  margin-left: 480px !important;
}
</style>
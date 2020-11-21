<template>
  <div class="find">
    
    <section class="from-contain">
      <div class="form-tip">
        <span class="title"> 资金管理系统 </span>
        <!-- element组件 -->
        <el-form
          :model="findUser"
          :rules="rules"
          ref="findForm"
          label-width="80px"
          class="findForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
            class="input1"
              type="email"
              v-model="findUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="新的密码" prop="password">
            <el-input
               class="input1"
              type="password"
              v-model="findUser.password"
              placeholder="请输入新的密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="color">
            <el-input
               class="input1"
              type="text"
              v-model="findUser.color"
              placeholder="请输入你喜欢的颜色"
            ></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="fruit" class="mibao1">
            <el-input
              class="input1"
              type="text"
              v-model="findUser.fruit"
              placeholder="请输入你喜欢的水果"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="btn1"
              @click="submitForm('findForm')"
              >找回</el-button
            >
            <el-button
              type="primary"
             class="btn1"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
          
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import qs from "qs";
import jwtDecode from "jwt-decode";
export default {
  name: "Findpassword",
  data() {
    return {
      findUser: {
        email: "",
        color: "",
        fruit: "",
        password: "",
      },
      loading: true,
      //验证规则
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6-30之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/users/find", qs.stringify(this.findUser))
            .then((res) => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "修改成功",
                });
              } else {
                this.$message({
                  type: "warning",
                  message: "密保失败",
                });
              }
            });
        }
      });
    },
    //判断一个对象是否为空,为空返回真
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value === "Array" && value.length === 0)
      );
    },
    login(){
      this.$router.push('/login')
    }
  },
};
</script>

<style>
.find {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(211, 211, 211);
}
.find .from-contain {
  width: 420px;
  height: 210px;
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.find .from-contain .title {
  font-weight: bold;
  font-size: 26px;
 color:rgb(100, 99, 99);
  margin-left: 125px;
}
.find .el-form-item {
  margin-bottom: 18px!important;
}
.find .findForm {
  width: 100%;
  margin-top: 20px;
   background-color: rgb(245, 247, 247);
   border-radius: 3%;
  padding-right: 10px;
  padding-top: 20px;
}
.find input {
  width: 310px;
  height: 36px;
}

.find .register_tip {
  margin-left: 290px;
  margin-top: -10px;
  padding-bottom: 10px;

  color: #fff;
  font-size: 12px;
}
.find .mibao1 {
  margin-bottom: 10px!important;
}
.find .btn1 {
 
  margin-bottom: 1rem;
}
</style>
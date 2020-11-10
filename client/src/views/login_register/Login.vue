<template>
  <div class="login">
    <section class="from-contain">
      <div class="form-tip">
        <span class="title"> 小林资金管理系统 </span>
        <!-- element组件 -->
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="text"
              v-model="loginUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submitbtn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
          <div class="register_tip">
            <p>
              还没有账号，现在<router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import qs from "qs";
import jwtDecode from "jwt-decode";
export default {
  name: "Login",
  data() {
    return {
      loginUser: {
        email: "",
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
            .post("/api/users/login", qs.stringify(this.loginUser))
            .then((res) => {
              //成功获取token
              const { token } = res.data;
              //存储到localStorage
              localStorage.setItem("logintoken", token);
              //解析token并存到vuex中
              const token_decode = jwtDecode(token);
              this.$store.dispatch("setAu", !this.isEmpty(token_decode));
              this.$store.dispatch("setUser", token_decode);
              //请求成功再跳转
              this.$router.push("/index");
            })
            .catch((err) => {
              this.$message({
                type: "warning",
                message: "密码错误",
              });
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
  },
};
</script>

<style>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("~assets/img/bg.jpg") no-repeat center 80%;
  background-size: 100% 120%;
}
.login .from-contain {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 43%;
  left: 25%;
  transform: translate(-50%, -50%);
}
.login .from-contain .title {
  font-weight: bold;
  font-size: 26px;
  color: rgb(238, 234, 234);
  margin-left: 80px;
}

.login .loginForm {
  width: 100%;
  margin-top: 20px;

  background-color: #fff;
  padding-right: 10px;
  padding-top: 20px;
}
.login input {
  width: 250px;
}
.login .submitbtn {
  width: 98%;
  margin-top: -20px;
  margin-bottom: 10px;
  margin-left: -30px;
}
.login .register_tip {
  margin-left: 220px;
  margin-top: -20px;
  padding-bottom: 20px;

  color: #999;
  font-size: 12px;
}
</style>
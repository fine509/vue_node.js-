<template>
  <div class="login">


    <section class="from-contain">
      <div class="form-tip">
        <span class="title"> 资金管理系统 </span>
      
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="70px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
            class="input"
              type="email"
              v-model="loginUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
            class="input"
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
             @keyup.enter.native="enter1('loginForm')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submitBtn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
               <el-button
              type="primary"
              class="registerBtn"
              @click="register"
              >注册</el-button >
          
               <el-button
              type="primary"
              class="findBtn"
              @click="find"
              >找回密码</el-button
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
    register(){
      console.log('123');
      this.$router.push('/register')
    },
    find(){
      this.$router.push('/find')
    },
    submitForm(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/users/login", qs.stringify(this.loginUser))
            .then((res) => {
              if (res) {
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
              } else {
                this.$message({
                  type: "warning",
                  message: "密码不正确",
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
    }
 
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(211, 211, 211);
}
.login .from-contain {
  width: 410px;
  height: 210px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
    
    
}
.login .from-contain .title {
  font-weight: bold;
  font-size: 26px;
  color:rgb(100, 99, 99);
  margin-left: 130px;
}

.login .loginForm {
  border: 1px solid #999;
  width: 100%;
  margin-top: 20px;
   background-color: rgb(245, 247, 247);
   border-radius: 3%;
  padding-right: 10px;
  padding-top: 20px;
}
.login .input {
  width: 90%!important;
}






</style>
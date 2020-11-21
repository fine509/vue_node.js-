<template>
  <div class="register">
    
    <section class="from-contain">
      <div class="form-tip">
        <span class="title"> 资金后台管理系统 </span>
        <!-- element组件 -->
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="选择身份" class="identity">
            <el-select
              v-model="registerUser.identity"
              aria-placeholder="请选择身份"
            >
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="用户" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="yanzheng" label="身份验证" prop="password3">
            <el-input
              type="password"
              v-model="registerUser.password3"
              placeholder="注册管理员需验证密码"
            ></el-input>
          </el-form-item>

          <el-form-item class="submit">
            <el-button
              type="primary"
              class="btn2"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
             <el-button
              type="primary"
              class="btn2"
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

export default {
  name: "Register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        password3: "",
        identity: "",
        color: "",
        fruit: "",
      },
      loading: true,
      //验证规则
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2-30个字符之间", trigger: "blur" },
        ],
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
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在6-30之间", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(Form) {
      this.$refs[Form].validate((valid) => {
        if (valid) {
          if (
            this.registerUser.identity === "manager" &&
            this.registerUser.password3 === "123123"
          ) {
            this.$axios
              .post("/api/users/register", qs.stringify(this.registerUser))
              .then((res) => {
                //成功
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$router.push("/login");
              });
          } else if (this.registerUser.identity === "employee") {
            this.$axios
              .post("/api/users/register", qs.stringify(this.registerUser))
              .then((res) => {
                //成功
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$router.push("/login");
              });
          } else {
            this.$message({
              message: "身份验证失败，你不能注册成为管理员",
              type: "warning",
            });
          }
        }
      });
    },
    login(){
      this.$router.push('/login')
    }
  },
};
</script>

<style>
.register {
  position: relative;
  width: 100%;
  height: 100%;
   background-color: rgb(211, 211, 211);
}
.register .from-contain {
  width: 420px;
  height: 210px;
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.register .from-contain .title {
  font-weight: bold;
  font-size: 26px;
  color:rgb(100, 99, 99);
  margin-left: 106px;
  
}
.register .el-form-item {
  margin-bottom: 18px!important;
}
.register .registerForm {
  width: 100%;
  margin-top: 20px;

     background-color: rgb(245, 247, 247);
   border-radius: 3%;
  padding-right: 10px;
  padding-top: 20px;
}
.register input {
  width: 300px;
}

.register .login_tip {
  margin-left: 220px;
  margin-top: -20px;
  padding-bottom: 20px;

  color: #fff;
  font-size: 12px;
}

.register .btn2 {
  margin-bottom: 1rem;
}
.register .yanzheng {
  margin-bottom: 10px!important ;
}



</style>
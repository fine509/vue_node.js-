<template>
  <div class="find">
     <video id="v1" autoplay muted loop> 
        <source src="~assets/video/222.mp4" type="video/mp4"  />
  </video>
    <section class="from-contain">
      <div class="form-tip">
        <span class="title"> 小林资金管理系统 </span>
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
              type="email"
              v-model="findUser.email"
              placeholder="请输入邮箱"
            ></el-input>
            </el-form-item>
                <el-form-item label="新的密码" prop="password" >
            <el-input
              type="password"
              v-model="findUser.password"
              placeholder="请输入新的密码"
            ></el-input>
          </el-form-item>
           <el-form-item label="密保问题" prop="color">
            <el-input
              type="text"
              v-model="findUser.color"
              placeholder="请输入你喜欢的颜色"
            ></el-input>
          </el-form-item>
          <el-form-item label="密保问题" prop="fruit">
            <el-input
              type="text"
              v-model="findUser.fruit"
              placeholder="请输入你喜欢的水果"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submitbtn"
              @click="submitForm('findForm')"
              >找回</el-button
            >
          </el-form-item>
          <div class="register_tip">
            <p>
             返回<router-link to="/login">登录</router-link>
            </p>
          </div>
          <div class="register_tip1">
            
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
  name: "Findpassword",
  data() {
    return {
      findUser: {
        email: "",
        color: "",
        fruit:'',
        password:''
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
          
        ], password: [
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
             if(res){
               this.$message({
                   type:'success',
                   message:'修改成功'
               })

             }
             else {
               this.$message({
                 type:'warning',
                 message:'密保失败'
               })
             }
            })
           
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
.find {
  position: relative;
  width: 100%;
  height: 100%;
  
}
.find .from-contain {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 33%;
  left: 25%;
  transform: translate(-50%, -50%);
}
.find .from-contain .title {
  font-weight: bold;
  font-size: 26px;
  color: rgb(238, 234, 234);
  margin-left: 80px;
}

.find .findForm {
  width: 100%;
  margin-top: 20px;

  background-color: rgba(238, 234, 234, .2);
  border-radius: 5%;
  padding-right: 10px;
  padding-top: 20px;
}
.find input {
  width: 250px;
}
.find .submitbtn {
  width: 98%;
  margin-top: -20px;
  margin-bottom: 10px;
  margin-left: -30px;
}
.find .register_tip {
  margin-left: 290px;
  margin-top: -10px;
  padding-bottom: 10px;

  color: #999;
  font-size: 12px;
}
 * {
            margin: 0px;
            padding: 0px;
        }
        
        html,
        body {
            width: 100%;
            height: 100%
        }
        
        video {
            position: fixed;
            top: 0%;
            left: 0px;
            width: 100%;
            height: 100%;
            object-fit: fill;
            /*加滤镜*/
            /* filter: blur(115px); 
            
           -webkit-filter: grayscale(100%);
            filter:grayscale(50%);  */
            /* //背景灰度设置*/ 
            z-index: -11
        }
        
        source {
            min-width: 100%;
            min-height: 100%;
            height: auto;
            width: auto;
        }
</style>
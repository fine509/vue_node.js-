<template>
  <div class="mibao">
    
 <div class="contain">
     <el-form
          :model="submitMibao"
        
          ref="submitForm"
          label-width="200px"
          class="submitForm"
        >
          <el-form-item label="请输入密码以验证" prop="password">
            <el-input
              type="password"
              v-model="submitMibao.password"
              placeholder="请输入密码以验证"
            ></el-input>
          </el-form-item>
          <el-form-item label="请输入你喜欢的颜色" prop="color">
            <el-input
              type="text"
              v-model="submitMibao.color"
              placeholder="请输入颜色"
            ></el-input>
          </el-form-item>
          <el-form-item label="请输入你喜欢的水果" prop="fruit">
            <el-input
              type="text"
              v-model="submitMibao.fruit"
              placeholder="请输入你喜欢的水果"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submitbtn"
              @click="submitForm('submitForm')"
              >提交</el-button
            >
          </el-form-item>
          
        </el-form>
 </div>

           <!-- <el-input
          v-if="mibaoshow"
          placeholder="请输入你喜欢的颜色"
          type="text"
          size="small"
          v-model="modify.password"
        >
        </el-input>
            <el-input   v-if="mibaoshow" placeholder="请输入你喜欢的水果" size="small"
         v-model="modify.password1" show-password @blur="passwordBlur"></el-input> -->



  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Mibao",
  data() {
    return {
        submitMibao:{
            color:'',
            fruit:'',
            password:''
        },
       
    }},
    methods:{
         submitForm(Form) {
      
          this.$axios
            .post(`/api/users/editmibao/${this.$store.getters.user.id}`, qs.stringify(this.submitMibao))
            .then((res) => {
             if(res){
                 this.$message({
                 type:'success',
                 message:'修改成功'
               })
                 this.submitMibao={  color:'',
            fruit:'',
            password:''}
               
             }
             else {
               this.$message({
                 type:'warning',
                 message:'密码不正确'
               })
             }
            })
         }
    }
        
  
 
 
    }
</script>

<style  scoped>

.mibao {
  width: 85%;
  margin-left: 15%;
  height: 100%;
  
  background-color: rgb(212, 211, 211);
  /* //box-sizing: border-box; */
}
.mibao .contain{
    
    width: 80%;
    height: 100%;
}
.mibao .submitForm {
  width: 100%;
  height: 200px;
 padding: 100px 0 0 200px;

 
}
.mibao .submitForm  .el-form-item{
    width: 500px;
    height: 50px!important;
}
.submitbtn {
    margin-left:231px;
}
</style>
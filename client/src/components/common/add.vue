<template>
  <div class="add">
   <!-- Form -->
<el-dialog :title="add.title" :visible.sync='add.show'
:modal-append-to-body='false' :show-close='true'
 :clone-on-press-escape='true'  class="addboss">
     
<div class="form">
      <el-form ref="addform" :model='formData' :rules='rules'  label-width='120px'
      style="margin=10px;width=auto">
        <el-form-item label='收支类型' prop='intype'>
            <el-select v-model=" formData.type" placeholder="收支类型">
                <el-option  v-for="(item,index) in  formtype" :key="index" 
                :label='item' 
                :value='item'>{{item}} </el-option>
            </el-select>
        </el-form-item>
      <el-form-item prop='describe' label='收支描述：'>
            <el-input v-model="formData.describe" type='text'></el-input>
      </el-form-item>
         <el-form-item prop='incode' label='收入：'>
            <el-input v-model="formData.incode" type='number'></el-input>
      </el-form-item>
         <el-form-item prop='expend' label='支出：'>
            <el-input v-model="formData.expend" type='number'></el-input>
      </el-form-item>
    
       <el-form-item prop='remark' label='备注：'>
            <el-input v-model="formData.remark  " type='text'></el-input>
      </el-form-item>
      </el-form>

  </div>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="addsubmit('addform')">确定</el-button>
  </div>
</el-dialog>
  </div>
</template>
   

  
  

<script>
import qs from 'qs'
export default {
    name:'Add',
    data() {
      return {
        
         formtype:['娱乐','日常','医药','工资','其他','股票'],
         rules:{
            
             incode:[{
                   required:true,
                 message:'收入不能为空',
                 trigger:'blur'
             }],
             expend:{
                   required:true,
                 message:'支出不能为空',
                 trigger:'blur'
             },
             cash:{
                   required:true,
                 message:'账户资金不能为空',
                 trigger:'blur'
             }
         
         },
    
        
      };
    },
    props:{
        add:{
          type:Object
        },
        formData:{
          type:Object
        }
    },
  
    methods:{
            cancel(){
                this.add.show=false 
            },
            addsubmit(form){
               this.$refs[form].validate((valid) => {
                  if (valid) {
                        this.formData.id=this.$store.getters.user.id; 
                      //判断是添加还是编辑
                      if(this.add.option==='add')
                            {
                           //现金由系统计算
                             this.formData.cash=(this.formData.incode-0)-(this.formData.expend)
                              this.$axios.post('/api/profile/add', qs.stringify(this.formData))
                         .then(res=>{
                         //成功
                                  this.$message({
                              message: '数据添加成功',
                              type: 'success'
                            });
                              this.add.show=false ;
                              this.$emit('getfiles')
                                 })};
                      if(this.add.option==='edit'){
                         this.formData.cash=(this.formData.incode-0)-(this.formData.expend)
                        this.$axios.post('/api/profile/edit/'+this.formData.pid,qs.stringify(this.formData))
                        .then(res=>{
                           this.$message({
                              message: '数据修改成功',
                              type: 'success'
                            });
                              this.add.show=false ;
                              this.$emit('editfiles')
                        })
                      }
                       }
                  
                            });
                          
                                }
                                
    },
      
  };

</script>

<style scoped>
.addboss {
top: 30px!important;
bottom: 5%!important;
  margin-top: -8vh;
}
.addboss .form {
    height: 100%;
    width: 80%!important    ;
     margin-top: -2vh;
}
.el-dialog {
    height: 100%!important;
    margin: 0!important;
   
}
.el-form-item {
    height: 50px!important;
    margin-bottom: 10px!important;

}
</style>
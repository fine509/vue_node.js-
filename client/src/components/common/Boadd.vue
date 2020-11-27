<template>
   <div class="boadd">
<el-dialog :title="add.title" :visible.sync="add.show">
  <el-form :model="form"   ref="loginForm">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="金额" :label-width="formLabelWidth">
        <el-input v-model="form.cash" autocomplete="off" type="number"></el-input>
    </el-form-item>
     <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.desc" autocomplete="off" type="text"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="add.show = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
   </div>
</template>

<script>
import qs from 'qs'
export default {
    name:'Boadd',
    data(){
        return {
            dialogFormVisible: false,
             formLabelWidth: '50px',
               uid:this.$store.getters.user.id
        }
        
    },
    props:{
        add:{
          type:Object
        },
        form:{
          type:Object
        }
    },
    methods:{
        submit(){
           this.form.userid=this.$store.getters.user.id
           if(this.add.methods==='add'){
               this.$axios.post(`/api/${this.add.type}/add`,qs.stringify(this.form))
               .then(res=>{
                   this.$emit('addSuccess')
                  this.$message({type:'success',message:'添加成功'})
               })
           }
            if(this.add.methods==='edit'){
                  this.$axios.post(`/api/${this.add.type}/edit/${this.form.pid}`,qs.stringify(this.form))
                 .then(res=> {
                   this.$emit('addSuccess')
                     this.$message({type:'success',message:'修改成功'})
                 })
                 
            }


           this.add.show=false
        }
    }
}
</script>

<style scoped>

</style>
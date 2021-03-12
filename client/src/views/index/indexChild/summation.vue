<template>
  <div class="summation">
      
   <div class="container">
         <el-table :data="allMessage" style="width: 100%" >
         <el-table-column align='center' type="index"  label="序号"   width="50">     </el-table-column>
        
     
        <el-table-column align='center' label='收入' prop='incode'  width="90">   
             
              </el-table-column>
        <el-table-column align='center' prop='expend' label='支出'   width="90">   
              <template slot-scope="scope">       
                <span style="color:#00d053">{{ scope.row.expend }}</span>
             </template>
              </el-table-column>
        <el-table-column align='center' prop='cash' label='现金'   width="90">  
             <template slot-scope="scope">       
                <span style="color:blue">{{ scope.row.cash }}</span>
             </template>
               </el-table-column>
        <el-table-column align='center' prop='remark' label='备注'   width="120">     </el-table-column>
         <el-table-column align='center' label="操作" width='200' prop='operation'>
              <template slot-scope='scope'>
                  <el-button   type='warning' size="mini" icon='edit' @click='edit(scope.row)' >编辑</el-button>
                 <el-button  size="mini"   type="danger"  @click='delete1(scope.row)'  >删除</el-button>     
                 </template>
        </el-table-column>
        </el-table>
        
       
         </div>
  </div>
</template>

<script>
export default {
    name:'Summation',
    data(){
        return {
            message:{},
            filterMessage:[],
            allMessage:{},
           
        }
    },
    created(){
        this.getmessage()
     
    },
    methods:{
        getmessage(){
            this.$axios.get('/api/profile')
            .then(res=>{
                let incode=0,expend=0,cash=0;
                this.allMesage=res.data
                this.filterMessage=res.data
                for(let item of this.filterMessage) {
                 incode+=(item.incode-0)
                 expend+=(item.expend-0)
                 cash+=(item.cash-0)
       
           }
                 this.allMessage.incode=incode;
                 this.allMessage.expend=expend;
                 this.allMessage.cash=cash
            })
            
        },
       
    }
}
</script>

<style scoped>
.summation {
    width: 85%;
    margin-left: 15%;
    height: 100%;

   /* //box-sizing: border-box; */
}
</style>
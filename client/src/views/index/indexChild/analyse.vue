<template>
  <div class="analyse">
    <div class="charts">
      <div ref="mycharts1" class="charts1">1</div>
      <div ref="mycharts2" class="charts2">2</div>
    </div>
    <div class="charts">
      <div ref="mycharts3" class="charts1">3</div>
      <div ref="mycharts4" class="charts2">4</div>
    </div>
    <div class="charts">
      <div ref="mycharts5" class="charts1"></div>
      <div ref="mycharts6" class="charts2"></div>
    </div>
  </div>
</template>

<script>
import LoginVue from '../../login_register/Login.vue'

let echarts = require('echarts')
export default {
    name:'Analyse',
    data:()=>{
        return{
            data:[],
            winData:[],
            failData:[],
            failType:[],
            failCount:[],
            ZH_money:[],
            OU_money:[],
            AM_money:[],
            successType:[],
            failTypeA:[],
            successTypeA:[],
             failTypeZ:[],
            successTypeZ:[],
             failTypeO:[],
            successTypeO:[],
            failData_z:[],
            successData_z:[],
             failData_a:[],
            successData_a:[],
             failData_o:[],
            successData_o:[],

        }
    },
 async activated(){
    await this.getMessage()
     this.handleType(this.data)
  },
   async mounted(){
       await this.getMessage()  //异步请求变同步
        await this.handleType(this.data)
        this.handleData(this.ZH_money,this.failTypeZ,'人民币支出')
        this.handleData(this.ZH_money,this.successTypeZ,'人民币收入')
        this.handleData(this.AM_money,this.failTypeA,'美元支出')
        this.handleData(this.AM_money,this.successTypeA,'美元收入')
        this.handleData(this.OU_money,this.failTypeO,'欧元支出')
        this.handleData(this.OU_money,this.successTypeO,'欧元收入')
        console.log(this.successData_z)
        this.getCharts(this.$refs.mycharts1,this.successTypeZ,'人民币收入',this.successData_z)
        this.getCharts(this.$refs.mycharts2,this.failTypeZ,'人民币支出',this.failData_z)
        console.log(this.successData_a);
        this.getCharts(this.$refs.mycharts3,this.successTypeA,'美元收入',this.successData_a)
        this.getCharts(this.$refs.mycharts4,this.failTypeA,'美元支出',this.failData_a)
        this.getCharts(this.$refs.mycharts5,this.successTypeO,'欧元收入',this.successData_o)
        this.getCharts(this.$refs.mycharts6,this.failTypeO,'欧元支出',this.failData_o)
        
    },
    methods:{
       handleData(arr,type,data){
        let c=0,d=0;
           for(let item of type){
               for(let value of arr){
                   if(value.type===item ){
                     if(!value.cash.startsWith('-')){
                       c=(c-0)+(value.expend-0)+(value.incode-0)
                   }
                   else {
                       d=(d)+(value.expend-0)+(value.incode-0)
                   }
                   }
               }
               switch(data) {
                   case '人民币支出' : this.failData_z.push(d);break;
                   case '人民币收入' : this.successData_z.push(c);break;
                   case '美元支出' : this.failData_a.push(d);break;
                   case '美元收入' : this.successData_a.push(c);break;
                   case '欧元支出' : this.failData_o.push(d);break;
                   case '欧元收入' : this.successData_o.push(c);break;
                   default:
               }
               c=0
               d=0
           }
       },
       async getMessage(){
          await this.$axios.get("/api/profile/" + this.$store.getters.user.id)
              .then(res=>{this.data=res.data})
        },
       handleType(data){
           this.ZH_money = data.filter(item=>{return item.remark === '人民币'})
           this.AM_money = data.filter(item=>{return item.remark === '美元'})
           this.OU_money = data.filter(item=>{return item.remark === '欧元'})
           this.failTypeZ = Array.from(new Set(this.ZH_money.map(item=>{if(item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))
           this.successTypeZ = Array.from(new Set(this.ZH_money.map(item=>{if(!item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))
           this.failTypeA = Array.from(new Set(this.AM_money.map(item=>{if(item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))
           this.successTypeA = Array.from(new Set(this.AM_money.map(item=>{if(!item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))
           this.failTypeO = Array.from(new Set(this.OU_money.map(item=>{if(item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))
           this.successTypeO = Array.from(new Set(this.OU_money.map(item=>{if(!item['cash'].startsWith('-') && item.type!=""){return item.type}}).filter(item=>{return item})))

      },
        getCharts(dom,type,moneyType,data){
        let myChart = echarts.init(dom);
        // 绘制图表
        myChart.setOption({
            title: {
                text: moneyType
            },
            tooltip: {},
            xAxis: {
                data:type
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data
            }]
        });
            

        }
    }

}
</script>

<style scoped>
.analyse {
  width: 84%;
  margin-left: 16%;
  height: 100%;
  display: flex;
  /* //box-sizing: border-box; */
}
.charts {
  flex: 1 0 0;
  margin-top: 30px;
}
.charts1 {
  width: 320px;
  height: 220px;
  margin-bottom: 40px;
}
.charts2 {
  width: 320px;
  height: 220px;
}
</style>
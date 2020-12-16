<template>
  <div class="analyse">

   <div class="charts">
        <div ref="mycharts" class="charts1"> </div>
        <div ref="mycharts1" class="charts2">123</div>
   </div>
   

  </div>
</template>

<script>

let echarts = require('echarts')
export default {
    name:'Analyse',
    data:()=>{
        return{
            data:[],
            winData:[],
            failData:[],
            failType:[],
            failCount:[]
        }
    },
   async mounted(){
       await this.getMessage()  //异步请求变同步
      
        this.handleData(this.data)
        this. handleKeys(this.data)
        this.getCharts()
    },
    methods:{
       async getMessage(){
          await this.$axios.get("/api/profile/" + this.$store.getters.user.id)
              .then(res=>{this.data=res.data;console.log(this.data);})
        },
       handleData(data){
           this.failData=data.filter((item,index)=>{
               return item['cash'].startsWith('-')
           })
          
       },
       handleKeys(data){
          this.failType = Array.from(new Set(data.map(item=>{if(item['cash'].startsWith('-')){return item.type}})))
       
       },
        getCharts(){
            console.log('23');
        let myChart = echarts.init(this.$refs.mycharts);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '近一个月资金情况'
            },
            tooltip: {},
            xAxis: {
                data:this.failType
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
            

        }
    }

}
</script>

<style scoped>
.analyse {
  width: 85%;
  margin-left: 15%;
  height: 100%;
  /* //box-sizing: border-box; */
}
.charts {
    float: right;
    width: 500px;
    height: 300px;
  }
.charts1 { 
  
    width: 500px;
    height: 300px;
}
.charts2 {
     width: 500px;
    height: 300px;
}
</style>
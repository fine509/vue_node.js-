<template>
<div class="leftnav">
    <el-row class="tac" style="z-index:9">
        <el-col >
            <el-menu default-active="1" class="el-menu-vertical-demo"
            background-color="#151517" text-color="#fff" active-text-color="#fff">
            
            <router-link to="/index/home">
                <el-menu-item>  <i class="el-icon-menu"></i><span>首页</span></el-menu-item>
                  </router-link>
                    <template v-for="item in items">
                        <el-submenu :key='item.path'  :index='item.path' v-if="item.children">
                            <template slot='title'>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children" :key="cindex" :to="citem.path">
                                <el-menu-item-group :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item-group>
                            </router-link>
                    </el-submenu>
                    </template>
              
            </el-menu>
        </el-col>
    </el-row>
<div class="logologo">
        
    </div>
  </div>
</template>

<script>
export default {
    name:'LeftNav',
    data(){
        return {
          items:[{icon:'fa-money',name:'个人资金',path:'fund',
          children:[
              {
                  path:'/index/fundlist',name:'资金管理'
              }
              ]}
          ,
          {
              icon:'fa-count',name:'资金概括',path:'count',children:[{
                  path:'/index/cashcount',
                  name:'资金查询'
              },
              {
                  path:'/index/cashcount',
                  name:'资金总览'
              }
              ]
          },
            {
              icon:'fa-card',name:'借钱管理',path:'borrow',children:[{
                  path:'/index/borrow',
                  name:'借钱本'
              }]
          },{
              icon:'fa-card',name:'欠债管理',path:'owe',children:[{
                  path:'/index/owe',
                  name:'欠债本'
              }]
          },{icon:'fa-message',name:'个人信息',path:'message',children:[{
              path:'/index/profile',
              name:'信息管理'
          },{
              path:'/index/mibao',
              name:'修改密保'
          }]}
         
          ]
        }
    },
    created(){
        let items;
        const manager={icon:'fa-user',name:'用户管理',path:'user',children:[
              {
                  path:'/index/user',
                  name:'用户管理'
              }
          ]}
       
          
         
          //身份验证，输入不同数据
       
        this.getuser.identity==='manager'?this.items.push(manager):this.items
   
    },

    computed:{
        getuser(){
            return this.$store.getters.user
        }
    }
}
</script>

<style>
.leftnav {
    float: left;
    height: 100%;
    width:15%;
    background-color:#151517;
}



</style>
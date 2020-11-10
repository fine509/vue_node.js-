<template>
<div class="leftnav">
    <el-row class="tac" style="z-index:9">
        <el-col >
            <el-menu default-active="2" class="el-menu-vertical-demo"
            background-color="#151517" text-color="#fff" active-text-color="#314067">
            
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
          items:[{icon:'fa-money',name:'资金管理',path:'fund',
          children:[
              {
                  path:'/fundlist',name:'资金流水'
              }
              ]}
          ,{icon:'fa-message',name:'信息管理',path:'message',children:[{
              path:'/profile',
              name:'个人信息'
          }]},
          ]
        }
    },
    created(){
        let items;
        const manager={icon:'fa-user',name:'用户管理',path:'user',children:[
              {
                  path:'/user',
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

.leftnav .logologo {
    width: 100px;
    height: 100px;
}
.logologo img {
    width: 100%;
    height: 100%;
}
</style>
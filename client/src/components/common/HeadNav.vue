<template>
  <header class="headnav">
    <div class="left">
      <div class="logojpg">
        <img src="~assets/img/logo.gif" alt="" />
        <span class="title">资金管理系统</span>
      </div>
    </div>
    <div class="right">
      <div class="userinfo">
        <img
          :src="getuser.avatar"
          alt=""
        />
        <div class="welcome">
          <div>欢迎</div>
          <div>{{getuser.name}}</div>
        </div>
        <!-- //下拉箭头 -->
        <span class="username"> 
            <el-dropdown  trigger='click' @command='setUserInfo'>
  <span class="el-dropdown-link clickmore">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item command='info'>个人信息</el-dropdown-item>
    <el-dropdown-item command='logout'>退出</el-dropdown-item>
 
  </el-dropdown-menu>
</el-dropdown>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeadNav",
  data(){
    return {
      getuser:this.$store.getters.user
    }
  },
careated(){
  this.getuserr()
  },
  methods:{
      setUserInfo(item){
         if(item==='info'){this.$router.push('/index/profile')}
      
         if(item==='logout') this.logout()                
      },
      logout(){
             //清空token和vuex里面的user
             localStorage.removeItem('logintoken')
            this.$store.dispatch('clearuser');
             this.$router.push('/login');
      },
       getuserr(){
        this.$axios.get('/api/users/current/'+this.$store.getters.user.id)
            .then(res=>{
                this.getuser=res.data
               
            })
       }
  },
  mounted(){
    this.$bus.$on('nameModify',res=>{
      
      this.getuserr()
    })
   
  }
}
</script>

<style scoped>
.headnav {
  width: 100%;
  height: 70px;
  min-width: 600px;
  padding: 5px;
  padding-left:0px;
  padding-right: 0px;
  background-color: #151517;

  border-bottom: 1px solid rgb(22, 22, 22);
}
.headnav .left {
  float: left;
  height: 100%;
}
.headnav .right {
  float: right;
  height: 100%;
}
.logojpg {
  height: 59px;
}
.logojpg img {
  height: 100%;
  vertical-align: middle;
}

.userinfo {
  text-align: center;
  margin-right: 20px;
margin-top: 20px;
margin-bottom: 10px;
}
.userinfo img {
  position: absolute;
  right: 70px;
  top: 18px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.userinfo div:nth-of-type(1) {
    width: 50px;
    height: 16px;
  font-size: 12px;
  color: #fff;

}
.userinfo div:nth-of-type(2) {
    width: 50px;
    height: 16px;
  color: rgb(117, 135, 235);
  font-size: 10px;

}

.el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

 .headnav .clickmore {
     position: absolute;
     bottom: 10px;
     right: -14px;
  }


  .logojpg .title {
  margin-top: 10px;
  
  font-size: 20px;
   background:-webkit-linear-gradient(left,#8c9ca0,#535353 25%,#8c9ca0 50%,#535353 75%,#8c9ca0);
            color:transparent;
            -webkit-background-clip:text;
            background-size:200% 100%;
            animation:masked-animation 1s infinite linear;
}
 @-webkit-keyframes masked-animation {
            0% {
                background-position:0 0;
            }
            100% {
                background-position:-100% 0;
            }
        }
</style>
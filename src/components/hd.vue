<template>
    <div class="header">
      <img src="../img/headLogo.png" alt="">
      <h1>合捷清洁</h1>
      <div class="right" v-if="num">
        <img class="rightImg" src="../img/p.svg" alt="">
        <span class="dl" @click="login">登录</span>
        <hr>
        <span class="re" @click="re">注册</span>
      </div>
      <div class="rightT" v-else>
        <img :src="info.UserImage" @click="goto" style="cursor: pointer" class="people">
        <span class="Title">合捷HMC</span>
          <img class="c" src="../img/car.png" @click="gotoShop">
          <span style="cursor: pointer" class="Title"@click="gotoShop" >购物车</span>
     </div>
    </div>
</template>

<script>
    export default {
        name: "hd",
      data(){
          return{
            info:{},
           num:true
          }
      },
      created(){
         if(this.$store.state.token!=='' || localStorage.getItem('token')!=='')
         {
           this.num=false
           this.getInfo(this.$store.state.token || localStorage.getItem('token'))
         }
      },
      methods:{
        getInfo(token){
          this.$http
            .get("/api/Login/PersonnelInformation",{
              params:{
                token:token
              }
            })
            .then(
              function (response) {
                this.info=response.data.Result
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "获取个人信息出错",
                });
              }.bind(this)
            )
        },
          login(){
            this.$router.push('/login')
          },
        re(){
            this.$router.push('/register')
        },
        gotoShop(){
            this.$router.push({path:'/shopCar'})
        },
        goto(){
           this.$router.push({path:'/people'})
        }
      }
    }
</script>

<style lang="scss" scoped>
 .header{
   width:100%;
   height:140px;
   display: flex;
   flex-direction: row;
   background-color: #F1F1F1;
   img{
     height:60px;
     margin-top: 2%;
     margin-left: 5%;
   }
   h1{
     font-size: 3em;
     margin-top: 3.3%;
     margin-left: 1%;
     color:#323232;
   }
   .right{
     width:9%;
     height:28%;
     margin-left: 60%;
     margin-top: 3.3%;
     display: flex;
     flex-direction: row;
     .rightImg{
       width:50px;
       height:41px;
       margin-top: -6%;
     }
     .dl,.re{
       font-size: 2em;
       font-weight: bolder;
       color:#919191;
       display: inline-block;
       height:1em;
     }
     span:hover{
       cursor: pointer;
     }
     hr{
       height:1.5rem;
       margin-top: 0px;
     }
   }
   .rightT{
     width:20%;
     height:60%;
     margin-left: 50%;
     margin-top: 3.3%;
     display: flex;
     flex-direction: row;
     .people{
       height:80px;
       width:80px;
       border-radius: 50%;
       margin-top: -8%;
     }
     .Title{
       font-size: 2.5em;
       color:#919191;
       font-weight: 400;
       margin-left: 5%;
       letter-spacing: 1px;
     }
     .c{
       height:25px;
       width:30px;
       margin-top: 0;
       cursor: pointer;
     }
   }
   @media only screen and (max-width: 1680px){
     h1{
       font-size: 3em;
       width:140px;
     }
      .rightT{
        width:25%;
        margin-left: 45%;
      }

   }
   @media only screen and (max-width: 1440px){
     height:120px;
     .right{
       width:12%;
       margin-left: 52%;
     }
      .rightT{
    width:30%;
        margin-left: 40%;
      }
   }
   @media only screen and (max-width: 1366px){
 .right{
   margin-left: 50%;
 }
     .rightT{
       margin-left: 35%;
     }
   }
   @media only screen and (max-width: 1280px){
     .right{
       margin-left: 48%;
     }
     .rightT{
       margin-left: 30%;
     }
   }
   @media only screen and (max-width: 1024px){
.right{
  width:18%;
  margin-left: 35%;
}
     .rightT{
       width:35%;
       margin-left: 18%;
       margin-top: 4%;
     }
   }
 }
</style>

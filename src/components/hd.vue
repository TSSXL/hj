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
        <span @click="goto" style="cursor: pointer" class="people"></span>
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
           num:true
          }
      },
      created(){
         if(this.getCookie('token')!==null)
         {
           this.num=false
         }else{
           true
         }
      },
      methods:{
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
       display: inline-block;
       background-color: yellow;
       border-radius: 50%;
       margin-top: -5%;
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
     .right{
       .rightImg{
         margin-top: 3%;
         margin-left: 45%;
       }
       .dl,.re{
         margin-top:3.5%;
       }
       hr{
         margin-top: 3.5%;
         margin-left: 1.7%;
       }
     }
      .rightT{
        margin-left: 45%;
      }

   }
   @media only screen and (max-width: 1440px){
     height:120px;
     .right{
       .rightImg{
         margin-left: 40%;
         margin-top: 3.5%;
       }
       .dl,.re,hr{
         margin-top:4%;
       }
     }
      .rightT{
    width:30%;
        margin-left: 40%;
      }
   }
   @media only screen and (max-width: 1366px){
     .rightImg{
       margin-left: 38%;
     }
   }
   @media only screen and (max-width: 1280px){
     .rightImg{
       margin-left: 35%;
     }
     .rightT{
       margin-left: 35%;
     }
   }
   @media only screen and (max-width: 1024px){
     .rightImg{
       margin-left: 25%;
     }
     .rightT{
       width:35%;
       margin-left: 20%;
       margin-top: 4%;
     }
   }
 }
</style>

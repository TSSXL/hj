<template>
    <div class="header">
      <img src="../img/headLogo.png" alt="" @click="gotoHome">
      <h1>合捷清洁</h1>
      <div class="right" v-if="num">
        <img class="rightImg" src="../img/p.svg" alt="">
        <span class="dl" @click="login">登录</span>
        <hr>
        <span class="re" @click="re">注册</span>
      </div>
      <div class="rightT" v-else>
        <img :src="info.UserImage" @click="goto" style="cursor: pointer" class="people">
        <span class="Title name" @click="show" >{{info.NickName}}</span>
          <img class="c" src="../img/car.png" @click="gotoShop">
          <span  class="Title"@click="gotoShop" >购物车</span>
          <div class="tc" :style="tcStyle" >
           <span @click="tcDL">退出登录</span>
          <img src="../img/close.svg" @click="closeTC">
        </div>
     </div>
    </div>
</template>

<script>
    export default {
        name: "hd",
      data(){
          return{
            tcStyle:{display:'none'},
            info:{},
           num:true
          }
      },
      created(){
         if(this.$store.state.token!=='' || localStorage.getItem('token')!==null)
         {
           this.num=false
           this.getInfo(this.$store.state.token || localStorage.getItem('token'))
         }else{
           this.num=true
         }
      },
      methods:{
        closeTC(){
          this.tcStyle={display:'none'}
        },
        tcDL(){
          this.$store.state.token=''
          localStorage.clear()
          this.$router.go(0)
          this.$router.push('/')
        },
        gotoHome(){
          this.$router.push('/')
        },
        getInfo(token){
          this.$http
            .get("/api/Login/PersonnelInformation",{
              params:{
                token:token,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                this.info=response.data.Result
                this.info.UserImage='http://hmc.nbxuanma.com'+response.data.Result.UserImage
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "登录失效",
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
        show(){
          this.tcStyle={display:'block'}
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
     cursor: pointer;
   }
   h1{
     font-size: 3em;
     margin-top: 3.3%;
     margin-left: 1%;
     color:#323232;
    width:10%;
   }
   .right{
     width:9%;
     height:28%;
     margin-left: 55%;
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
     width:40%;
     height:80%;
     margin-left: 30%;
     margin-top: 1%;
     display: flex;
     flex-direction: row;
     .people{
       height:80px;
       width:80px;
       border-radius: 50%;
       margin-left: 20%;
     }
     .Title{
       font-size: 2em;
       color:#919191;
       font-weight: 400;
       margin-left: 2%;
       letter-spacing: 1px;
       margin-top: 5%;
       cursor: pointer;
     }
     .name{
       width:120px;
       height:30px;
     }
     .c{
       height:25px;
       width:30px;
       margin-top: 5%;
       cursor: pointer;
     }
     .tc{
       background-color: #e6e6e6;
       margin-top: 9%;
       height:50px;
       width:18%;
       margin-left: -36%;
       border-radius: 10px;
       line-height: 50px;
       font-size: 1.5em;
       cursor: pointer;
       text-align: left;
       text-indent: 25px;
       position: relative;
       img{
         height:30px;
         width:30px;
         position: absolute;
         margin-top: 10px;
       }
     }
   }
   @media only screen and (max-width: 1680px){
     h1{
       font-size: 3em;
       width:140px;
     }
    .rightT{
      .tc{
        margin-left: -39%;
        text-indent: 18px;
      }
    }
   }
   @media only screen and (max-width: 1440px){
     height:120px;
     .right{
       width:12%;
       margin-left: 52%;
     }
      .rightT{
        width:45%;
      margin-left: 22%;
        .tc{
          width:19%;
          margin-left: -41%;
          height:45px;
        }
      }
   }
   @media only screen and (max-width: 1366px){
 .right{
   margin-left: 50%;
 }
     .rightT{
       .tc{
         width:20%;
         margin-left: -42.5%;
         height:40px;
         line-height: 40px;
         img{
           margin-top: 5px;
         }
       }
     }
   }
   @media only screen and (max-width: 1280px){
     .right{
       margin-left: 48%;
     }
     .rightT{
       width:50%;
       margin-left: 13%;
       .tc{
         width:19%;
       margin-left: -40.5%;
       }
     }
   }
   @media only screen and (max-width: 1024px){
.right{
  width:18%;
  margin-left: 35%;
}
     .rightT{
       width:65%;
       margin-left: 0%;
       .tc{
       margin-left: -42%;
       }
     }
   }
 }
</style>

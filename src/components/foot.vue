<template>
    <div class="foot">
      <img class="logoT" src="../img/logoT.png" alt="">
      <p style="cursor: pointer" @click="gotoMine">关于我们</p>
      <hr>
      <div class="mainInfo">
       <div class="a">
         <img src="../img/dz.png" alt="">
         <p>宁波合捷清洁设备有限公司</p>
         <p>浙江省宁波市镇海经济开发区</p>
         <p>东明路618号</p>
         <p>邮编:315221</p>
       </div>
        <div class="a">
          <img src="../img/p.png" alt="">
          <p>总部：T.86-574-26289620</p>
          <p>F.86-574-26251988</p>
          <p> 杭州办事处：T.86-571-82765721</p>
          <p>F.86-571-82166263</p>
        </div>
        <div class="a">
          <img src="../img/email.png" alt="">
          <p>Email:info@hijet.com.cn</p>
        </div>
      </div>
      <hr>
      <div class="e">
        <div class="wx">
          <img src="../img/w.png" alt="">
          <p>公众号</p>
        </div>
       <div class="wx">
         <img src="../img/w.png" alt="">
         <p>APP</p>
       </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "foot",
      methods:{
          gotoMine(){
            this.$router.push({path:'/mine'})
          }
      }
    }
</script>

<style lang="scss" scoped>
.foot{
  width:100%;
  background-color: rgba(241,241,241,1);
  .logoT{
    margin-top: 5%;
  }
  hr{
    color:#E2E2E2;
    width:60%;
  }
  p{
    color:#777777;
    font-size: 1.5em;
    margin-top: 2%;
    font-weight: bolder;
  }
  .mainInfo{
    display: flex;
    flex-direction: row;
    padding-top: 30px;
    width:60%;
    margin-left: 20%;
    .a{
      margin-left: 11.5%;
      img{
        width:30px;
        height:29px;
        padding-bottom: 10px;
      }
    }
  }
  .e{
    display: flex;
    flex-direction: row;
    width:20%;
    margin-left: 60%;
    .wx{
       margin-top: 5%;
      margin-left: 13%;
      img{
      height:80px;
        width:77px;
      }
      p{
        color:rgba(16,16,16,1);
        font-weight:400;
      }
    }
  }
  @media only screen and (max-width: 1680px){
    .mainInfo{
      .a{
        margin-left: 9.5%;
      }
    }
    .e{
      .wx{
        img{
          height:70px;
          width:68px;
        }
      }
    }
  }
  @media only screen and (max-width: 1440px){
    .mainInfo{
      .a{
        margin-left: 7%;
      }
    }
  }
  @media only screen and (max-width: 1366px){
    .mainInfo{
      .a{
        margin-left: 6%;
      }
    }
  }
  @media only screen and (max-width: 1280px){
    .mainInfo{
      .a{
        margin-left: 4.8%;
      }
    }
  }
  @media only screen and (max-width: 1024px){
    .mainInfo{
      width:70%;
      margin-left: 15%;
      .a{
        margin-left: 3%;
      }
    }
    .e{
      .wx{
     margin-left: 18%;
      }
    }
  }
}
</style>

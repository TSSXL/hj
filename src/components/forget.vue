<template>
  <div class="home">
    <div class="left">
      <img src="../img/l.png" alt="">
    </div>
    <div class="form">
      <span>
    <img src="../img/phone.png" alt="">
      <input type="text" v-model="number" disabled>
    </span>
      <span>
 <img src="../img/psd.png" alt="">
      <input :type="type" v-model="psd" placeholder="请输入密码">
        <img style="margin-left: -5%;cursor: pointer" src="../img/eye.svg"  @click="showPsd">
    </span>
      <span>
   <img src="../img/yzm.png" alt="">
      <input class="yzm" v-model="word" type="text" disabled>
    </span>
      <button @click="Login" style="cursor: pointer">重置密码</button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import md5 from 'js-md5'
  export default {
    name: 'forget',
    data () {
      return {
        type:'password',
        number:'',
        psd:'',
        word:''
      }
    },
    created(){
      this.number=this.$route.query.name
      this.word=this.$route.query.code
      console.log(this.$route.query.token)
    },
    methods:{
      showPsd(){
        this.type='text'
      },
      //点击登录
      Login(){
        let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
        if(Re.test(this.number) && this.psd!=='')
        {
          this.$http
            .get("/api/Login/ChangePwdNext", {
              params:{
                Token:this.$route.query.token,
                NewPwd:md5(this.psd),
                type:1,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  localStorage.setItem('token', response.data.Result.PCToken)
                  this.$store.state.token = response.data.Result.PCToken
                  this.$message("修改成功")
                  this.$router.push({path:'/'})
                }else{
                  this.$message("出错啦，后台出错")
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$message("修改失败，您输入的信息有误")
              }.bind(this)
            )
        }else{
          this.$http
            .get("/api/Login/ChangePwdNext", {
              params:{
                Token:this.$route.query.token,
                NewPwd:md5(this.psd),
                type:0,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  localStorage.setItem('token', response.data.Result.PCToken)
                  this.$store.state.token = response.data.Result.PCToken
                  this.$message("修改成功")
                  this.$router.push({path:'/'})
                }else{
                  this.$message("出错啦，后台出错")
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$message("修改失败，您输入的信息有误")
              }.bind(this)
            )
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home{
    width:100%;
    background: url("../img/login.png");
    height:998px;
    display: flex;
    .left{
      width:17%;
      height:397px;
      background-color: #33647F;
      margin-top: 16%;
      margin-left: 30%;
      img{
        margin-top: 40%;
      }
    }
    .form{
      width:25%;
      float: right;
      height:338px;
      margin-top: 16%;
      display: flex;
      flex-direction: column;
      padding-bottom: 1%;
      padding-top: 2%;
      background-color: #ffffff;
      span{
        display: inline-block;
        height:50px;
        width:100%;
        input{
          height:30px;
          float: left;
          width:59%;
          margin-left: 4%;
          font-size: 1.5em;
          border: none;
          border-bottom: 1px solid #A8A8AA;
          background-color: white;
        }
        img{
          height:29px;
          width:24px;
          float: left;
          margin-left:14%;
          padding-bottom: 0;
          margin-top: 5px;
        }
        button{
          width:18%;
          float: left;
          height:34px;
          margin-left: 1%;
          font-size: 1em;
          background:rgba(229,233,234,1);
          border-radius:5px;
          color:#4E7D99;
          margin-top: 0;
        }
        .yzm{
          width:40%;
        }
      }
      span:first-child{
        margin-top: 10%;
      }
      button{
        width:58%;
        height:40px;
        margin-left: 23%;
        font-size: 2em;
        background:rgba(51,100,127,1);
        border-radius:10px;
        margin-top: 5%;
        color:white;
      }
    }
    @media only screen and (max-width: 1680px){
      height:1060px;
      .left{
        width:20%;
        margin-left: 25%;
      }
      .form{
        width:30%;
        height:347px;
      }
    }
    @media only screen and (max-width: 1440px){
      .left{
        width:24%;
      }
      .form{
        width:32%;
         height:354px;
      }
    }
    @media only screen and (max-width: 1366px){
      height:770px;
      .form{
        height:356px;
      }
    }
    @media only screen and (max-width: 1280px){
      height:860px;
      .left{
        width:26%;
        margin-left: 20%;
      }
      .form{
        width:33%;
        height:358px;
        span{
          input{
            height:25px;
          }
          button{
            height:30px;
          }
        }
      }
    }
    @media only screen and (max-width: 1024px){
      height:770px;
      .left{
        width:35%;
        margin-left: 16%;
      }
      .form{
        width:35%;
        height:364px;
        span{
          display: inline-block;
          height:50px;
          width:100%;
          input{
            height:20px;
            float: left;
            width:68%;
            margin-left: 4%;
            font-size: 1.5em;
          }
          img{
            height:25px;
            width:20px;
          }
          button{
            width:25%;
            float: left;
            height:26px;
            margin-left: 1%;
            font-size: 1em;
          }
          .yzm{
            width:42%;
          }
        }
        button{
          width:78.5%;
          height:40px;
          margin-left: 10.5%;
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="left">
      <img src="../img/l.png" alt="">
    </div>
    <div class="form">
      <span>
<img src="../img/phone.png" alt="">
      <input type="text" v-model="number" placeholder="请输入账号">
    </span>
      <span>
   <img src="../img/yzm.png" alt="">
      <input class="yzm" v-model="word" type="text" placeholder="请输入验证码">
      <button @click="getYzm" style="cursor: pointer">获取验证码</button>
    </span>
      <button @click="Login" style="cursor: pointer">下一步</button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import md5 from 'js-md5'
  export default {
    name: 'for',
    data () {
      return {
        number:'',
        psd:'',
        word:''
      }
    },
    methods:{
      //获取验证码
      getYzm(){
        let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
        let email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        //手机获取验证码
        if(Re.test(this.number)) {
          this.$http
            .get("/api/VerifyCode/Send", {
              params:{
                phone:this.number,
                Type:1
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  this.$notify.error({
                    title: "成功",
                    message: "请查看您手机的验证码",
                  })
                }else if(response.data.Status===20){
                  this.$notify.error({
                    title: "抱歉",
                    message: "该手机号已经注册",
                  })
                }else {
                  this.$notify.error({
                    title: "错误",
                    message: "请输入正确的邮箱",
                  })
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "出错啦",
                  message: "请输入完整的信息",
                });
              }.bind(this)
            )
        }
        //邮箱获取验证码
        else if(email.test(this.number)) {
          this.$http
            .get("/api/User/EmailCode", {
              params:{
                EmailAddress:this.number
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  this.$notify.error({
                    title: "成功",
                    message: "请进入您的邮箱查看验证码",
                  })
                }else{
                  this.$notify.error({
                    title: "错误",
                    message: "请输入正确的邮箱",
                  })
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "出错啦",
                  message: "请输入正确的信息",
                });
              }.bind(this)
            )
        }
        //都不符合
        else{
          this.$notify.error({
            title: "请输入",
            message: "账号是您的手机号或邮箱",
          })
        }
      },
      //点击登录
      Login(){
        let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
        let email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        //手机重置密码
        if(Re.test(this.number)&&this.word!=="") {
          this.$http
            .get("/api/Login/ChangePwd", {
              params:{
                Code:this.word,
                Uname:this.number,
                type:"1"
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  this.$message("验证成功")
                  this.$router.push({path:'/forget',query:{name:response.data.Result.name,code:response.data.Result.code,token:response.data.Result.token}})
                }else{
                  this.$notify.error({
                    title: "出错啦",
                    message: "请通知后台",
                  });
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "您输入的信息有误",
                });
              }.bind(this)
            )
        }
        //邮箱重置密码
        else if(email.test(this.number)&&this.word!=="") {
          this.$http
            .get("/api/Login/ChangePwd", {
              params:{
                Code:this.word,
                Uname:this.number
              }
            })
            .then(
              function (response) {
                if(response.data.Status===1)
                {
                  this.$message("验证成功")
                  this.$router.push({path:'/forget',query:{name:response.data.Result.name,code:response.data.Result.code,token:response.data.Result.token}})
                }else{
                this.$message(response.data.Result)
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "您输入的信息有误",
                });
              }.bind(this)
            )
        }
        //都不符合
        else{
          this.$notify.error({
            title: "错误",
            message: "您少输或输入的格式不正确",
          });
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

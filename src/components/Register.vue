<template>
<div class="home">
  <div class="left">
    <img src="../img/l.png" alt="">
  </div>
  <div class="form">
    <span>
      <img src="../img/phone.png" alt="">
      <input type="text" v-model="number" placeholder="请输入账号(手机号或邮箱)">
    </span>
    <span>
    <img src="../img/psd.png" alt="">
      <input :type="type" v-model="psd" placeholder="请输入密码">
        <img style="margin-left: -5%;cursor: pointer" src="../img/eye.svg"  @click="showPsd">
    </span>
    <span>
      <img src="../img/yzm.png" alt="">
      <input class="yzm" v-model="word" type="text" placeholder="请输入验证码">
      <button  @click="getYzm" style="cursor: pointer" :disabled="!canClick" :style="btnStyle">{{content}}</button>
    </span>
    <button @click="zc" style="cursor: pointer">免费注册</button>
  </div>
</div>
</template>

<script>
  import qs from 'qs'
  import md5 from 'js-md5'
export default {
  name: 'Register',
  data () {
    return {
      content:"获取验证码",
      canClick:true,
      type:'password',
      number:'',
      psd:'',
      word:'',
      totalTime:60
    }
  },
  computed:{
    btnStyle:function () {
      if(this.canClick===false){
        return {backgroundColor:'#33647F',color:'white'}
      }
    }
  },
  methods:{
    showPsd(){
      this.type='text'
    },
    timeChange(){
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true  //这里重新开启
        }
      },1000)
    },
    //点击获取验证码
    getYzm(){
      let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      let email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      //手机号获取验证码
      if(Re.test(this.number)) {
        this.$http
          .get("/api/VerifyCode/Send", {
            params:{
              phone:this.number,
              Type:0
            }
          })
          .then(
            function (response) {
              if(response.data.Status===1)
              {
                this.$message("发送成功，请查看您手机的验证码")
                this.timeChange()
              }else if(response.data.Status===20){
                this.$message("抱歉，该手机号已经注册")
                this.timeChange()
              }else {
                this.$message("错误，获取手机验证码失败")
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message("提示，获取验证码失败")
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
                this.$message("发送成功，请进入您的邮箱查看验证码,若未收到，请去垃圾箱中查看")
                this.timeChange()
              }else if(response.data.Status===20){
                this.$message("抱歉，该邮箱已经注册")
                this.timeChange()
              }else {
                this.$message("错误，请输入正确的邮箱")
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message("提示，获取验证码失败")
            }.bind(this)
          )
      }
      //都不符合
      else{
        this.$message("提示，账号是您的手机号或邮箱")
      }
    },
    //点击注册
    zc(){
      let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      let email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
      //手机注册
      if(Re.test(this.number)&&this.psd!==""&&this.word!=="") {
        this.$http
          .get("/api/VerifyCode/Verify",{
            params:{
              phone:this.number,
              code:this.word
            }})
          .then(
            function (response) {
              //如果后台判断验证码正确则执行注册
              if(response.data.Status===1)
              {
                this.$http
                  .post("/api/User/Register",
                    qs.stringify({
                      Phone:this.number,
                      Pwd:md5(this.psd),
                      Code:this.word,
                      Lng:0,
                      Lat:0,
                      Id:"string"
                    }))
                  .then(
                    function (response) {
                      if(response.data.Status===105)
                      {
                        localStorage.setItem('token', response.data.Result.PCToken)
                        this.$store.state.token = response.data.Result.PCToken
                        this.$message("注册成功")
                        this.$router.push({path:'/'})
                      }else{
                        this.$message("该手机号已被注册,即将跳转到登录页面")
                        this.$router.push({path:'/login'})
                      }
                    }.bind(this)
                  )
                  .catch(
                    function (error) {
                      this.$message("注册失败,您输入的信息有误")
                    }.bind(this)
                  )
              }else{
                this.$message("验证码输入错误")
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message("注册失败,您输入的信息有误")
            }.bind(this)
          )
      }
      //邮箱注册
      else if(email.test(this.number)&&this.psd!==""&&this.word!=="") {
        this.$http
          .get("/api/Login/EmailRegister", {
            params:{
              Code:this.word,
              Uname:this.number,
              Pwd:md5(this.psd)
            }
          })
          .then(
            function (response) {
              if(response.data.Status===1)
              {
                localStorage.setItem('token', response.data.Result.PCToken)
                this.$store.state.token = response.data.Result.PCToken
                this.$message("注册成功")
                this.$router.push({path:'/'})
              }else if(response.data.Status===11)
              {
                this.$message("该邮箱已被注册,即将跳转到登录页面")
                this.$router.push({path:'/login'})
              }else{
                this.$message("未知错误")
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$message("注册失败,您输入的信息有误")
            }.bind(this)
          )
      }
      //如果不满足手机注册或邮箱注册
      else{
        this.$message("提示,您少输或输入的格式不正确")
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
    height:320px;
    margin-top: 16%;
    display: flex;
    flex-direction: column;
    padding-bottom: 2%;
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
        width:22%;
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
      height:330px;
    }
  }
  @media only screen and (max-width: 1440px){
    .left{
      width:24%;
    }
    .form{
      width:32%;
      height:339px;
    }
  }
  @media only screen and (max-width: 1366px){
    height:770px;
    .left,.form{
      margin-top: 15%;
    }
    .form{
      height:342px;
    }
  }
  @media only screen and (max-width: 1280px){
    height:860px;
    .form{
      width:33%;
      height:346px;
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
      width:30%;
      margin-left: 16%;
    }
    .form{
      width:35%;
      height:356px;
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
          margin-left: 10%;
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
        width:67%;
        height:40px;
        margin-left: 19%;
        font-size: 1.5em;
      }
    }
  }
}
</style>

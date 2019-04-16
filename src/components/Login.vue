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
      <input :type="type"  v-model="psd" placeholder="请输入密码" >
        <img style="margin-left: -5%;cursor: pointer" src="../img/eye.svg"  @click="showPsd">
    </span>
      <button style="cursor: pointer" @click="Login">登录</button>
      <div class="handle">
        <span @click="gotoForget">忘记密码</span>
        <span @click="goRegister">免费注册</span>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import md5 from 'js-md5'
  export default {
    name: 'Login',
    data () {
      return {
        type:'password',
        number:'',
        psd:''
      }
    },
    methods:{
      showPsd(){
        this.type='text'
      },
      //点击登录
      Login(){
        let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
        let email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        //手机登录
        if(Re.test(this.number)&&this.psd!=="") {
         this.getLogin(1)
        }
        //邮箱登录
        else if(email.test(this.number)&&this.psd!=="") {
         this.getLogin(0)
        }
        //如果不满足手机登录或者邮箱登录
        else{
          this.$notify.error({
            title: "失败",
            message: "请重新输入账号和密码",
          })
        }
      },
      getLogin(type){
        this.$http
          .post("/api/Login/ComLogin",
            qs.stringify({
              Name: this.number,
              Password: md5(this.psd),
              type:type
            })
          )
          .then(
            function (response) {
              if(response.data.Status===1)
              {
                //后台获取token存到本地和store中
                //存到local中是为了防止页面刷新state中数据变为undefined请求发不出去
                localStorage.setItem('token', response.data.Result)
                this.$store.state.token = response.data.Result
                this.$message('登录成功')
                this.$router.push({path:'/'})
              }else{
                this.$message(response.data.Result)
              }
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "登录失败",
                message: "请重新输入",
              });
            }.bind(this)
          )
      },
      //跳转到忘记密码页面
      gotoForget(){
        this.$router.push('/for')
      },
      //跳转到注册页面
      goRegister(){
        this.$router.push('/register')
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
      margin-right: 20%;
      height:337px;
      display: flex;
      margin-top: 16%;
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
      }
      span:first-child{
        margin-top: 10%;
      }
      button{
        width:58%;
        height:40px;
        margin-left: 23%;
        font-size: 2em;
        margin-top: 8%;
        background-color: #33647F;
        border-radius: 10px ;
        color:white;
      }
      .handle{
        width:60%;
        margin-left: 20%;
        height:50px;
        display: flex;
        flex-direction: row;
        span{
          font-size: 1.7em;
          line-height: 50px;
          color:#000000;
          margin-top: 0;
          color:rgba(51,100,127,1);
        }
        span:hover{
          cursor: pointer;
        }
      }
    }
    @media only screen and (max-width: 1680px){
      height:1060px;
       .left{
         width:20%;
       }
      .form{
        height:347px;
      span:first-child{
        margin-top: 16%;
       }
        .handle{
          span{
            margin-top: 0;
          }
        }
      }
    }
    @media only screen and (max-width: 1440px){
      .left{
        width:24%;
        margin-left: 22%;
      }
      .form{
        width:30%;
           height:352px;
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
        width:25%;
        margin-left: 20%;
      }
      .form{
        height:359px;
        width:33%;
        span{
          input{
            height:25px;
          }
        }
      }
    }
    @media only screen and (max-width: 1024px){
      height:770px;
      .left{
        width:34%;
        margin-left: 14%;
      }
      .form{
        height:366px;
        width:38%;
        img{
          height:120px;
          width:80%;
          margin-left: 10%;
          padding-bottom: 5%;
        }
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
            height:24px;
            width:20px;
            margin-left: 10%;
          }
        }
        button{
          width:70%;
          height:40px;
          margin-left: 16%;
        }
      }
    }
  }
</style>

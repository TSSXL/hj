<template>
  <div class="mine">
    <Logo-Component></Logo-Component>
    <ul class="nav">
      <li  v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" >{{item.Name}}</li>
    </ul>
    <div class="content">
      <p>个人中心</p>
    <div class="main">
      <div class="mainItem">
      <span>我的头像:</span>
        <el-upload  class="avatar-uploader" :limit="1" :action="actionUser" :on-preview="handlePictureCardPreview"
                   list-type="picture-card" :on-success="handleAvatarSuccess" >
            <img :src="info.UserImage" alt="" style="height:100%;width:100%;border: none;">
        </el-upload>
      </div>
      <div class="mainItem">
        <span>用户昵称:</span>
        <input type="text" v-model="info.NickName" >
      </div>
      <div class="mainItem">
        <span>登录账号:</span>
        <span>{{info.Account}}</span>
      </div>
      <div class="mainItem">
        <span>会员等级:</span>
        <span>VIP{{info.VipLv}}</span>
        <span style="color:#33647F;cursor: pointer" @click="Dialog">去认证</span>
      </div>
    </div>
      <button @click="editPerson">保存</button>
    </div>
    <!--点击认证-->
    <el-dialog
      title="会员认证"
      :visible.sync="dialogVisible"
      width="40%"
      style="margin-top: 5%;"
     >
      <el-form  label-width="80px">
        <el-form-item label="会员姓名:">
          <el-input v-model="VipName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="IDCard"></el-input>
        </el-form-item>
        <el-form-item label="营业执照:">
          <el-upload v-model="yyImage" class="avatar-uploader" :limit="1" :action="action" :on-preview="handlePictureCardPreviewU"
                     list-type="picture-card" :on-success="handleAvatarSuccessU" >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="tj">提 交</el-button>
    <el-button  @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <!--提交认证-->
    <el-dialog
      :visible.sync="dialogVisibleTwo"
      width="30%"
      class="aaa"
      style="margin-top: 5%;"
    >
      <img src="../img/hy.png" alt="">
      <p>会员认证信息提交成功</p>
      <p>请耐心等待</p>
    </el-dialog>
    <Foot-Component></Foot-Component>
  </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
  export default {
    name: "people",
    data(){
      return{
        VipName:'',
        IDCard:'',
        yyImage:'',
        imageUrl:'',
        actionUser:'',
        info:{},
        action:'',
        dialogVisible:false,
        dialogVisibleTwo:false,
        navList:[
          {ID:"0",Name:"首页"}
        ],
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      this.getNav()
      this.getInfo(this.$store.state.token || localStorage.getItem('token'))
    },
    beforeMount(){
      this.actionUser='http://192.168.1.105/HMC/api/Login/UpdateForImage?type=0'
      this.action='http://192.168.1.105/HMC/api/Login/UpdateForImage?type=1'
    },
    methods:{
      //修改个人信息
      editPerson(){
        if(this.imageUrl!=='')
        {
          this.$http
            .get("/api/Login/UpdateInformation",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                NickName:this.info.NickName,
                Image:this.imageUrl
              }
            })
            .then(
              function (response) {
              this.$message(response.data.Result)
                this.getInfo(this.$store.state.token || localStorage.getItem('token'))
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "修改失败",
                });
              }.bind(this)
            )
        }else{
          this.$http
            .get("/api/Login/UpdateInformation",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                NickName:this.info.NickName
              }
            })
            .then(
              function (response) {
              this.$message(response.data.Result)
                this.getInfo(this.$store.state.token || localStorage.getItem('token'))
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "修改失败",
                });
              }.bind(this)
            )
        }

      },
      //获取个人信息
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
      //获取导航栏
      getNav(){
        this.$http
          .post("/api/Shopping/ReturnList")
          .then(
            function (response) {
              this.navList=this.navList.concat(response.data.Result)
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "请通知后台",
              });
            }.bind(this)
          )
      },
      //导航栏
      handle(index,ID){
        if(index===0)
        {
          this.$router.push('/')
        }else{
          this.$router.push({path:'/classify',query:{id:index,ID:ID}})
        }
      },
      //点击认证
      Dialog(){
        this.VipName=''
        this.IDCard=''
        this.yyImage=''
      this.dialogVisible=true
      },
      //弹框点击提交
      tj(){
        this.dialogVisible=false
        this.$http
          .get("/api/Login/MembershipCertification",{
            params:{
            token:this.$store.state.token || localStorage.getItem('token'),
              VipName:this.VipName,
              IDCard:this.IDCard,
              Image:this.yyImage
            }
          })
          .then(
            function (response) {
           this.$message(response.data.Result)
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "认证失败",
              });
            }.bind(this)
          )
       // this.dialogVisibleTwo=true
      },
      //上传前
      handlePictureCardPreview(file) {
       console.log(file)
      },
      //上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.Result[0]
      },
      handlePictureCardPreviewU(file) {

      },
      handleAvatarSuccessU(res, file) {
        this.yyImage=res.Result[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mine{
    width:100%;
    .nav{
      list-style: none;
      height:100px;
      margin-left: 2%;
      margin-top: 0;
      li{
        float: left;
        width:15%;
        height:100%;
        font-size: 2.5em;
        font-weight: bolder;
        line-height:100px;
        color:#919191;
      }
      li:hover{
        cursor: pointer;
      }
      li:first-child{
        margin-left:8%;
      }
    }
    .content{
      display: inline-block;
      width:100%;
      padding-bottom: 60px;
      background-color: rgb(249, 249, 249);
      p{
        color:#33647F;
        font-size: 2.5em;
        font-weight: bolder;
        margin-left: -33%;
        margin-top: 5%;
        color:#33647F;
      }
      .main{
        width:50%;
        display: flex;
        margin-left: 31%;
        flex-direction: column;
        padding-bottom: 80px;
        .mainItem{
          width:100%;
          display: flex;
          margin-top: 40px;
          flex-direction: row;
          span{
            display: inline-block;
            width:12%;
            font-size: 2em;
            float: left;
            text-align: left;
            color:#777777;
            font-weight: bolder;
          }
          img{
            cursor: pointer;
            border: 1px solid #C4C1C1;
          }
          input{
            width:30%;
            height:30px;
            border: 1px solid #C4C1C1;
            border-radius: 2px;
          }
        }
      }
      button{
        width:15%;
        height:40px;
        font-size: 2em;
        background-color: #33647F;
        border-radius: 10px ;
        color:white;
      }
    }
    @media only screen and (max-width: 1440px){
      .content{
        p{
          margin-left: -32%;
        }
      .main{
        margin-left: 30.8%;
        .mainItem{
          span{
            width:20%;
          }
          input{
            width:50%;
          }
        }
      }
        button{
          width:18%;
        }
      }
    }
    @media only screen and (max-width: 1280px){
      .content{
        .main{
          margin-left: 30.5%;
        }
      }
    }
    @media only screen and (max-width: 1024px){
      .content{
        .main{
          margin-left: 29.5%;
        }
      }
    }
  }
</style>

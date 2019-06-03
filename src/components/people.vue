<template>
  <div class="mine">
    <img src="../img/shkf.png" class="shImg"  @click="gotoLx">
    <Logo-Component></Logo-Component>
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
        <span style="width:55%;">{{info.Account}}</span>
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
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="action"
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewU"
            :on-success="handleAvatarSuccessU">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleU">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
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
        dialogVisibleU:false,
        dialogImageUrl:'',
        VipName:'',
        IDCard:'',
        yyImage:'',
        imageUrl:'',
        actionUser:'',
        info:{},
        action:'',
        dialogVisible:false,
        dialogVisibleTwo:false,
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      if(this.$store.state.token!=='' || localStorage.getItem('token')!==null)
      {
        this.getInfo(this.$store.state.token || localStorage.getItem('token'))
      }else{
        this.$message("您还未登录")
        this.$router.push({path:'/login'})
      }

    },
    beforeMount(){
      this.actionUser='http://hmc.nbxuanma.com/api/Login/UpdateForImage?type=0'
      this.action='http://hmc.nbxuanma.com/api/Login/UpdateForImage?type=1'
    },
    methods:{
      gotoLx(){
        this.$router.push({path:'/lx'})
      },
      //修改个人信息
      editPerson(){
        if(this.imageUrl!=='')
        {
          this.$http
            .get("/api/Login/UpdateInformation",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                NickName:this.info.NickName,
                Image:this.imageUrl,
                PCorApp:"PC"
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
                NickName:this.info.NickName,
                PCorApp:"PC"
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
              token:token,
              PCorApp:"PC"
            }
          })
          .then(
            function (response) {
            this.info=response.data.Result
            this.info.UserImage=response.data.Result.UserImage
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "后台出错",
              });
            }.bind(this)
          )
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
        this.$refs.upload.clearFiles();
        if(this.yyImage===''||this.VipName==='' ||this.IDCard==='')
        {
          this.$message("请将信息填写完整")
        }else{
          this.dialogVisible=false
          this.$http
            .get("/api/Login/MembershipCertification",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                VipName:this.VipName,
                IDCard:this.IDCard,
                Image:this.yyImage,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                if(response.data.Result==="格式正确")
                {
                  this.dialogVisibleTwo=true
                }else{
                  this.$message(response.data.Result)
                }
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "请将信息填写完整",
                });
              }.bind(this)
            )
        }
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
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccessU(res, file) {
        this.yyImage=this.yyImage.concat(res.Result+";")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mine{
    width:100%;
    .shImg{
      position: fixed;
      top:450px;
      right:0;
      cursor: pointer;
      height:35px;
      width:120px;
      z-index: 999;
      object-fit:cover;
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
        margin-left: -44%;
        margin-top: 5%;
      }
      .main{
        width:50%;
        display: flex;
        margin-left: 25.5%;
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
        cursor: pointer;
      }
    }
    @media only screen and (max-width: 1440px){
      .content{
      .main{
        margin-left: 25%;
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
    @media only screen and (max-width: 1024px){
      .content{
      p{
        margin-left: -41.5%;
      }
      }
    }
  }
</style>

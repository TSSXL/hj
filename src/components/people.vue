<template>
  <div class="mine">
    <Logo-Component></Logo-Component>
    <ul class="nav">
      <li  v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="select===index?colorStyle:''">{{item.Name}}</li>
    </ul>
    <div class="content">
      <p>个人中心</p>
    <div class="main">
      <div class="mainItem">
      <span>我的头像:</span>
        <img src="../img/a.png" alt="">
      </div>
      <div class="mainItem">
        <span>用户名&nbsp;:</span>
        <input type="text" >
      </div>
      <div class="mainItem">
        <span>账&nbsp;&nbsp;号:</span>
        <span>15645456514</span>
      </div>
      <div class="mainItem">
        <span>会员等级:</span>
        <span>VIP5</span>
        <span style="color:#33647F;cursor: pointer" @click="Dialog">去认证</span>
      </div>
    </div>
      <button>保存</button>
    </div>
    <el-dialog
      title="会员认证"
      :visible.sync="dialogVisible"
      width="30%"
      style="margin-top: 5%;"
     >
      <el-form  label-width="80px">
        <el-form-item label="会员姓名:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="营业执照:">
          <el-upload v-model="form.Image" class="avatar-uploader" :limit="1" :action="action" :on-preview="handlePictureCardPreview"
                     list-type="picture-card" :on-success="handleAvatarSuccess" >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="tj">提 交</el-button>
    <el-button  @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisibleTwo"
      width="30%"
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
        action:'',
       form:{
         Image:''
       },
        dialogImageUrl:'',
        dialogVisible:false,
        dialogVisibleTwo:false,
        select:0,
        colorStyle:{
          color:'#33647F'
        },
        navList:[
          {ID:"0",Name:"首页"}
        ],
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      this.getNav()
    },
    methods:{
      handleAvatarSuccess(response) {
        this.form.Image = response.Result[0];
        console.log(this.form.Image)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
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
      handle(index,ID){
        this.select=index
        if(index===0)
        {
          this.$router.push('/')
        }else{
          this.$router.push({path:'/classify',query:{id:index,ID:ID}})
        }
      },
      Dialog(){
      this.dialogVisible=true
      },
      tj(){
        this.dialogVisible=false
       this.dialogVisibleTwo=true
      },
      handleAvatarSuccess(res, file) {
        console.log(res.data.Result[0])
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isPNG  && isLt2M;
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
      margin-left: 10%;
      margin-top: 0;
      li{
        float: left;
        width:11%;
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
        margin-left: -50%;
        margin-top: 5%;
        color:#33647F;
      }
      .main{
        width:50%;
        display: flex;
        margin-left: 22%;
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
    @media only screen and (max-width: 1680px){
      .content{
      }
    }
    @media only screen and (max-width: 1440px){
      .content{
      .main{
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
  }
</style>

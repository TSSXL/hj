<template>
<div class="lx">
  <Logo-Component></Logo-Component>
  <div class="content">
    <p>售后服务</p>
    <div class="mainContent">
    <div class="item">
      <span>联系人&nbsp;：</span>
      <input type="text" v-model="form.ContactName" >
    </div>
      <div class="item">
        <span>联系方式：</span>
        <input type="text" v-model="form.ContactWay"  >
      </div>
      <div class="item">
        <span>留&nbsp;&nbsp;言：</span>
        <textarea v-model="form.Remarks" ></textarea>
      </div>
    </div>
    <button class="btn" @click="doit">提交</button>
  </div>
  <Foot-Component></Foot-Component>
</div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
  import qs from 'qs'
    export default {
        name: "lx",
      data(){
          return{
           form:{
             Token:this.$store.state.token || localStorage.getItem('token'),
             ContactName:'',
             ContactWay: '',
             Remarks: '',
             PCorApp: "PC"
           }
          }
      },
      created(){
          if((this.$store.state.token!=='' || localStorage.getItem('token')!==null) &&((this.$store.state.VipLv!==null &&this.$store.state.VipLv!=0) || localStorage.getItem('VipLv')!=0))
          {
            console.log("您有权反馈")
          }else if(this.$store.state.VipLv==0 || localStorage.getItem('VipLv')==0){
            this.$message("请先认证,请在此页面进行认证")
            this.$router.push({path:'/people'})
          }else if(this.$store.state.token==='' || localStorage.getItem('token')===null){
            this.$message("请先登录，请在此页面登录")
            this.$router.push({path:'/login'})
          }
      },
      components:{LogoComponent,FootComponent},
      methods:{
        doit(){
          let Re= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
          if(this.form.ContactName==='' || this.form.ContactWay==='' || this.form.Remarks===''){
            this.$message("请输入完整的信息")
          }else if(!Re.test(this.form.ContactWay)){
          this.$message("请输入正确的手机号")
          }else{
            this.$http
              .post("/api/Login/Service",qs.stringify({
                Token:this.form.Token,
                ContactName:this.form.ContactName,
                ContactWay: this.form.ContactWay,
                Remarks: this.form.Remarks,
                PCorApp:this.form.PCorApp
              }))
              .then(function (res) {
                this.$message(res.data.Result)
              }.bind(this))
              .catch(function (error) {

              }.bind(this))
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.lx{
  width:100%;
  .content{
    width:100%;
    display: inline-block;
    padding-bottom: 60px;
    background-color: rgb(249, 249, 249);
    p{
      color:#33647F;
      font-size: 2.5em;
      font-weight: bolder;
      margin-left: -44%;
      margin-top: 5%;
    }
    .mainContent{
      width:50%;
      margin-left: 25.5%;
      padding-bottom: 60px;
      .item{
        width:100%;
        display: flex;
        flex-direction: row;
        margin-top: 40px;
        span{
          display: inline-block;
          width:12%;
          font-size: 2em;
          float: left;
          text-align: left;
          color:#777777;
          font-weight: bolder;
        }
        input,textarea{
          width:30%;
          height:30px;
          border: 1px solid #C4C1C1;
          border-radius: 2px;
        }
        textarea{
          height:160px;
          width:45%;
        }
      }
    }
    .btn{
      width:230px;
      background-color: #33647F;
      height:40px;
      color:white;
      font-size: 1.5em;
      font-weight: bolder;
      cursor: pointer;
      border-radius: 10px;
    }
  }
  @media only screen and (max-width: 1680px){
    .mainContent{
      margin-left: 25% !important;
     .item{
       span{
         width:18% !important;
       }
     }
    }
  }
  @media only screen and (max-width: 1366px){
    .mainContent{
      margin-left: 24.5% !important;
    }
  }
  @media only screen and (max-width: 1024px){
    .mainContent{
      .item{
        span{
          width:20% !important;
        }
      }
    }
  }
}
</style>

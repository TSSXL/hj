<template>
  <div id="app">
    <router-view/>
    <img src="./img/shkf.png" class="shImg"  @click="gotoLx">
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    gotoLx(){
      this.$router.push({path:'/lx'})
    },
  }
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  .shImg{
    position: fixed;
    top:450px;
    right:0;
    cursor: pointer;
    height:50px;
    width:120px;
    z-index: 999;
  }
  a{
    color:white;
  }
  .el-popover{
    border: none !important;
    min-width:0 !important;
    background-color:transparent !important;
    box-shadow: none !important;
  }
  .el-button:hover{
    background-color: white !important;
    border: none !important;
    color:#919191 !important;
  }
  .el-button{
    border:none !important;
    font-size: 22px !important;
    font-weight: bolder !important;
    color:#919191 !important;
    background-color:transparent !important;
  }
  .el-checkbox__inner{
    width:30px !important;
    height:30px !important;
    margin-top: 55px !important;
    margin-left: 20px !important;
  }
  .el-checkbox__inner::after{
    height: 18px !important;
    left: 13px !important;
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
    margin-left: 0px;
  }
  input:focus{
    outline: none;
  }
#app {
  font-family:PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
}
  @media only screen and (max-width: 1366px){
    .el-cascader-menus{
      height:450px;
    }
  }
</style>

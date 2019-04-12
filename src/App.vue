<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
#app {
  font-family:PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 62.5%;
}
  .el-checkbox__inner{
    width:30px;
    height:30px;
    margin-top: 55px;
    margin-left: 20px;
  }
  .el-checkbox__inner::after{
    height: 18px;
    left: 13px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
input:focus{
  outline: none;
}
  .vjs_video_3-dimensions {
       width: 394px !important;
       height: 370px !important;
     }
  .video-js .vjs-big-play-button{
    top:42% !important;
    left: 38% !important;
  }

  @media only screen and (max-width: 1680px){
    .vjs_video_3-dimensions {
      width: 340px !important;
      height: 370px !important;
    }
  }
  @media only screen and (max-width: 1280px){
    .vjs_video_3-dimensions {
      width: 310px !important;
      height: 370px !important;
    }
  }
  @media only screen and (max-width: 1024px){
    .vjs_video_3-dimensions {
      width: 260px !important;
      height: 280px !important;
    }
    .video-js .vjs-big-play-button{
      left: 30% !important;
    }
  }
</style>

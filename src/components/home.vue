<template>
    <div class="homeContainer">
    <Logo-Component></Logo-Component>
      <!--四个导航栏-->
      <ul class="nav">
        <li v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="select===index?colorStyle:''">{{item.Name}}</li>
      </ul>
      <!--轮播图-->
      <el-carousel height="450px">
        <el-carousel-item v-for="item in imgList" :key="item" >
          <img :src="item" alt="" style="width:100%;height:100%;">
        </el-carousel-item>
      </el-carousel>
      <!--商品分类内容-->
      <div class="container" v-for="item in list">
        <p class="l">{{item.Title}}</p>
        <ul class="containUl">
          <li v-for="j in item.Context">
            <img  @click="goods(j.ID,j.ClassID)" :src="j.image[0]"  alt="正在加载中">
            <p>{{j.Name}}</p>
            <p class="price" :style="PriceStyle">￥{{j.Price}}</p>
           <span>会员价￥{{j.DisPrice}}</span>
          </li>
        </ul>
      </div>
      <Foot-Component></Foot-Component>
    </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
    export default {
        name: "home",
      data(){
          return{
            PriceStyle:{},
             navList:[
              {ID:"0",Name:"首页"}
             ],
            imgList:[],
            select:0,
            colorStyle:{
               color:'#33647F'
            },
            list:[]
          }
      },
      components:{LogoComponent,FootComponent},
      created(){
          this.getImg()
          this.getNav()
        if(this.getCookie('token')!==null)
        {
          this.PriceStyle={
            textDecoration:'line-through'
          }
          this.getGoodsToken(this.getCookie('token'))
        }
        else{
          this.$message("您还未登录")
          this.getGoods()
        }
      },
      methods:{
          //获取轮播图
        getImg(){
          this.$http
            .get("/api/Login/LBImage",{
              params:{
                lift:"0",
                length:"3"
              }
            })
            .then(
              function (response) {
              this.imgList=response.data.Result.Image
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "获取图片失败",
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
                  this.setCookie('nav',this.navList)
                }.bind(this)
              )
              .catch(
                function (error) {
                  this.$notify.error({
                    title: "错误",
                    message: "获取导航栏失败",
                  });
                }.bind(this)
              )
          },
        //未登录获取商品
          getGoods(){
            this.$http
              .get("/api/Shopping/ShowList",{
                params:{
                  PageIndex:1,
                  PageSize:6
                }
              })
              .then(
                function (response) {
                 this.list=response.data.Result.List
                }.bind(this)
              )
              .catch(
                function (error) {
                  this.$notify.error({
                    title: "错误",
                    message: "获取未登录商品失败",
                  });
                }.bind(this)
              )
          },
        //登录之后获取商品
        getGoodsToken(token){
          this.$http
            .get("/api/Shopping/ShowList",{
              params:{
                PageIndex:1,
                PageSize:6,
                token:token
              }
            })
            .then(
              function (response) {
                this.list=response.data.Result.List
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "获取登录商品失败",
                });
              }.bind(this)
            )
        },
        //点击进入商品详情
        goods(ID,ClassID){
          this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
        },
        //导航栏切换
        handle(index,ID){
          this.select=index
          if(index!==0)
          {
            this.$router.push({path:'/classify',query:{id:index,ID:ID}})
          }else{
           this.$message("本页不用跳转啦")
          }
        }
      }
    }
</script>

<style lang="scss"  scoped>
 .homeContainer{
   .nav{
     list-style: none;
     height:100px;
     margin-top: 0;
     margin-left: 10%;
     li{
       float: left;
       width:13%;
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
   .container{
     margin-top: 20px;
     padding-bottom: 60px;
     display: inline-block;
     width:100%;
     background-color: #FCFCFC;
     .l:after{
       content: '';
       display:inline-block;
       height:2px;
       width:90px;
       background-color: #33647F;
       position: absolute;
       margin-top: 2%;
       margin-left: -5%;
     }
     p{
       font-size: 2.5em;
       font-weight: bolder;
       color:#777777;
     }
     .containUl{
       list-style: none;
       width:100%;
       margin-left: 4%;
       li{
         float: left;
         width:19%;
         height:390px;
         margin-left: 8%;
         margin-top: 2%;
         border-radius: 10px;
         background:rgba(255,255,255,1);
         box-shadow:0px 1px 5px 0px rgba(43,43,43,0.14);
         p{
           font-size: 2em;
           text-align: left;
           margin-left: 10%;
           width:80%;
           margin-top: 0;
           color:#393939;
         }
         .price{
           color:#787878;
         }
         img{
           height:280px;
           width:80%;
           margin-top: 6%;
           padding-bottom: 10px;
         }
         img:hover{
           cursor: pointer;
         }
         span{
           display: inline-block;
           position: absolute;
           margin-top: -2.3%;
           font-size: 2.2em;
           font-weight: bolder;
           margin-left: -2%;
          color:#33647F;
         }
       }
     }
   }
   @media only screen and (max-width: 1680px){
    .container{
      .l{
        text-indent: 2.5%;
      }
      .l:after{
        margin-left: -5.65%;
      }
      .containUl{
        li{
          height:300px;
          img{
            height:200px;
            padding-bottom: 20px;
          }
          p{
            margin-top: -10px;
          }
          span{
            margin-top: -2.7%;
            font-size: 2.1em;
          }
        }
      }
    }
   }
   @media only screen and (max-width: 1440px){
     .container{
       .l:after{
         margin-left: -6.7%;
         margin-top: 2.5%;
       }
       .containUl{
         li{
           height:260px;
           img{
             height:170px;
             padding-bottom: 20px;
           }
           p{
             margin-top: -10px;
             font-size: 1.8em;
           }
           span{
             font-size: 1.8em;
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1366px){
     .container{
       .l:after{
         margin-left: -7%;
       }
       .containUl{
         li{
           p{
             font-size: 1.6em;
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1280px){
     .nav {
       li{
         width:14%;
       }
     }
     .container{
       .l:after{
         margin-left: -7.5%;
       }
       .containUl{
         li{
           height:200px;
           img{
             height:140px;
             padding-bottom: 10px;
           }
           p{
           font-size: 1.5em;
           }
           span{
             font-size: 1.6em;
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1024px){
     .nav {
       li{
    font-size: 2em;
       }
     }
     .container{
       .l:after{
         width:60px;
         margin-left: -6.5%;
       }
       p{
         font-size: 1.8em;
       }
       .containUl{
         li{
           height:180px;
           img{
             height:120px;
             padding-bottom: 15px;
           }
           p{
             font-size: 1.3em;
           }
           span{
             font-size: 1.3em;
           }
         }
       }
     }
   }
 }
</style>

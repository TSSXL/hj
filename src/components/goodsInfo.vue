<template>
    <div class="goodsInfo">
      <img src="../img/shkf.png" class="shImg"  @click="gotoLx">
      <Logo-Component></Logo-Component>
      <ul class="nav">
        <li class="firstLi" @click="gotoGoodsMain">
          <el-popover
            placement="bottom"
            width="900"
            trigger="hover"
          >
            <Jl-Component class="jlCon"></Jl-Component>
            <el-button slot="reference">产品中心</el-button>
          </el-popover>
        </li>
        <li v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="ColorStyle(item.ID)">{{item.Name}}</li>
      </ul>
      <!--商品名称-->
      <div class="goodsMsg">
       <div class="left">
         <video class="video" autoplay="autoplay" controls v-if="isShowVideo">
           <source :src="videoUrl"  type="video/mp4">
         </video>
         <img  :src="imgUrl" alt="加载中" v-else >
         <!--商品有小视频-->
          <div class="lb" v-if="goodInfo.image&&goodInfo.image.VideoPath.length>0">
            <img class="leftA" src="../img/left.png" @click="leftImage">
            <video class="littleVideo"    @click="playVideo">
              <source :src="videoUrl"  type="video/mp4" >
              <source :src="videoUrl"  type="video/ogg" >
              <source :src="videoUrl"  type="video/webm" >
            </video>
              <ul>
                  <li v-for="item in sImg">
                    <img  :src="item" alt="加载中" @click="showImg(item)">
                  </li>
                  </ul>
            <img class="rightA" src="../img/right.png" @click="rightImage">
          </div>
         <!--商品无小视频-->
         <div class="lb" v-else>
           <img class="leftA" src="../img/left.png" @click="leftImage">
           <ul style="width:70%;">
             <li v-for="item in sImg">
               <img  :src="item" alt="加载中" @click="showImg(item)">
             </li>
           </ul>
           <img class="rightA" src="../img/right.png" @click="rightImage">
       </div>
       </div>
        <div class="right">
          <p>{{goodInfo.Name}}</p>
          <p :style="PriceStyle">售价:￥{{goodInfo.Price}}</p>
          <p style="color:#33647F;">会员价:￥{{goodInfo.VipPrice}} </p>
          <p>库存:{{goodInfo.Inventory}}</p>
          <p class="sp">商品简介<br>{{goodInfo.Brif}}</p>
             <img src="../img/car.png" alt="" @click="addCar" class="carImg">
          <el-button class="btn"  type="danger" @click="addCar" style="color:white !important;">加入购物车</el-button>
        </div>
      </div>
      <!--商品推荐-->
      <div class="tjGoods" v-if="isShow">
        <p>商品推荐</p>
        <div class="lbBig">
          <img class="z" src="../img/z.png" alt="加载中" @click="goLeft">
          <ul>
            <li v-for="item in tjList">
              <img :src="item.image&&item.image[0]" @click="goods(item.ID,item.ClassID)" alt="加载中">
              <p>{{item.Name}}</p>
              <p>会员价￥{{item.VipPrice}}</p>
            </li>
          </ul>
          <img class="y" src="../img/y.png" alt="" @click="goRight">
        </div>
      </div>
      <div class="xqGoods" :style="isShow===false?style:''">
        <p>商品详情</p>
        <div style="width:100%;font-size: 2em" v-html="decodeURIComponent(goodInfo.Content)">
        </div>
      </div>
      <Foot-Component></Foot-Component>
    </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
  import JlComponent from './jl'
    export default {
        name: "goodsInfo",
      data(){
          return{
            PriceStyle:{},
            isShowVideo:false,
            imgUrl:'',
            videoUrl:'',
            style:{
              marginTop:'0'
            },
            isShow:false,
            tjList:[],
            goodInfo:{},
            ID:'',
            num:false,
            navList:[
            ],
            colorStyle:{
              color:'#33647F'
            },
            sImg:[],
            PageIndex:1,
            PageCount:'',
            imageIndex:1,
            imageCount:''
          }
      },
      components:{LogoComponent,FootComponent,JlComponent},
      created(){
        this.getNav()
        if(this.$store.state.token!=='' ||localStorage.getItem('token')!==null)
        {
          this.PriceStyle={
            textDecoration:'line-through'
          }
          this.isShow=true
          this.getGoodsInfoToken(this.$route.query.ID,this.$store.state.token || localStorage.getItem('token'))
          this.getTj(this.PageIndex,this.$route.query.ClassID,this.$route.query.ID)
        }else{
          this.getGoodsInfo(this.$route.query.ID)
        }
      },
      methods:{
        gotoLx(){
          this.$router.push({path:'/lx'})
        },
        gotoGoodsMain(){
          this.$router.push({path:'/goodsMain'})
        },
        leftImage(){
          if(--this.imageIndex<=0)
          {
            this.imageIndex=1
            this.$message("已经到头啦")
            this.getGoodsImage(this.imageIndex,this.goodInfo.ProID)
          }else{
            this.getGoodsImage(this.imageIndex--,this.goodInfo.ProID)
          }
        },
        rightImage(){
         if(++this.imageIndex>=this.imageCount)
         {
           this.imageIndex=this.imageCount
           this.getGoodsImage(this.imageIndex,this.goodInfo.ProID)
         }else{
           this.getGoodsImage(this.imageIndex++,this.goodInfo.ProID)
         }
        },
        //当商品有小视频的时候
        playVideo(){
        this.isShowVideo=true
        },
        //商品图片展示
        showImg(item){
          this.isShowVideo=false
          this.imgUrl=item
        },
        //导航栏头部
          ColorStyle(ID) {
            if(ID===this.$route.query.ClassID)
            {
              return {color:'#33647F',borderTop:'2px solid #33647F'}
            }
          },
        //跳转到商品详情
        goods(ID,ClassID){
          this.getGoodsInfoToken(ID,this.$store.state.token || localStorage.getItem('token'))
          this.getTj(1,ClassID,ID)
        },
          //获取推荐商品
          getTj(PageIndex,ID,id) {
            this.$http
              .get("/api/Shopping/ShowTenList",{
                params:{
                  PageIndex:PageIndex,
                  Category:ID,
                  ID:id
                }
              })
              .then(
                function (response) {
                  this.tjList=response.data.Result.data
                  this.PageCount=response.data.Result.PageCount
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
          //获取商品详情
        getGoodsInfo(ID){
          this.$http
            .get("/api/Shopping/ShoppingDetailById",{
              params:{
                ID:ID,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
              this.goodInfo=response.data.Result[0]
                if(this.goodInfo.image.VideoPath.length>0){
                  this.isShowVideo=true
                  this.videoUrl=this.goodInfo.image.VideoPath[0]
                }else{
                  this.isShowVideo=false
                  this.imgUrl=this.goodInfo.image.ImagePath[0]
                }
                this.getGoodsImage(this.imageIndex,this.goodInfo.ProID)
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
        //获取商品详情带token
        getGoodsInfoToken(ID,token){
          this.$http
            .get("/api/Shopping/ShoppingDetailById",{
              params:{
                ID:ID,
                token:token,
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                this.goodInfo=response.data.Result[0]
                //如果商品有小视频则先展示小视频
                if(this.goodInfo.image.VideoPath.length>0){
                  this.isShowVideo=true
                  this.videoUrl=this.goodInfo.image.VideoPath[0]
                }else{
                  this.isShowVideo=false
                  this.imgUrl=this.goodInfo.image.ImagePath[0]
                }
           this.getGoodsImage(this.imageIndex,this.goodInfo.ProID)
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
        //获取商品图片
        getGoodsImage(pageIndex,ID){
          this.$http
            .get("/api/Shopping/ShowThreeList",{
              params:{
                  PageIndex:pageIndex,
                ID:ID
              }
            })
            .then(
              function (response) {
              this.sImg=response.data.Result.image[0]
                this.imageCount=response.data.Result.PageCount
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
        //添加到购物车
        addCar(){
          if(this.$store.state.token===''&&localStorage.getItem('token')===null)
          {
            this.$message("请先登录")
            this.$router.push({path:'/login',query:{url:this.$route.fullPath}})
          }else{
            this.$http
              .get("/api/Shopping/ShoppingAdd",{
                params:{
                  token:this.$store.state.token || localStorage.getItem('token'),
                  ProID:this.goodInfo.ProID,
                  Count:1,
                  PCorApp:"PC"
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
                    message: "请通知后台",
                  });
                }.bind(this)
              )
          }
        },
        //获取商品推荐
        goLeft(){
            if(--this.PageIndex<=0)
            {
              this.PageIndex=1
              this.$message("别点啦，已经到头啦")
              this.getTj(this.PageIndex,this.$route.query.ClassID,this.$route.query.ID)
            }else{
              this.getTj(this.PageIndex--,this.$route.query.ClassID,this.$route.query.ID)
            }
          },
        goRight(){
          if(++this.PageIndex>=this.PageCount)
          {
            this.PageIndex=this.PageCount
            this.getTj(this.PageIndex,this.$route.query.ClassID,this.$route.query.ID)
          }else{
            this.getTj(this.PageIndex++,this.$route.query.ClassID,this.$route.query.ID)
          }

        },
        handle(index,ID){
            this.$router.push({path:'/classify',query:{id:index,ID:ID}})
        }
      }
    }
</script>

<style lang="scss" scoped>
  .goodsInfo{
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
    .nav{
      list-style: none;
      height:100px;
      margin-top: 0;
      li{
        float: left;
        width:20%;
        height:100%;
        font-size: 2.3em;
        font-weight: bolder;
        line-height:100px;
        color:#919191;
      }
      li:hover{
        cursor: pointer;
      }
      li:first-child{
        margin-left:10%;
      }
    }
    .goodsMsg{
      width:60%;
      margin-left: 25%;
      display: flex;
      flex-direction: row;
      margin-top: 3%;
      .left{
        width:30%;
        height:500px;
        margin-left: 10%;
        .video{
          background-color: black;
          height:300px;
          width:320px;
        }
        img{
          width:90%;
          height:60%;
        }
        .lb{
          height:20%;
          width:100%;
          margin-top: 5%;
          display: flex;
          flex-direction: row;
          .leftA,.rightA{
            height:30px;
            width:30px;
            margin-top: 7%;
          }
          .leftA{
            margin-left: 3%;
          }
          img:hover{
            cursor: pointer;
          }
          .littleVideo{
            height:60px;
            width:60px;
            margin-top: 12px;
            margin-left: 5%;
          }
          ul{
            height:60%;
            list-style: none;
            width:56%;
            -webkit-padding-start: 0px;
            li{
              float: left;
              width:26%;
              height:100%;
              margin-left: 6%;
              img{
                width:100%;
                height:100%;
                margin-top: 0;
              }
            }
          }
        }
      }
      .right{
        width:50%;
        margin-left: 10%;
        height:530px;
        p{
          font-size: 2.5em;
          font-weight: bolder;
          text-align: left;
          margin-top: 0;
          color:#777777;
        }
        p:not(:first-child){
          margin-top: 5%;
          font-size: 1.8em;
        }
        .sp{
          letter-spacing: 1px;
          line-height: 25px;
        }
        span{
          display: block;
          margin-top: -5.5%;
          margin-left: -37%;
          font-size: 2.2em;
          font-weight:bolder;
          color:#33647F;
        }
        .carImg{
          float: left;
          margin-top: 11%;
          margin-left: 5%;
        }
        .carImg:hover{
          cursor: pointer;
        }
        .btn{
          float: left;
          margin-top: 10%;
          margin-left: 5%;
          width:200px;
          font-size: 1.5em !important;
          background-color: #33647F !important;
        }
      }
    }
    .tjGoods{
      width:60%;
      margin-left: 19%;
      display: flex;
      flex-direction: column;
      margin-top: -5%;
      p{
        font-size: 2em;
        font-weight: bolder;
        text-align: center;
        color:#33647F;
      }
      .lbBig{
        width:100%;
        height:140px;
        display: flex;;
        flex-direction: row;
        .z,.y{
          height:25px;
          width:25px;
          cursor: pointer;
          margin-top: 6%;
        }
        ul{
          list-style: none;
          width:90%;
          height:180px;
          margin-left: 5%;
          li{
            float: left;
            width:13%;
            margin-left: 2%;
          img{
            height:120px;
            width:100%;
          }
            img:hover{
              cursor: pointer;
            }
            p{
              margin-top: 0;
              color:#777777;
              font-size: 1.6em;
              text-align: center;
            }
            p:last-child{
              margin-top: -12px;
            }
          }
        }
      }
    }
    .xqGoods{
      width:61%;
      margin-left: 19%;
      display: flex;
      flex-direction: column;
      padding-bottom: 60px;
      margin-top: 3%;
      p{
        font-size: 2em;
        color:#33647F;
        font-weight: bolder;
        text-align: center;
      }
      img{
        height:400px;
        margin-top: 1%;
      }
    }
    @media only screen and (max-width: 1680px){
   .goodsMsg{
     margin-left: 22%;
     .left{
       .lb{
        .leftA{
        margin-left: 0;
      }
         ul{
           width:60%;
         }
       }
     }
     .right{
       margin-left: 18%;
       p{
         font-size: 2.5em;
       }
       .sp{
         font-size: 2em;
       }
       span{
         font-size: 2.6em;
         margin-top: -7%;
         margin-left: -33%;
       }
     }
   }
      .tjGoods{
        .lbBig{
          height:180px;
        }
      }
    }
    @media only screen and (max-width: 1440px){
      .goodsMsg{

        .left{
          width:40%;
          margin-left: 4%;
        }
        .right{
          width:55%;
          margin-left: 10%;
          p{
            font-size: 2.5em;
          }
          .sp{
            font-size: 2em;
          }
          span{
            font-size: 2.5em;
            margin-left: -27%;
          }
        }
      }
      .tjGoods{
        width:70%;
        margin-left: 15%;
        .lbBig{
          ul{
            li{
              p{
                font-size: 1em;
              }
            }
          }
        }
      }
      .xqGoods{
        width:72%;
        margin-left: 14%;
      }
    }
    @media only screen and (max-width: 1280px){
      .nav {
        li{
          width:25%;
        }
        li:first-child{
          margin-left: 0;
        }
      }
      .goodsMsg{
        .right{
        width:60%;
        }
      }
    }
    @media only screen and (max-width: 1024px){
      .nav {
        li{
          font-size: 2em;
        }
      }
     .goodsMsg{
       .left{
         .video{
           height:200px;
           width:240px;
         }
       }
       .left,.right{
         height:400px;
       }
       .right{
         p{
           font-size: 1.8em;
         }
         .sp{
           font-size: 1.5em;
         }
         span{
           font-size: 2em;
         }
       }
     }
      .tjGoods{
     .lbBig{
       .z{
         margin-top: 7%;
       }
       .y{
         margin-top: -13%;
         margin-left: 22%;
       }
       ul{
         margin-left: -2%;
         height:160px;
         li{
           width:12%;
           img{
             height:80px;
           }
         }
       }
     }
      }
    }
  }
</style>


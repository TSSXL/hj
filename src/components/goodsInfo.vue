<template>
    <div class="goodsInfo">
      <Logo-Component></Logo-Component>
      <ul class="nav">
        <li v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="select===index?colorStyle:''">{{item.Name}}</li>
      </ul>
      <!--商品名称-->
      <div class="goodsMsg">
       <div class="left">
         <video class="video" autoplay="autoplay" controls v-if="num">
           <source src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/cae-legoup-video-target/d412670f-2036-4609-bb7c-d1998a49a9d1.mp4"  type="video/mp4">
         </video>
         <img  :src="goodInfo.image&&goodInfo.image[0]" alt="加载中" v-else >
          <div class="lb">
            <img src="../img/left.png" @click="goLeft">
            <span>
              <img  v-for="item in sImg" :src="item" alt="加载中">
            </span>
            <img src="../img/right.png" @click="goRight">
          </div>
       </div>
        <div class="right">
          <p>{{goodInfo.Name}}</p>
          <p>售价:￥{{goodInfo.Price}}</p>
          <span>会员价:￥{{goodInfo.DisPrice}}</span>
          <p class="sp">商品简介<br>{{goodInfo.Brif}}</p>
             <img src="../img/car.png" alt="" @click="addCar" class="carImg">
          <el-button class="btn"  type="danger" @click="addCar">加入购物车</el-button>
        </div>
      </div>
      <!--商品推荐-->
      <div class="tjGoods" v-if="isShow">
        <p>商品推荐</p>
        <div class="lbBig">
          <img class="z" src="../img/z.png" alt="加载中">
          <ul>
            <li v-for="item in tjList">
              <img :src="item.image&&item.image[0]" @click="goods(item.ID,item.ClassID)" alt="加载中">
              <p>{{item.Name}}</p>
              <p>会员价￥{{item.DisPrice}}</p>
            </li>
          </ul>
          <img class="y" src="../img/y.png" alt="">
        </div>
      </div>
      <div class="xqGoods" :style="isShow===false?style:''">
        <p>商品详情</p>
        <img src="../img/one.jpg" alt="">
        <img src="../img/one.jpg" alt="">
        <img src="../img/one.jpg" alt="">
      </div>
      <Foot-Component></Foot-Component>
    </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
    export default {
        name: "goodsInfo",
      data(){
          return{
            style:{
              marginTop:'0'
            },
            isShow:false,
            tjList:[],
            goodInfo:{},
            ID:'',
            num:false,
            navList:[
              {ID:"0",Name:"首页"}
            ],
            select:0,
            colorStyle:{
              color:'#33647F'
            },
            sImg:[]
          }
      },
      components:{LogoComponent,FootComponent},
      created(){
        this.getNav()
        if(this.getCookie('token')!==null)
        {
          this.isShow=true
         this.getGoodsInfoToken(this.$route.query.ID,this.getCookie('token'))
          this.getTj(1,this.$route.query.ClassID,this.$route.query.ID)
        }else{
          this.getGoodsInfo(this.$route.query.ID)
        }
      },
      methods:{
        //跳转到商品详情
        goods(ID,ClassID){
          // this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
          this.getGoodsInfoToken(ID,this.getCookie('token'))
          this.getTj(1,ClassID,ID)
        },
          //获取推荐商品
          getTj(PageIndex,ID,id){
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
                ID:ID
              }
            })
            .then(
              function (response) {
              this.goodInfo=response.data.Result[0]
                this.sImg=response.data.Result[0].image
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
        getGoodsInfoToken(ID,token){
          this.$http
            .get("/api/Shopping/ShoppingDetailById",{
              params:{
                ID:ID,
                token:token
              }
            })
            .then(
              function (response) {
                this.goodInfo=response.data.Result[0]
                this.sImg=response.data.Result[0].image
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
        addCar(){
          if(this.getCookie('token')===null)
          {
            this.$message("请先登录")
            this.$router.push({path:'/login'})
          }else{
            this.$http
              .get("/api/Shopping/ShoppingAdd",{
                params:{
                  token:this.getCookie('token'),
                  ProName:this.goodInfo.Name,
                  Count:1
                }
              })
              .then(
                function (response) {
                  if(response.data.Status===10)
                  {
                    this.$alert('已添加到购物车',  {
                      confirmButtonText: '确定'
                    })
                  }else{
                    this.$message(response.data.Result)
                  }
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
        goLeft(){

          },
        goRight(){

        },
        handle(index,ID){
          this.select=index
          if(index===0)
          {
            this.$router.push('/')
          }else{
            this.$router.push({path:'/classify',query:{id:index,ID:ID}})
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .goodsInfo{
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
    .goodsMsg{
      width:80%;
      margin-left: 10%;
      display: flex;
      flex-direction: row;
      margin-top: 3%;
      .left{
        width:25%;
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
          img{
            height:30px;
            width:30px;
            margin-top: 9%;
          }
          img:first-child{
            margin-left: 4.5%;
          }
          img:hover{
            cursor: pointer;
          }
          span{
            display: inline-block;
            height:100%;
            width:75%;
            img{
              height:65%;
              width:25%;
              margin-top: 5%;
              margin-left: 5%;
            }
            img:first-child{
              margin-left: -2%;
            }
          }
        }
      }
      .right{
        width:50%;
        margin-left: 5%;
        height:530px;
        p{
          font-size: 2em;
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
          margin-left: -50%;
          font-size: 2em;
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
          font-size: 1.5em;
          background-color: #33647F;
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
        text-align: left;
        color:#33647F;
      }
      .lbBig{
        width:100%;
        height:140px;
        .z,.y{
          position: absolute;
        }
        .z{
          margin-left: -30%;
          margin-top: 3.5%;
        }
        .y{
          margin-top: -8%;
          margin-left: 29.5%;
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
        font-weight: bolder;
        text-align: center;
        color:#919191;
      }
      img{
        height:400px;
        margin-top: 1%;
      }
    }
    @media only screen and (max-width: 1680px){
   .goodsMsg{
     .right{
       p{
         font-size: 2.5em;
       }
       .sp{
         font-size: 2em;
       }
       span{
         font-size: 2.8em;
         margin-top: -7%;
         margin-left: 0%;
       }
     }
   }
      .tjGoods{
        .lbBig{
          height:180px;
          .y{
            margin-top: -7.5%;
          }
        }
      }
    }
    @media only screen and (max-width: 1440px){
      .nav {
        li{
          width:12%;
        }
      }
      .goodsMsg{
        .left{
          width:30%;
          margin-left: 4%;
        }
        .right{
          width:55%;
          p{
            font-size: 2.5em;
          }
          .sp{
            font-size: 2em;
          }
          span{
            font-size: 2.5em;
          }
        }
      }
      .tjGoods{
        width:70%;
        margin-left: 15%;
        .lbBig{
          .z{
            margin-left: -35%;
            margin-top: 4%;
          }
          .y{
            margin-left: 33.5%;
            margin-top: -9.8%;
          }
        }
      }
      .xqGoods{
        width:72%;
        margin-left: 14%;
      }
    }
    @media only screen and (max-width: 1366px){
 .tjGoods{
   .lbBig{
     .z{
       margin-top: 4.5%;
     }
     .y{
       margin-top: -10.5%;
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

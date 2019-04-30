<template>
    <div class="homeContainer">
    <Logo-Component></Logo-Component>
      <!--四个导航栏-->
      <ul class="nav">
        <li class="firstLi" @click="gotoGoodsMain" @mouseenter="showDio">
          <el-popover
            placement="bottom"
            width="900"
            trigger="hover"
         >
            <Jl-Component></Jl-Component>
            <el-button slot="reference">产品中心</el-button>
          </el-popover>
        </li>
        <li v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="select===index?colorStyle:''">{{item.Name}}
        </li>
      </ul>
      <!--轮播图-->
      <el-carousel height="550px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index" >
          <img :src="item.Image" alt="" style="width:100%;height:100%;cursor: pointer" @click="goods(item.ProID,item.ClassID)">
        </el-carousel-item>
      </el-carousel>
      <!--商品分类内容-->
      <div class="container" v-for="item in list">
        <p>{{item.Title}}</p>
        <ul class="containUl">
          <li v-for="j in item.Content">
            <img  @click="goods(j.ID,j.ClassID)" :src="j.image.ImagePath&&j.image.ImagePath[0]"  alt="正在加载中">
            <hr>
            <p>{{j.Name}}</p>
            <p class="price" :style="PriceStyle">原价￥{{j.Price}}</p>
           <span>会员价￥{{j.VipPrice}}</span>
          </li>
        </ul>
      </div>
      <Foot-Component></Foot-Component>
    </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
  import JlComponent from './jl'
    export default {
        name: "home",
      data(){
          return{
            dioStyle:{display:'none'},
            options: [],
            selectedOptions2: [],
            PriceStyle:{},
             navList:[
             ],
            imgList:[],
            select:'',
            colorStyle:{
               color:'#33647F',
              borderTop:'2px solid #33647F'
            },
            list:[]
          }
      },
      components:{LogoComponent,FootComponent,JlComponent},
      created(){
          this.getImg()
          this.getNav()
        this.getPro()
        if(this.$store.state.token!=='' || localStorage.getItem('token')!==null)
        {
          this.PriceStyle={
            textDecoration:'line-through'
          }
          this.getGoodsToken(this.$store.state.token || localStorage.getItem('token'))
        }
        else if(localStorage.getItem('token')!==null){
          this.$message("您还未登录")
          this.getGoodsToken(localStorage.getItem('token'))
        }
        else{
          this.$message("您还未登录")
          this.getGoods()
        }
      },
      methods:{
          getPro(){
            this.$http
              .post("/api/Shopping/ProTypeList")
              .then(
                function (response) {
                 this.options=response.data.Result
                  this.options=JSON.parse(JSON.stringify(this.options).replace(/PTFtName/g,'label').replace(/ID/g,'value').replace(/ProTypeSecond/g,'children').replace(/PTFtvalue/g,'value').replace(/PTSdName/g,'label'))
                  console.log(this.options)
                }.bind(this)
              )
              .catch(
                function (error) {
                  this.$notify.error({
                    title: "错误",
                    message: "获取数据错误",
                  });
                }.bind(this)
              )
          },
        gotoGoodsMain(){
          this.$router.push({path:'/goodsMain'})
        },
          //获取轮播图
        getImg(){
          this.$http
            .get("/api/Login/LBImage")
            .then(
              function (response) {
              this.imgList=response.data.Result
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
              .get("/api/Shopping/ShowIndex",{
              params:{
                PCorApp:"PC"
              }
            })
              .then(
                function (response) {
                 this.list=response.data.Result
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
            .get("/api/Shopping/ShowIndex",{
              params:{
                PCorApp:"PC",
                token:token
              }
            })
            .then(
              function (response) {
                this.list=response.data.Result
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$message("登录失效，请重新登录")
                // this.$router.push({path:'/login'})
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
            this.$router.push({path:'/classify',query:{id:index,ID:ID}})
        },
        showDio(){
  this.dioStyle={display:'block '}
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
     .firstLi {
       margin-left: 10%;
       position: relative;
     }
   }
   .container{
     margin-top: 20px;
     padding-bottom: 60px;
     display: inline-block;
     width:100%;
     background-color: #FCFCFC;
     p{
       font-size: 2.3em;
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
         height:380px;
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
           margin-top: 0%;
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
          color:#33647F;
         }
       }
     }
   }
   @media only screen and (max-width: 1680px){
    .container{
      .containUl{
        li{
          height:300px;
          img{
            height:200px;
            padding-bottom: 10px;
          }
          p{
            margin-top: 5px;
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
       .containUl{
         li{
           height:260px;
           img{
             height:170px;
           }
           p{
             font-size: 1.8em;
             margin-top: -2px;
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
     .container{
       .containUl{
         li{
           height:240px;
           img{
             height:160px;
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
       p{
         font-size: 1.8em;
       }
       .containUl{
         li{
           height:200px;
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

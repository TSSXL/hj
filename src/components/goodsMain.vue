<template>
    <div class="goodsMain">
      <Logo-Component></Logo-Component>
      <!--四个导航栏-->
      <ul class="nav">
        <li @click="gotoGoodsMain" :style="colorStyle">产品中心</li>
        <li v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="select===index?colorStyle:''">{{item.Name}}</li>
      </ul>
   <div class="content">
     <div class="left" :style="leftStyle" style="z-index: 999">
       <span>产品分类</span>
       <img src="../img/dh.svg" @click="sm" v-if="isShow">
       <img src="../img/dhOne.svg" @click="op" v-else >
       <div class="fl" :style="flStyle">
         <Jl-Component></Jl-Component>
       </div>
     </div>
     <div class="right" :style="rightStyle">
       <ul>
         <li v-for="item in prodList">
           <img  @click="goods(item.ID,item.ClassID)" :src="item.image.ImagePath&&item.image.ImagePath[0]"  alt="正在加载中">
           <hr>
           <p>{{item.Name}}</p>
           <p class="price" :style="PriceStyle">原价￥{{item.Price}}</p>
           <span>会员价￥{{item.VipPrice}}</span>
         </li>
       </ul>
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
        name: "goodsMain",
      data(){
          return{
            prodList:[],
            flStyle:{},
            selectedOptions2: [],
            isShow:true,
            leftStyle:{},
            rightStyle:{},
            PriceStyle:{},
            navList:[
            ],
            colorStyle:{
              color:'#33647F',
              borderTop:'2px solid #33647F'
            },
            select:''
          }
      },
      components:{LogoComponent,FootComponent,JlComponent},
      created() {
        this.getNav()
        if(this.$store.state.token!=='' || localStorage.getItem('token')!==null)
        {
          this.PriceStyle={
            textDecoration:'line-through'
          }
           this. getProductsToken(this.$store.state.token || localStorage.getItem('token'))
        }
        else if(localStorage.getItem('token')!==null){
          this.$message("您还未登录")
          // this.getGoodsToken(localStorage.getItem('token'))
        }
        else{
          this.$message("您还未登录")
          this.getProducts()
        }
      },
      methods: {
        //点击进入商品详情
        goods(ID,ClassID){
          this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
        },
        getProducts(){
          this.$http
            .get("/api/Shopping/ProTypeInfo",{
              params:{
                PageIndex:1,
                PageSize:10,
                ID:localStorage.getItem('jlID'),
                PCorApp:'PC'
              }
            })
            .then(
              function (response) {
                this.prodList=response.data.Result.data
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "获取商品失败",
                });
              }.bind(this)
            )
        },
        getProductsToken(token){
          this.$http
            .get("/api/Shopping/ProTypeInfo",{
              params:{
                PageIndex:1,
                PageSize:10,
                ID:localStorage.getItem('jlID'),
                PCorApp:'PC',
                Token:token
              }
            })
            .then(
              function (response) {
                this.prodList=response.data.Result.data
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "获取商品失败",
                });
              }.bind(this)
            )
        },
          op(){
            this.flStyle={display:'block'}
            this.isShow=true
             this.leftStyle={width:'20%'}
             this.rightStyle={width:'60%'}
          },
        sm(){
            this.flStyle={display:'none'}
            this.isShow=false
          this.leftStyle={width:'220px'}
          this.rightStyle={width:'65%'}
        },
        gotoGoodsMain(){
         this.$message("本页不用跳转啦")
        },
        //获取导航栏
        getNav() {
          this.$http
            .post("/api/Shopping/ReturnList")
            .then(
              function (response) {
                this.navList = this.navList.concat(response.data.Result)
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
        //导航栏切换
        handle(index, ID) {
          this.select = index
          this.$router.push({path: '/classify', query: {id: index, ID: ID}})
        }
      }
    }
</script>

<style lang="scss" scoped>
.goodsMain{
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
  .content{
    width:100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 60px;
    position: relative;
    .left{
      width:20%;
      margin-left:12%;
      padding-top: 30px;  
      position: relative;
      background-color: #d6d6d6;
      padding-bottom: 60px;
      span{
        font-size:26px;
        font-weight: bolder;
        display: inline-block;
        margin-left: -40px;
      }
      img{
        height:40px;
        width:40px;
        position: absolute;
        top:25px;
        margin-left: 20px;
      }
      img:hover{
        cursor: pointer;
      }
    .fl{
      width:50%;
      margin-left: 21%;
      margin-top: 60px;
      font-size: 1.5em;
    }
    }
    .right{
      width:65%;
      margin-left: 3%;
      ul{
        list-style: none;
        width:100%;
        margin-top: -4%;
        -webkit-padding-start: 0px;
        li{
          float: left;
          width:24%;
          height:320px;
          margin-left:8%;
          margin-top: 4%;
          border-radius: 10px;
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 5px 0px rgba(43,43,43,0.14);
          p{
            font-size: 1.8em;
            text-align: left;
            margin-left: 5%;
            width:90%;
            margin-top: 0;
            color:#393939;
            font-weight: bolder;
          }
          .price{
            color:#787878;
          }
          img{
            height:220px;
            width:80%;
            margin-top: 0%;
          }
          img:hover{
            cursor: pointer;
          }
          span{
            display: inline-block;
            position: absolute;
            margin-top: -2.1%;
            font-size: 1.9em;
            font-weight: bolder;
            color:#33647F;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1680px){
   .content{
     .left{
       margin-left: 10%;
     }
     .right{
       width:60%;
       ul{
         li{
           span{
             margin-top: -2.4%;
           }
         }
       }
     }
   }
  }
  @media only screen and (max-width: 1440px){
    .content{
      .left{
        margin-left: 5%;
      }
      .right{
        width:70% !important;
      }
    }
  }
  @media only screen and (max-width: 1366px){
    .content{
      .right{
        margin-left: 0;
        ul{
          li{
            p{
              font-size: 1.7em;
            }
            span{
              margin-top: -2.6%;
              font-size: 1.7em;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1280px){
    .content{
      .right{
        ul{
          li{
            span{
              margin-top: -3%;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1024px){
    .content{
      .right{
        width:80% !important;
        ul{
          li{
            width:26%;
            margin-left: 6%;
            height:290px;
            img{
              height:200px;
            }
            p{
              font-size: 1.6em;
            }
            span{
              font-size: 1.6em;
              margin-top: -3.2%;
            }
          }
        }
      }
    }
  }
}
</style>

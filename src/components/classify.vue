<template>
    <div class="classify">
      <Logo-Component></Logo-Component>
      <ul class="nav">
        <li  v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="colorStyle(index)">{{item.Name}}</li>
      </ul>
      <div class="classGoods">
        <ul>
          <li v-for="item in list" >
            <img  @click="goods(item.ID,item.ClassID)"   :src="item.image.ImagePath[0]" >
            <hr>
            <p>{{item.Name}}</p>
            <p class="price" :style="PriceStyle">￥{{item.Price}}</p>
            <span>会员价￥{{item.VipPrice}}</span>
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
        name: "classify",
      data(){
          return{
            PriceStyle:{},
            navList:[
              {ID:"0",Name:"首页"}
            ],
            list:[],
            select:1,
          }
      },
      components:{LogoComponent,FootComponent},
      mounted(){
        this.select=parseInt(this.$route.query.id)
        //获取导航栏
        this.getNav()
        if(this.$route.query.ID!==undefined &&this.$store.state.token!=='')
        {
          this.PriceStyle={
            textDecoration:'line-through'
          }
          this.getGoodsToken(this.$route.query.ID,this.$store.state.token || localStorage.getItem('token'))
        }else if(this.$route.query.ID!==undefined &&localStorage.getItem('token')!==null){
          this.PriceStyle={
            textDecoration:'line-through'
          }
          this.getGoodsToken(this.$route.query.ID,this.$store.state.token || localStorage.getItem('token'))
        }
        else if(this.$store.state.token===''){
         this.getGoods(this.$route.query.ID)
        }else{
          this.$message("您还未登录")
        }
      },
      methods:{
        colorStyle(index){
         if(index===this.select){
           return {color:'#33647F',borderTop:'2px solid #33647F'}
         }
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
        //跳转到商品详情
        goods(ID,ClassID){
          this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID}})
        },
        //获取分类商品
        getGoods(ID){
          this.$http
            .get("/api/Shopping/ShowList",{
           params:{
             PageIndex:1,
             PageSize:16,
             Category:ID
           }
            })
            .then(
              function (response) {
                if(response.data.Status===-10)
                {
                  this.list=[]
                  this.$message(response.data.Result)
                }else{
                  this.list=response.data.Result.data
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
        },
        getGoodsToken(ID,token){
          this.$http
            .get("/api/Shopping/ShowList",{
              params:{
                PageIndex:1,
                PageSize:16,
                Category:ID,
                token:token
              }
            })
            .then(
              function (response) {
                if(response.data.Status===-10)
                {
                  this.list=[]
                  this.$message(response.data.Result)
                }else{
                  this.list=response.data.Result.data
                }
              }.bind(this)
            )
            .catch(
              function (error) {
            this.$message("登录失效，请重新登录")
              }.bind(this)
            )
        },
        handle(index,ID){
          this.select=index
          if(index===0)
          {
            this.$router.push('/')
          }else{
             this.getGoodsToken(ID,this.$store.state.token || localStorage.getItem('token'))
            this.$router.push({path:'/classify',query:{id:index,ID:ID}})
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.classify{
  .nav{
    list-style: none;
    height:100px;
    margin-top: 0;
    li{
      float: left;
      width:20%;
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
      margin-left:10%;
    }
  }
  .classGoods{
    width:100%;
    display: inline-block;
    padding-bottom: 60px;
   ul{
     width:80%;
     list-style: none;
     display: inline-block;
     li{
       float: left;
       width:20%;
       height:320px;
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
         margin-top: 0px;
       }
       .price{
         color:#787878;
       }
       img{
         height:220px;
         width:80%;
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
    .classGoods{
      ul{
        width:100%;
        margin-left: 0;
        li{
          width:18%;
          height:300px;
          margin-left: 10%;
          img{
            height:200px;
          }
          span{
            font-size: 2.1em;
            margin-top: -2.7%;
            margin-left: 0;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1440px){
    .classGoods{
      ul{
        li{
          width:20%;
          margin-left: 8%;
          span{
            font-size: 1.8em;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1366px){
    .classGoods{
      ul{
        li{
          height:280px;
          p{
            font-size: 1.8em;
            margin-top: -5px;
          }
          span{
            font-size: 1.7em;
           margin-top: -2.9%;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1280px){
    .classGoods{
      ul{
        li{
          height:270px;
          span{
            font-size: 1.6em;
            margin-top: -3.2%;
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
      .classGoods{
      ul{
        li{
          width:23%;
          height:240px;
          margin-top: 4%;
          margin-left: 5.5%;
          img{
            height:160px;
          }
          span{
          margin-top: -3.8%;
          }
        }
      }
    }
  }
}
</style>

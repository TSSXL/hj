<template>
  <div class="mine">
    <Logo-Component></Logo-Component>
    <ul class="nav">
      <li  v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" >{{item.Name}}</li>
    </ul>
    <div class="content">
      <p>我的购物车</p>
      <ul>
        <li v-for="item in product">
            <el-checkbox    @change="changeSelect"  :label="item.ID"><p class="boxText">请选择</p></el-checkbox>
          <img class="image" @click="goods(item.ID,item.ClassID)" :src="item.Image[0]" alt="">
          <span class="info">
            <p>{{item.Name}}</p>
            <p :style="PriceStyle">￥{{item.Price}}</p>
            <p>￥{{item.DisPrice}}</p>
          </span>
          <span class="num">
          <img src="../img/cut.png" @click="cutNum(item.Count,item.Name)">
          <span>{{ item.Count}}</span>
            <img src="../img/add.png" @click="addNum(item.Count,item.Name)">
          </span>
           <span class="del" @click="del(item.ID)">删除</span>
        </li>
      </ul>
    </div>
    <div class="allPrice">总价:{{data.NewTotal}}</div>
    <Foot-Component></Foot-Component>
  </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
  export default {
    name: "shopCar",
    data(){
      return{
        chose:'',
        PriceStyle:{},
        navList:[
          {ID:"0",Name:"首页"}
        ],
        data:{},
        product:[],
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      this.getNav()
      if(this.$store.state.token!==null || localStorage.getItem('token')!=='')
      {
        this.PriceStyle={
          textDecoration:'line-through'
        }

        this.getShopCar(this.$store.state.token || localStorage.getItem('token'))
      }else{
        this.$message("您还未登录")
        this.$router.push({path:'/login'})
      }
    },
    methods:{
      changeSelect(val){
        this.chose=val
      },
      //获取购物车商品
      getShopCar(Token){
        this.$http
          .get("/api/Shopping/ShoppingListMsg",{params:{
            Token:Token
            }})
          .then(
            function (response) {
            this.data=response.data.Result
              this.product=response.data.Result.list
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "获取购物车商品失败",
              });
            }.bind(this)
          )
      },
      //减少商品数量
      cutNum(val,name){
        if(val===0){
        this.$message("数量为0，您可以选择删除")
        }else{
          this.$http
            .get("/api/Shopping/ShoppingAlter",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                ProName:name,
                Count:--val
              }
            })
            .then(
              function (response) {
                this.getShopCar(this.$store.state.token || localStorage.getItem('token'))
                this.$message(response.data.Result)
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "减少购物车数量出错",
                });
              }.bind(this)
            )
        }
    },
      //增加商品数量
      addNum(val,name){
        this.$http
          .get("/api/Shopping/ShoppingAlter",{
            params:{
              token:this.$store.state.token || localStorage.getItem('token'),
              ProName:name,
              Count:++val
            }
          })
          .then(
            function (response) {
              this.getShopCar(this.$store.state.token || localStorage.getItem('token'))
              this.$message(response.data.Result)
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$notify.error({
                title: "错误",
                message: "添加购物车数量出错",
              });
            }.bind(this)
          )

      },
      //删除商品
      del(ID){
        if(this.chose===true)
        {
          this.$http
            .get("/api/Shopping/ShoppingDel",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                IDs:ID
              }
            })
            .then(
              function (response) {
                this.getShopCar(this.$store.state.token || localStorage.getItem('token'))
                this.chose=''
                this.$message(response.data.Result)
              }.bind(this)
            )
            .catch(
              function (error) {
                this.$notify.error({
                  title: "错误",
                  message: "删除商品失败",
                });
              }.bind(this)
            )
        }else{
          this.$message("请选中此商品再删除")
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
      //点击商品进入商品详情
      goods(ID,ClassID){
        this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
      },
      //点击导航栏跳转
      handle(index,ID){
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
  .mine{
    width:100%;
    .nav{
      list-style: none;
      height:100px;
      margin-left: 2%;
      margin-top: 0;
      li{
        float: left;
        width:15%;
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
        margin-left: -59%;
        margin-top: 5%;
        color:#33647F;
      }
      ul{
        width:80%;
        margin-left: 10%;
        height:200px;
        list-style: none;
        li{
          width:80%;
          float: left;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 1px 0px rgba(212,209,209,1);
          display: flex;
          flex-direction: row;
          margin-left: 5%;
          margin-top: 2%;
          .boxText{
            font-size: 1em;
            position: absolute;
            margin-left: 0%;
            line-height: 40px;
          }
          img{
            margin-left: 4%;
          }
          img:hover{
            cursor: pointer;
          }
          .image{
            height:120px;
            width:120px;
            padding-right: 2%;
            margin-top: 1%;
          }
          .j{
            height:40px;
            width:40px;
            margin-top: 4%;
            margin-left:5%;
          }
          .j:hover{
            cursor: pointer;
          }
          .info{
            display: inline-block;
            width:50%;
            height:60%;
            margin-top: 1%;
            p{
              width: 100%;
              font-size: 2em;
              margin-left: 0;
              text-align: left;
              margin-top: 15px;
              color:#919191;
            }
            p:first-child{
              color:#444444;
              font-size: 1.6em;
            }
            p:last-child{
              color:#33647F;
              font-size: 1.8em;
            }
          }
          .num{
            width:15%;
            height:20%;
            margin-top: 5%;
            display: flex;
            flex-direction: row;
            img{
              height:30px;
              width:30px;
            }
            span{
              display: inline-block;
              height:30px;
              width:30px;
              font-size: 2em;
              line-height: 30px;
              margin-left: 10%;
              margin-right: 10%;
            }
          }
          .del{
            display: inline-block;
            height:30px;
            font-size: 2em;
            margin-top: 5.2%;
            color:#33647F;
          }
          .del:hover{
            cursor: pointer;
          }
        }
      }
    }
    .allPrice{
      width:100%;
      font-size: 2.5em;
      font-weight: bolder;
      color:#919191;
      background-color: rgb(249, 249, 249);
      padding-bottom: 60px;
    }
    @media only screen and (max-width: 1680px){
      .content{
        p{
          margin-left: -60%;
        }
        ul{
          li{
         .info{
           p{
             font-size: 1.8em;
           }
           p:last-child{
             font-size: 2em;
           }
         }
          }
        }
      }
    }
    @media only screen and (max-width: 1440px){
      .content{
     p{
       margin-left: -57.5%;
     }
        ul{
          li{
            .info{
              width:45%;
            }
            .num{
              margin-top: 6%;
            }
            .del{
              margin-top: 6.5%;
              margin-left: 1%;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 1280px){
      .content{
        p{
          margin-left: -56.5%;
        }
        ul{
          li{
            .num{
              margin-top: 6.5%;
            }
            .del{
              margin-top: 7%;
              font-size: 1.8em;
            }
          }
        }
      }
    }
    @media only screen and (max-width: 1024px){
      .nav {
        margin-left: 1%;
       li{
      width:15%;
     }
      }
      .content{
        p{
          margin-left: -53%;
        }
        ul{
          li{
            .info{
              width:36%;
            }
            .num{
              margin-top: 8%;
            }
            .del{
              margin-top: 8.5%;
            }
          }
        }
      }
    }
  }
</style>

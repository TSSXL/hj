<template>
  <div class="mine">
    <Logo-Component></Logo-Component>
    <div class="content">
      <p>我的购物车</p>
      <ul>
        <li v-for="item in product">
            <el-checkbox v-model="checkCity"   @change="changeSelect"  :label="item.ID"><p class="boxText">请选择</p></el-checkbox>
          <img class="image" @click="goods(item.ID,item.ClassID)" :src="item.Image[0]" alt="">
          <span class="info">
            <p>{{item.Name}}</p>
            <p :style="PriceStyle">￥{{item.Price}}</p>
            <p>￥{{item.VipPrice}}</p>
          </span>
          <span class="num">
          <img src="../img/cut.png" @click="cutNum(item.Count,item.ID)">
          <span>{{ item.Count}}</span>
            <img src="../img/add.png" @click="addNum(item.Count,item.ID)">
          </span>
           <span class="del" @click="del(item.ID)">删除</span>
        </li>
      </ul>
    </div>
      <div class="checkAll" :style="delAllStyle">
        <el-checkbox class="c" @change="selectAll"></el-checkbox>
         <span class="selectAll">全选</span>
        <span @click="delAll">删除</span>
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
        delAllStyle:{},
        choseAll:'',
        checkCity:[],
        chose:'',
        PriceStyle:{},
        data:{},
        product:[],
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      if(this.$store.state.token!=='' || localStorage.getItem('token')!==null)
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
      selectAll(val){
       this.choseAll=val
        if(val===true)
        {
          this.checkCity=this.product.map((item)=>{
            return item.ID
          })
        }else{
          this.checkCity=[]
        }
      },
      delAll(){
        if(this.choseAll!==true)
        {
          this.$message("如果您要全部删除请先选中左侧的框")
        }else{
          this.$http
            .get("/api/Shopping/ShoppingDel",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                IDs:this.checkCity.join(";"),
                PCorApp:"PC"
              }
            })
            .then(
              function (response) {
                this.getShopCar(this.$store.state.token || localStorage.getItem('token'))
                this.delAllStyle={display:'none'}
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
        }
      },
      changeSelect(val){
        this.chose=val
      },
      //获取购物车商品
      getShopCar(Token){
        this.$http
          .get("/api/Shopping/ShoppingListMsg",{params:{
            Token:Token,
              PCorApp:"PC"
            }})
          .then(
            function (response) {
            this.data=response.data.Result
              this.product=response.data.Result.list
              if(this.product.length===0){
                this.delAllStyle={display: 'none'}
              }
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
      cutNum(val,ID){
        if(val===1){
        this.del(ID)
        }else{
          this.$http
            .get("/api/Shopping/ShoppingAlter",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                ProID:ID,
                Count:--val,
                PCorApp:"PC"
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
      addNum(val,ID){
        this.$http
          .get("/api/Shopping/ShoppingAlter",{
            params:{
              token:this.$store.state.token || localStorage.getItem('token'),
              ProID:ID,
              Count:++val,
              PCorApp:"PC"
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
          this.$http
            .get("/api/Shopping/ShoppingDel",{
              params:{
                token:this.$store.state.token || localStorage.getItem('token'),
                IDs:ID,
                PCorApp:"PC"
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

      },
      //点击商品进入商品详情
      goods(ID,ClassID){
        this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .mine{
    width:100%;
    .content{
      display: inline-block;
      width:100%;
      background-color: rgb(249, 249, 249);
      p{
        color:#33647F;
        font-size: 2.5em;
        font-weight: bolder;
        margin-left: -59%;
        margin-top: 5%;
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
    .checkAll{
      width:100%;
      padding-bottom: 30px;
      position: relative;
      background-color: rgb(249, 249, 249);
      .c{
        left: -31.6%;
      }
      span{
        display: inline-block;
        position: absolute;
        right: 25.5%;
        color:#33647F;
        font-size: 2em;
        top:53%;
        cursor: pointer;
      }
      .selectAll{
        left: 0;
        margin-left: -33.5%;
        font-size: 1.8em;
        font-weight: bolder;
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
      .checkAll{
          .c{
            left: -31%;
          }
        span{
          right:23.5%;
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
      .checkAll{
        .c{
          left: -30.5%;
        }
        span{
          right:23%;
        }
        .selectAll{
          margin-left: -32.5%;
        }
      }
    }
    @media only screen and (max-width: 1366px){
      .checkAll{
        .c{
          left: -30%;
        }
        span{
          right:21.8%;
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
      .checkAll{
        .c{
          left: -29.5%;
        }
        span{
          right:20.8%;
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
      .checkAll{
        .c{
          left: -28%;
        }
      }
    }
  }
</style>

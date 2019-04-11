<template>
  <div class="mine">
    <Logo-Component></Logo-Component>
    <ul class="nav">
      <li  v-for="(item,index) in navList" :key="item.ID" @click="handle(index,item.ID)" :style="selected===index?colorStyle:''">{{item.Name}}</li>
    </ul>
    <div class="content">
      <p>我的购物车</p>
      <ul>
        <li v-for="(item,index) in product">
          <img class="j" src="../img/j.png"  @click="select()"  v-if="show">
          <img class="j" src="../img/j_selected.png"  @click="select()" style="background-color: rgba(51, 100, 127, 1)" v-else>
          <img class="image" @click="goods(item.ID,item.ClassID)" :src="item.Image[0]" alt="">
          <span class="info">
            <p>{{item.Name}}</p>
            <p>￥{{item.Price}}</p>
            <p>￥{{item.DisPrice}}</p>
          </span>
          <span class="num">
          <img src="../img/cut.png" alt="">
          <span>{{item.Count}}</span>
            <img src="../img/add.png" alt="">
          </span>
           <span class="del">删除</span>
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
        selected:0,
        colorStyle:{
          color:'#33647F'
        },
        navList:[
          {ID:"0",Name:"首页"}
        ],
        data:{},
        product:[],
        show:true
      }
    },
    components:{LogoComponent,FootComponent},
    created(){
      this.getNav()
      if(this.getCookie('token')!==null)
      {
        this.getShopCar(this.getCookie('token'))
      }else{
        this.$message("您还未登录")
        this.$router.push({path:'/login'})
      }
    },
    methods:{
      select(index){
        this.show=!this.show;
      },
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
      goods(ID,ClassID){
        this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
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
  .mine{
    width:100%;
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
          img{
            margin-left: 2%;
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
          margin-left: -62%;
        }
      }
    }
    @media only screen and (max-width: 1280px){
      .content{
        p{
          margin-left: -63%;
        }
      }
    }
    @media only screen and (max-width: 1024px){
      .content{
        p{
          margin-left: -66%;
        }
      }
    }
  }
</style>

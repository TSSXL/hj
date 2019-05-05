<template>
    <div class="jlContainer">
      <ul>
        <li class="firstLI" v-for="(item,index) in list" :key="index"><a href="#">{{item.PTFtName}}</a><img class="firstImg" src="../img/r.svg">
          <ul class="firstUL">
            <li class="secondLI" v-for="(j,index) in item.ProTypeSecond" :key="index"><a href="#">{{j.PTSdName}}</a><img class="secondImg" src="../img/r.svg">
              <ul class="secondUL">
                <li v-for="(i,index) in j.Content" :key="index"><a @click="goods(i.ID,i.ClassID)">{{i.Name}}</a></li>
              </ul></li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
  import qs from 'qs'
    export default {
        name: "jl",
      data(){
          return{
            list:[]
          }
      },
      created(){
          this.getList()
      },
      methods:{
        //点击进入商品详情
        goods(ID,ClassID){
          this.$router.push({path:'/goodsInfo',query:{ID:ID,ClassID:ClassID}})
        },
          getList(){
            this.$http
              .get("/api/Shopping/ProTypeInfoAll",{
                params:{
                  PCorApp:"PC"
                }
              })
              .then(
                function (response) {
                  this.list=response.data.Result
                  localStorage.setItem('jlID',this.list[0].ProTypeSecond[0].ID)
                }.bind(this)
              )
          }
      }
    }
</script>

<style lang="scss" scoped>
  $height:300px;
  $width:300px;
  $bg:#2d425a;
 .jlContainer{
   width:$width;
   height:$height;
   background-color: $bg;
   font-size: 62.5%;
   ul{
     list-style: none;
     width:100%;
     height:100%;
     -webkit-padding-start: 0px;
     margin: 0;
     padding: 0;
     border: 0;
     .firstLI{
       width:100%;
       height:40px;
       line-height: 40px;
       color:white;
       text-align: left;
       position: relative;
       text-indent: 10px;
       cursor: pointer;
       a{
         text-decoration: none;
         font-size: 2em;
         display: inline-block;
         width:80%;
       }
       .firstImg{
         height:20px;
         width:20px;
         position: absolute;
         right:5px;
         top:10px;
       }
       .firstUL{
         width:100%;
         height:$height;
         background-color: $bg;
          position: absolute;
         margin-left: $width;
         margin-top: -42px;
         display: none;
         li{
           width:100%;
           height:40px;
           color:black;
           line-height: 40px;
           position: relative;
           a{
             color:white;
           }
           ul{
             display: none;
           }
           .secondImg{
             height:20px;
             width:20px;
             position: absolute;
             right:5px;
             top:10px;
           }
         }
         .secondLI{
           .secondUL{
             height:$height;
             margin-left: $width;
             position: absolute;
             background-color: $bg;
             color:white;
             margin-top: -42px;
           }
         }
         .secondLI:hover .secondUL{
           display: block;
         }
       }
     }
     li:hover{
       background-color: gray;
     }
     .firstLI:hover .firstUL{
       display: block;
     }
   }
   @media only screen and (max-width: 1680px){
   width:265px;
     background-color: #D6D6D6;
     ul{
       .firstLI{
        a{
          color:black;
          font-weight: bolder;
        }
         .firstUL{
           margin-left: 265px;
           background-color: #D6D6D6;
         li{
           a{
             color:black;
             font-weight: bolder;
           }
         }
           .secondLI{
             .secondUL{
               margin-left: 265px;
               background-color: #D6D6D6;
             }
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1440px){
     width:228px;
     ul{
       .firstLI{
         .firstUL{
           margin-left: 228px;
           .secondLI{
             .secondUL{
               margin-left: 228px;
             }
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1366px){
     width:215px;
     ul{
       .firstLI{
         .firstUL{
           margin-left: 215px;
           .secondLI{
             .secondUL{
               margin-left: 215px;
             }
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1280px){
     width:202px;
     ul{
       .firstLI{
         .firstUL{
           margin-left: 202px;
           .secondLI{
             .secondUL{
               margin-left: 202px;
             }
           }
         }
       }
     }
   }
   @media only screen and (max-width: 1024px){
     width:150px;
     ul{
       .firstLI{
         .firstUL{
           margin-left: 150px;
           .secondLI{
             .secondUL{
               margin-left: 150px;
             }
           }
         }
       }
     }
   }
 }
</style>

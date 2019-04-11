<template>
    <div class="mine">
      <Logo-Component></Logo-Component>
      <div class="content">
        <p>关于我们</p>
        <span>{{content.Content}}</span>
      </div>
      <Foot-Component></Foot-Component>
    </div>
</template>

<script>
  import LogoComponent from './hd'
  import FootComponent from './foot'
    export default {
        name: "mine",
      data(){
          return{
            content:{}
          }
      },
      components:{LogoComponent,FootComponent},
      created(){
          this.getContent()
      },
      methods:{
          getContent(){
            this.$http
              .post("/api/Shopping/AboutUs")
              .then(
                function (response) {
               this.content=response.data.Result[0]
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
      }
    }
</script>

<style lang="scss" scoped>
 .mine{
   width:100%;
   .content{
     height:400px;
     width:100%;
     p{
       color:#33647F;
       font-size: 2.5em;
       font-weight: bolder;
       margin-left: -59%;
       margin-top: 5%;
     }
     span{
       display: inline-block;
       width:270px;
       color:#777777;
       font-size: 2em;
       letter-spacing: 1px;
       line-height: 30px;
       text-align: left;
       margin-left: -50%;
     }
   }
   @media only screen and (max-width: 1680px){
     .content{
       p{
         margin-left: -60%;
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

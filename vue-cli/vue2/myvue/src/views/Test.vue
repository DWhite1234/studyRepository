<template>
  <div>dddddddddddddddd
      <button @click="$router.push('/home')">跳转</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            test:'1111111111'
        }
    },
    beforeRouteLeave:function(to,from,next){
        console.log('this',this);
        if (confirm("你确定要离开吗") == true) {
            next();
        } else {
            next(false);
        }
    }
}
</script>

<style>

</style>
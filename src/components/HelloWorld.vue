<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <Counter v-bind:num = "num" v-on:add="add" v-on:sub="sub"></Counter>
    <p>父组件:{{num}}</p> -->
    <router-link to="/goods">
      <button class="btn btn-default">点击跳转</button>
  </router-link>
  </div>
</template>
<style>
  .hello{
    margin-top: 200px;
  }
</style>

<script>
import Counter from './Counter'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num: 10,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Counter
  },
  methods: {
    add() {
      this.num++
    },
    sub() {
      this.num--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

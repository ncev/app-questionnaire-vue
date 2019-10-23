<template>
  <div class="hello">
    <h1>Test</h1>
    <question question="cocuou"></question>
  </div>
</template>

<script>
import question from '@/components/question/question.vue'

export default {
  name: 'neHome',
  components: {
    question
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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

<template>
  <h1 class="text-center">Administration</h1>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'admin',
  mixins: [PouchDbManager],
  created: function () {
    this.getList(function (n) {
      console.log(n)
    })
  }
}
</script>

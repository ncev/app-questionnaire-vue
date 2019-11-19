<template>
  <div class="col-12">
    <h1 class="text-center">Administration des pools</h1>
    <b-card bg-variant="light" header="Pool de questions" class="text-center" v-if="show">
      <b-card-text>Il s'agit du nombres de question maximum à afficher sur chaque page</b-card-text>
      <b-form @submit="onSubmit">
        <b-form-input
          id="input-pool"
          v-model="list.params.pool.amount"
          type="number"
          required
          placeholder="pool"
          style="margin-bottom: 25px;"
        ></b-form-input>

        <b-button block variant="outline-primary" type="submit">Valider</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'admin-pool',
  mixins: [PouchDbManager],
  created: function () {
    const self = this
    this.show = false
    this.getList(function (list) {
      self.list = list
      self.refreshComponent()
    })
  },
  methods: {
    onSubmit: function () {
      this.setList(this.list)
    },
    refreshComponent: function () {
      this.show = true
      this.$forceUpdate()
    }
  }
}
</script>

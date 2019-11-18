<template>
  <div class="col-12">
    <h1 class="text-center">Administration des entreprises</h1>
    <div>
      <b-form>
        <div v-for="(entreprise, index) in this.list.data" :key="index" style="margin-bottom: 50px;">
          <hr>
          <b-form-input
          v-model="entreprise.entreprise"
          type="text"
          required
          placeholder="entreprise"
          ></b-form-input>
          <b-button-group style="width: 100%">
            <b-button variant="success" @click="modify(entreprise)">Modifier</b-button>
            <b-button variant="secondary" @click="removeEntreprise(entreprise)">Supprimer</b-button>
            <b-button variant="info">ses questions</b-button>
          </b-button-group>
        </div>
        <div>
        <hr>
          <b-form-input
          v-model="newEntreprise"
          type="text"
          required
          placeholder="nouvelle entreprise"
          ></b-form-input>
          <b-button block variant="success" @click="addEntreprise()">Ajouter</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'admin-entreprise',
  mixins: [PouchDbManager],
  created: function () {
    const self = this
    this.getList(function (list) {
      self.list = list
      self.setEntreprises()
    })
  },
  methods: {
    setEntreprises: function () {
      this.newEntreprise = '' // variable pour l'ajout de nouvelle entreprise
    },
    modify: function (entreprise) {
      this.setList(this.list)
    },
    addEntreprise: function () {
      const obj = {
        'entreprise': this.newEntreprise,
        'questions': []
      }
      this.list.data.push(obj)
      this.setList(this.list)
    },
    removeEntreprise: function (entreprise) {
      let i = 0
      let tmpEntreprise = null
      for (const data of this.list.data) {
        if (data.entreprise === entreprise.entreprise) {
          tmpEntreprise = data
          break
        }
        i++
      }
      if (tmpEntreprise != null) {
        this.list.data.splice(i, 1)
      }
      this.setList(this.list)
    }
  }
}
</script>

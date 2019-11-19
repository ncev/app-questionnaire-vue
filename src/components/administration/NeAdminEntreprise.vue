<template>
  <div class="col-12" v-cloak>
    <h1 class="text-center">Administration des entreprises</h1>
    <div>
      <b-form v-if="show">
        <div v-for="(entreprise, index) in getListData()" :key="index" style="margin-bottom: 50px;">
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
            <b-button variant="info" @click="viewQuestions(entreprise)">ses questions</b-button>
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
    this.show = false
    const self = this
    self.setEntreprises()
    this.getList(function (list) {
      self.list = list
      self.refreshComponent()
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
    removeEntreprise: function (entreprise) { // suppresion d'entreprise
      let i = 0
      let tmpEntreprise = null
      for (const data of this.list.data) {
        if (data.entreprise === entreprise.entreprise) { // nous recherchons l'entreprise choisi
          tmpEntreprise = data
          break
        }
        i++
      }
      if (tmpEntreprise != null) { // si elle a pu être trouvé, alors...
        this.list.data.splice(i, 1) // nous la supprimons
      }
      this.setList(this.list) // sauvegarde des modifications
    },
    viewQuestions: function (entreprise) {
      this.$router.push('/admin/questions/' + entreprise.entreprise)
    },
    getListData: function () {
      if (this.list === null || this.list === undefined) {
        return []
      }
      return this.list.data
    },
    refreshComponent: function () {
      this.show = true
      this.$forceUpdate()
    }
  },
  computed: {
  }
}
</script>

<template>
  <div class="col-12">
    <h1 class="text-center">les résultats</h1>
    <div v-if="show">
      <div v-for="(doc, index) in getDocs" :key="index" >
        <b-card :header="doc.user.name + ' ' + doc.user.firstname" class="text-center" style="margin-bottom: 25px;">
          <b-card-text>
            <p>Questions de l'entreprise: {{doc.user.enterprise}}</p>
            <b-button block variant="outline-primary" @click="onVisualiserClick(doc)">Visualiser</b-button>
          </b-card-text>
        </b-card>
      </div>
      <div v-if="noDocs">
        <b-card bg-variant="light" header="Vous n'avez aucune réponses..." class="text-center">
          <b-card-text>Répondez à un questionnaires pour obtenir des résultats</b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'result',
  mixins: [PouchDbManager],
  created: function () {
    const self = this
    this.show = false
    this.getList(function (list) { // nous obtenons la liste des questions
      self.list = list
      self.getKeys()
    })
  },
  methods: {
    getKeys: function () {
      const self = this
      this.getAllKeys(function (keys) { // nous obtenons toutes les clés
        self.keys = keys
        console.log(keys)
        self.onKeysGet() // à partir des clés, nous obtenons les documents (réponses)
      })
    },
    onKeysGet: function () {
      const self = this
      this.getAllByKeysList(this.keys, function (docs) { // nous obtenons les réponses
        docs = docs.reverse() // nous retournons le tableau pour afficher en premier les derniers éléments
        self.docs = docs // nous conservons les réponses
        self.refreshComponent()
      })
    },
    onVisualiserClick: function (doc) {
      if (this.isInList(doc)) { // nous vérifions que les questions liés aux réponses existent toujours
        this.data.answers = doc
        this.$router.push('/result')
      }
    },
    refreshComponent: function () {
      this.show = true
      this.$forceUpdate()
    },
    isInList: function (doc) { // vérifie si l'entreprise correspondant aux questions est disponible
      console.log(doc.user.enterprise)
      let exist = false
      for (const data of this.list.data) {
        if (data.entreprise === doc.user.enterprise) {
          exist = true
          break
        }
      }
      return exist
    }
  },
  computed: {
    getDocs: function () {
      console.log(this.docs)
      return this.docs
    },
    noDocs: function () {
      return this.docs.length === 0
    }
  }
}
</script>

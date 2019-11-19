<template>
  <div class="col-12">
    <h1 class="text-center">Administration des réponses au question {{question_lib}} de l'entreprise {{entreprise_lib}}</h1>
    <b-card :header="amountReponses + ' réponses'" header-class="text-center">
      <div>
        <b-form v-if="show">
          <div v-for="(reponse, index) of getReponses" :key="index" style="margin-bottom: 50px;">
            <hr>
            <p>texte:</p>
            <b-form-input
            v-model="reponse.text"
            type="text"
            required
            placeholder="réponse"
            ></b-form-input>
            <p>points:</p>
            <b-form-input
            v-model="reponse.points"
            type="number"
            required
            placeholder="points"
            ></b-form-input>
            <b-button-group style="width: 100%">
              <b-button variant="success" @click="modifyResponse()">Modifier</b-button>
              <b-button variant="secondary" @click="removeResponse(reponse)">Supprimer</b-button>
            </b-button-group>
          </div>
          <div>
            <hr>
            <p>libelle:</p>
            <b-form-input
            v-model="new_reponse.text"
            type="text"
            required
            placeholder="text"
            ></b-form-input>
            <p>question:</p>
            <b-form-input
            v-model="new_reponse.points"
            type="number"
            required
            placeholder="points"
            ></b-form-input>
            <b-button block variant="success" @click="addReponse()">Ajouter</b-button>
          </div>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'admin-response-questions',
  mixins: [PouchDbManager],
  created: function () {
    this.getParams()
    this.initNewReponse()
    this.show = false
    const self = this
    this.getList(function (list) {
      self.list = list
      self.find_question()
      self.refreshComponent()
    })
  },
  methods: {
    getParams: function () {
      const params = this.$route.params
      this.entreprise_lib = params['entreprise']
      this.question_lib = params['question']
    },
    find_question: function () {
      const data = this.list.data
      let entreprise = null
      for (const e of data) {
        if (e.entreprise === this.entreprise_lib) {
          entreprise = e
        }
      }

      if (entreprise === null) {
        this.$router.push('/admin')
        return
      }

      let question = null
      for (const q of entreprise.questions) {
        if (q.libelle === this.question_lib) {
          question = q
        }
      }
      if (question === null) {
        this.$router.push('/admin/' + entreprise)
      }

      this.question = question
    },
    modifyResponse: function () {
      this.setList(this.list)
    },
    removeResponse: function (reponse) {
      let i = 0
      let tmpReponse = null
      for (const data of this.question.responses) { // nous recherchons la question
        if (data.text === reponse.text) {
          tmpReponse = data
          break
        }
        i++
      }

      if (tmpReponse != null) { // si une question est trouvé,
        this.question.responses.splice(i, 1) // nous la supprimons
        this.setList(this.list)
      }
    },
    addReponse: function () {
      if (this.new_reponse.text !== '') {
        this.question.responses.push(this.new_reponse)
        this.setList(this.list)
        this.initNewReponse()
      }
    },
    initNewReponse: function () {
      this.new_reponse = {
        text: '',
        points: 0
      }
    },
    refreshComponent: function () {
      this.show = true
      this.$forceUpdate()
    }
  },
  computed: {
    getReponses: function () {
      return this.question.responses
    },
    amountReponses: function () {
      return this.question.responses.length
    }
  }
}
</script>

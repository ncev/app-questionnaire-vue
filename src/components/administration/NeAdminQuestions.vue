<template>
  <div class="col-12">
    <h1 class="text-center">Administration des questions pour l'entreprise {{getEntreprise}}</h1>
    <b-card :header="amountQuestions + ' questions'" header-class="text-center">
      <div>
        <b-form v-if="show">
          <div v-for="(question, index) of getQuestions" :key="index" style="margin-bottom: 50px;">
            <hr>
            <p>libelle:</p>
            <b-form-input
            v-model="question.libelle"
            type="text"
            required
            placeholder="entreprise"
            ></b-form-input>
            <p>question:</p>
            <b-form-input
            v-model="question.question"
            type="text"
            required
            placeholder="question"
            ></b-form-input>
            <b-button-group style="width: 100%">
              <b-button variant="success" @click="modifyQuestion()">Modifier</b-button>
              <b-button variant="secondary" @click="removeQuestion(question)">Supprimer</b-button>
              <b-button variant="info" @click="viewResponses(question)">ses réponses</b-button>
            </b-button-group>
          </div>
          <div>
            <hr>
            <p>libelle:</p>
            <b-form-input
            v-model="new_question.libelle"
            type="text"
            required
            placeholder="entreprise"
            ></b-form-input>
            <p>question:</p>
            <b-form-input
            v-model="new_question.question"
            type="text"
            required
            placeholder="question"
            ></b-form-input>
            <b-button block variant="success" @click="addQuestion()">Ajouter</b-button>
          </div>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'admin-questions',
  mixins: [PouchDbManager],
  created: function () {
    this.show = false
    this.entreprise = this.$route.params['entreprise']
    const self = this
    this.list = null
    this.initNewQuestion()

    this.getList(function (list) { // obtentions des données
      self.list = list
      console.log(list)
      self.checkEntreprise()
      self.refreshComponent()
    })
  },
  methods: {
    checkEntreprise: function () { // recherche des données de l'entreprise actuelle
      this.newQuestion = ''
      this.data.questions = null
      for (const e of this.data.list.data) {
        if (e.entreprise === this.entreprise) {
          this.data.questions = e
          break
        }
      }
      if (this.questions === null) {
        this.$router.push('/admin/entreprise') // si aucune n'est trouvé, on redirige vers la vue précé
      }
    },
    initNewQuestion: function () {
      this.new_question = { // variable pour l'enregistrement des nouvelles questions
        libelle: '',
        question: ''
      }
    },
    modifyQuestion: function () {
      this.setList(this.list)
    },
    removeQuestion: function (question) { // suppresion d'une question
      let i = 0
      let tmpQuestion = null
      for (const data of this.data.questions.questions) { // nous recherchons la question
        if (data.question === question.question) {
          tmpQuestion = data
          break
        }
        i++
      }

      if (tmpQuestion != null) { // si une question est trouvé,
        this.data.questions.questions.splice(i, 1) // nous la supprimons
        this.setList(this.list)
      }
    },
    addQuestion: function () { // ajout d'une question
      const question = this.new_question
      if (question.libelle !== '' & question.question !== '') { // vérification de l'integrité des donnés
        question.responses = []
        this.data.questions.questions.push(question)
        this.initNewQuestion()
        this.setList(this.list)
      }
    },
    viewResponses: function (question) {
      this.$router.push('/admin/questions/' + this.entreprise + '/' + question.libelle)
    },
    refreshComponent: function () { // rafraichir le component.
      this.show = true
      this.$forceUpdate()
    }
  },
  computed: {
    getEntreprise: function () {
      if (this.data.questions === undefined) {
        return ''
      }
      return this.data.questions.entreprise
    },
    amountQuestions: function () {
      if (this.data.questions === undefined) {
        return ''
      }
      return this.data.questions.questions.length
    },
    getQuestions: function () {
      if (this.data.questions === undefined) {
        return ''
      }
      return this.data.questions.questions
    }
  }
}
</script>

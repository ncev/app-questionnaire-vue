<template>
  <div class="col-12">
    <h1 class="text-center">Administration des questions pour l'entreprise {{getEntreprise}}</h1>
    <b-card :header="amountQuestions + ' questions'" class="text-center">
      <div>
        <b-form>
          <div v-for="(question, index) in getQuestions" :key="index" style="margin-bottom: 50px;">
            <hr>
            <b-form-input
            v-model="question.libelle"
            type="text"
            required
            placeholder="entreprise"
            ></b-form-input>
            <b-button-group style="width: 100%">
              <b-button variant="success" @click="modifyQuestion(question)">Modifier</b-button>
              <b-button variant="secondary" @click="removeQuestion(question)">Supprimer</b-button>
            </b-button-group>
          </div>
          <div>
            <hr>
            <b-form-input
            v-model="newQuestion"
            type="text"
            required
            placeholder="nouvelle question"
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
    this.entreprise = this.$route.params['entreprise']
    const self = this
    this.list = null

    this.getList(function (list) {
      self.list = list
      self.checkEntreprise()
    })
  },
  methods: {
    checkEntreprise: function () {
      this.newQuestion = ''
      this.data.questions = null
      for (const e of this.data.list.data) {
        if (e.entreprise === this.entreprise) {
          this.data.questions = e
          break
        }
      }
      if (this.questions === null) {
        this.$router.push('/admin/entreprise')
        return
      }
      console.log(this.data.questions)
    },
    modifyQuestion: function (question) {
      console.log(question)
    },
    removeQuestion: function (question) {
      console.log(question)
    },
    addQuestion: function () {
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
      console.log(this.data.questions.questions[0].libelle)
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

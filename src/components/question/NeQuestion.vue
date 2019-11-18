<template>
  <div class="col-12 text-center">
    <h1>{{NE_questionnaire.entreprise}}</h1>
    <div class="card text-white bg-info mb-3">
      <div class="card-header">nombres de questions pour l'enterprise: {{NE_questionnaire.questions.length}}</div>
      <div class="card-body">
        <h5 class="card-title">Veuillez répondre aux questions</h5>
        <p class="card-text">L'objectif est de répondre au mieux à chacune des questions, une fois terminé, le total des points vous sera presenté.</p>
      </div>
    </div>
    <b-form>
    <div v-for="(question, index) in getQuestions" :key="index">
      <div class="card bg-light mb-3">
        <div class="card-header">Question {{index + pool + 1}}</div>
        <div class="card-body">
          <h5 class="card-title">{{question.question}}</h5>
          <b-form-group>
            <b-form-checkbox-group
              :options="question.responses"
              v-model="question.val"
              :name="question.question"
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    </div>
    <b-button type="button" block variant="outline-primary" @click="onSubmit">Valider</b-button>
    </b-form>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'question',
  mixins: [PouchDbManager],
  created: function () {
    const self = this
    this.getList(function (list) {
      self.list = list
      const params = self.$route.params // hidrate NE_form avec les données des paramètres
      for (const key of Object.keys(self.NE_form)) {
        self.NE_form[key] = params[key]
      }
      self.NE_init()
    })
  },
  methods: {
    NE_init: function () {
      console.log(this.list)
      const maxPool = parseInt(this.list.params.pool.amount)
      let pool = this.pool
      pool = pool * maxPool - maxPool
      this.pool = pool
      this.maxPool = maxPool
      this.NE_initQuestions()
    },
    NE_initQuestions: function () {
      for (const entr of this.list.data) { // nous recherchons l'entreprise passé en paramètre
        if (entr.entreprise === this.NE_form.enterprise) {
          this.NE_questionnaire = entr
        }
      }
      if (this.NE_questionnaire == null) { // si aucune entreprise n'a pu être trouvé
        this.$router.push('/') // on redirige l'utilisateur vers l'accueil
        return
      }
      this.shuffleArray()
      this.sliceQuestions() // nous selections uniquement les questions du pool
      this.setVals() // nous placons les tableaux de réponses (tableau servent à contenir les réponses de l'utilisateur)
    },
    checkEndPool: function () {
      this.endPool = this.pool + this.maxPool >= this.NE_questionnaire.questions.length
    },
    sliceQuestions: function () {
      let questions = this.NE_questionnaire.questions
      questions = questions.slice(this.pool, this.pool + this.maxPool)
      this.questions = questions
    },
    setVals: function () {
      for (const question of this.questions) {
        question.val = []
      }
    },
    onSubmit: function (evt) {
      const questions = this.questions
      const answers = [] // va contenir les résultats de nos questions
      for (const question of questions) { // pour chacune des questions répondu
        const answer = { // on créée une nouvelle variable answer
          text: question.question, // la question répondu
          result: false // dont le résultat est initialisé à 0 par zéro
        }

        /**
         * cette condition vient voir si l'utilisateur a répondu à AU MOINS une réponse parmie celle proposé
         * si, non cela signifie qu'il n'a rien coché, donc pas nécessaire de continuer
         */
        if (question.val !== undefined) {
          let total = 0 // cette variable va contenir la somme des points de chaque réponse
          let totalRep = 0
          for (const response of question.responses) { // pour chaque questions,
            if (response.points === 1) { // on calcul le nombre total de bonnes réponses
              totalRep++
            }
            for (const val of question.val) { // on parcours le tableau des réponses
              if (response.text === val) { // dans le but de trouver si la réponse fournie
                if (response.points === 1) { // est une bonne réponse
                  total++
                } else {
                  total--
                }
              }
            }
          }
          answer.result = total === totalRep
        }
        answers.push(answer)
      }
      this.answers = this.answers.concat(answers)
      this.calcScore(answers)
    },
    calcScore: function (answers) {
      let score = 0
      for (const answer of answers) {
        if (answer.result) {
          score++
        }
      }
      this.score += score
      this.routeResult()
    },
    routeResult: function () {
      const self = this
      if (self.endPool) {
        self.saveAnswers(self.answers, self.NE_form)

        this.$router.push({
          name: 'result'
        })
      } else {
        this.pool += this.maxPool
        this.sliceQuestions()
        this.checkEndPool()
        this.setVals()
      }
    },
    shuffleArray: function () { // permet de randomiser la position des questions
      var array = this.NE_questionnaire.questions
      var currentIndex = array.length; var temporaryValue; var randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      this.NE_questionnaire.questions = array
    }
  },
  data: () => {
    return {
      NE_form: {
        name: '',
        firstname: '',
        enterprise: ''
      },
      NE_questionnaire: null,
      questions: [],
      answers: [],
      pool: 1,
      maxPool: 0,
      score: 0,
      endPool: false
    }
  },
  computed: {
    getQuestions: function () {
      return this.questions
    }
  }
}
</script>

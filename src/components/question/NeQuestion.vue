<template>
  <div class="col-12">
    <h1>{{NE_questionnaire.entreprise}}</h1>
    <div class="card text-white bg-info mb-3">
      <div class="card-header">nombres de questions pour l'enterprise: {{NE_questionnaire.questions.length}}</div>
      <div class="card-body">
        <h5 class="card-title">Veuillez répondre aux questions</h5>
        <p class="card-text">L'objectif est de répondre au mieux à chacune des questions, une fois terminé, le total des points vous sera presenté.</p>
      </div>
    </div>
    <b-form>
    <div v-for="(question, index) in NE_questionnaire.questions" :key="index">
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
import list from '../../../ressources/quest.json' // lecture du fichier JSON avec les questions

export default {
  name: 'question',
  created: function () {
    this.NE_init()
  },
  methods: {
    NE_init: function () {
      this.score = this.$route.params.score

      const maxPool = parseInt(list.params.pool.amount)
      let pool = parseInt(this.$route.params.pool) // obtentions du pool
      pool = pool * maxPool - maxPool
      this.pool = pool
      this.maxPool = maxPool
      const params = this.$route.params // hidrate NE_form avec les données des paramètres
      for (const key of Object.keys(this.NE_form)) {
        this.NE_form[key] = params[key]
      }
      this.NE_initQuestions()
    },
    NE_initQuestions: function () {
      for (const entr of list.data) { // nous recherchons l'entreprise passé en paramètre
        if (entr.entreprise === this.NE_form.enterprise) {
          this.NE_questionnaire = entr
        }
      }
      if (this.NE_questionnaire == null) { // si aucune entreprise n'a pu être trouvé
        this.$router.push('/') // on redirige l'utilisateur vers l'accueil
        return
      }
      this.endPool = this.pool + this.maxPool >= this.NE_questionnaire.questions.length
      console.log(this.endPool)
      let questions = this.NE_questionnaire.questions
      questions = questions.slice(this.pool, this.pool + this.maxPool)
      this.NE_questionnaire.questions = questions
    },
    onSubmit: function (evt) {
      const questions = this.NE_questionnaire.questions
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
        if (question.val !== undefined && question.val.length !== 0) {
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
      this.calcScore(answers)
    },
    calcScore: function (answers) {
      let score = 0
      for (const answer of answers) {
        if (answer.result) {
          score++
        }
      }
      this.routeResult(score)
    },
    routeResult (score) {
      const self = this

      this.$router.push({
        name: 'result',
        params:
          {
            entreprise: self.NE_questionnaire.entreprise,
            score: score
          }
      })
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
      pool: 0,
      maxPool: 0,
      score: 0,
      endPool: false
    }
  }
}
</script>

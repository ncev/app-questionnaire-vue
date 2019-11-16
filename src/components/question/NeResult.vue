<template>
  <div class="col-12">
    <h1>Resultat</h1>
     <div v-for="(question, index) in getQuestions" :key="index" style="margin-top: 25px;">
        <b-card bg-variant="success" text-variant="white" :header="question.question" class="text-center">
        <b-card-text>
          <div v-for="(response, index) in question.responses" :key="index">
            <p>{{response.text}}</p>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'
import list from '../../../ressources/quest.json' // lecture du fichier JSON avec les questions

export default {
  name: 'result',
  mixins: [PouchDbManager],
  created: function () {
    this.fillUser()
    this.fillQuestions()
    console.log(this.data)
  },
  methods: {
    fillUser: function () {
      this.data.user = {}
      this.data.user.name = this.$route.params.name
      this.data.user.firstname = this.$route.params.firstname
      this.data.user.entreprise = this.$route.params.entreprise
    },
    fillQuestions: function () {
      this.data.questions = {}
      for (const q of list.data) {
        if (q.entreprise === this.data.user.entreprise) {
          this.data.questions = q
        }
      }
    }
  },
  computed: {
    getQuestions: function () {
      return this.data.questions.questions
    }
  }
}
</script>

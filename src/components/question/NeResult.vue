<template>
  <div class="col-12">
    <div class="text-center">
      <h1>Résultat</h1>
      <h3>votre score: {{data.user.score}}</h3>
    </div>

    <b-card bg-variant="info" text-variant="white" header="Typologie des résultats" header-class="text-center" style="margin-bottom: 50px; font-size: 25px;">
      <b-card-text>
        <b-media>
      <template v-slot:aside>
        <b-container width="64"></b-container>
      </template>
      <div style="margin-bottom: 25px;">
        <h5 class="mt-0">Titre des cartes:</h5>
        <b-media>
          <template v-slot:aside>
            <b-container width="64"></b-container>
          </template>
          <p class="mb-0">
            > rouge: la ou les réponse(s) fournie(s) sont incorrect(s)
          </p>
          <p class="mb-0">
            > vert: la ou les réponse(s) fournie(s) sont correcte(s)
          </p>
        </b-media>
      </div>
      <div>
        <h5 class="mt-0">Les réponses:</h5>
        <b-media>
          <template v-slot:aside>
            <b-container width="64"></b-container>
          </template>
          <p class="mb-0">
            > rouge: la réponse était à cocher
          </p>
          <p class="mb-0">
            > vert: la réponse n'était pas à cocher
          </p>
        </b-media>
      </div>
    </b-media>
      </b-card-text>
    </b-card>

    <b-card-group v-for="(question, index) in getQuestions" :key="index" style="margin-bottom: 25px;">
      <b-card :header-bg-variant="getVariantHeader(index)" header-text-variant="white" :header="question.question" header-class="text-center">
        <b-card-text>
          <ul class="list-unstyled" v-for="(response, index) in question.responses" :key="index">
            <b-media tag="li">
              <template v-slot:aside>
                <b-img blank :blank-color="getVariantReponse(response)" width="64" alt="placeholder"></b-img>
              </template>
              <h5 class="mb-0" style="margin-top: 20px;">{{response.text}}</h5>
            </b-media>
          </ul>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import PouchDbManager from '../../mixin/pouchDbManager.js'

export default {
  name: 'result',
  mixins: [PouchDbManager],
  created: function () {
    const self = this
    this.getList(function (list) {
      self.list = list
      self.fillUser() // initialisation des donnés de l'utilisateur
      self.fillQuestions() // initialisations des données sur les questions
    })
  },
  methods: {
    fillUser: function () {
      this.data.user = this.data.answers.user // va contenir les données de l'utilisateur en paramètre (comprenant les réponses)0
    },
    fillQuestions: function () {
      this.data.questions = {} // va contenir les questions d'une entreprise
      for (const q of this.list.data) {
        if (q.entreprise === this.data.user.enterprise) {
          this.data.questions = q
        }
      }
    },
    getVariantHeader: function (index) {
      const result = this.data.answers.answers[index].result // le resultat de la question
      if (result) {
        return 'success'
      }
      return 'danger'
    },
    getVariantReponse: function (response) {
      if (response.points === 1) {
        return '#2ecc71'
      }
      return '#c0392b'
    }
  },
  computed: {
    getQuestions: function () {
      return this.data.questions.questions
    }
  }
}
</script>

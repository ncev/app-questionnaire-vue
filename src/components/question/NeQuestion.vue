<template>
  <div class="hello">
    <p>les questions pour l'enterprise:</p>
    <h1>{{NE_form.enterprise}}</h1>
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
      const params = this.$route.params // hidrate NE_form avec les données des paramètres
      for (const key of Object.keys(this.NE_form)) {
        this.NE_form[key] = params[key]
      }
      this.NE_initQuestions()
    },
    NE_initQuestions: function () {
      for (const entr of list.data) { // nous recherchons l'
        if (entr.entreprise === this.NE_form.enterprise) {
          this.NE_questionnaire = entr
        }
      }
      console.log(this.NE_questionnaire)
    }
  },
  data: () => {
    return {
      NE_form: {
        name: '',
        firstname: '',
        enterprise: ''
      },
      NE_questionnaire: null
    }
  }
}
</script>

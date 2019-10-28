<template>
  <div class="hello">
    <p>coucou</p>
    <h1>{{'question'}}</h1>
  </div>
</template>

<script>
import list from '../../../ressources/quest.json'

export default {
  name: 'question',
  created: function () {
    this.NE_init()
  },
  methods: {
    NE_init: function () {
      const params = this.$route.params // hidrate form avec les données des paramètres
      for (const key of Object.keys(this.NE_form)) {
        this.NE_form[key] = params[key]
      }
      this.NE_initQuestions()
    },
    NE_initQuestions: function () {
      console.log(list.data)
    }
  },
  data: () => {
    return {
      NE_form: {
        name: '',
        firstname: '',
        enterprise: ''
      },
      questions: []
    }
  }
}
</script>

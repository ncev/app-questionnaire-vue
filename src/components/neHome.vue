<template>
  <div class="hello text-center">
    <h1>Ici vous pouvez vous connecter</h1>
    <div>
      <div class="col-12">
        <b-card-group deck style="margin-bottom: 25px;">
          <b-card header="Login" class="text-center">
            <b-form @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Nom:"
                label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Nom">
                </b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Prenom:"
                label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.firstname"
                  type="text"
                  required
                  placeholder="Prenom">
                </b-form-input>
              </b-form-group>
              <b-form-group id="input-group-3" label="Entreprise:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  :options="form.enterprise"
                  v-model="form.selectedEntreprise"
                  value-field="item"
                  text-field="text"
                  required>
                </b-form-select>
              </b-form-group>
              <div>
                <b-button block type="submit" variant="outline-success">Valider</b-button>
              </div>
            </b-form>
          </b-card>
        </b-card-group>

        <b-card header="Gestion" class="text-center">
          <b-button block variant="outline-primary" style="margin-bottom: 25px;">Visualiser les résultats</b-button>
          <b-button block variant="outline-info" @click="redirectAdminitration()">Administration</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router' // pour la redirection de l'utilisateur
import PouchDbManager from '../mixin/pouchDbManager.js'
Vue.use(VueRouter)

export default {
  name: 'neHome',
  mixins: [PouchDbManager],
  created: function () { // lors du chargement de la page
    const self = this
    this.getList(function (list) {
      const entreprises = []
      for (const n of list.data) { // pour chaque données (questions d'une entreprise) issue du fichier
        entreprises.push( // nous insérons les données de l'entreprise au sein du tableau entreprises
          { // afin de les afficher dans le formulaire.
            value: n.entreprise,
            text: n.entreprise
          }
        )
      }
      self.form.enterprise = self.form.enterprise.concat(entreprises) // nous ajoutons les données du tableau à celui du formulaire
    })
  },
  data: () => {
    return {
      form: {
        name: '',
        firstname: '',
        selectedEntreprise: 'SELECT_OPTION', // option par défaut
        enterprise: [
          {
            item: 'SELECT_OPTION',
            text: 'Veuillez choisir une option',
            selected: true,
            disabled: true
          }
        ]
      },
      list: null
    }
  },
  methods: {
    onSubmit (evt) { // lors de la validation du formulaire
      const self = this
      this.$router.push(
        {
          name: 'questionnaire', // nous appelons le component
          params: // et lui passons en paramètre les données du formulaire
            {
              name: self.form.firstname,
              firstname: self.form.name,
              enterprise: self.form.selectedEntreprise
            }
        }
      )
    },
    redirectAdminitration: function () {
      this.$router.push('/admin')
    }
  }
}
</script>

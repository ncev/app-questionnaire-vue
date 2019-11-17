import PouchDB from 'pouchdb'
var db = new PouchDB('test_user')
var remoteCouch = 'http://127.0.0.1:5984/app-questionnaire'

const data = {
  answers: null
}

export const PouchDbManager = {
  methods: {
    saveAnswers: function (answers, user) {
      answers = {
        user: user,
        answers: answers
      }
      const obj = {
        '_id': new Date().toString(),
        'obj': answers
      }
      this.data.answers = answers
      db.put(obj, function callback (err, result) {
        if (err) {
          console.log(err)
        }
      })
      this.replicate()
    },
    replicate: function () {
      db.replicate.to(remoteCouch)
    },
    getData: function () {
      return this.data
    }
  },
  data: () => {
    return {
      data
    }
  }
}

export default PouchDbManager

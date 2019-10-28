import PouchDB from 'pouchdb'
var db = new PouchDB('test_user')
var remoteCouch = 'http://127.0.0.1:5984/app-questionnaire'

export const PouchDbManager = {
  methods: {
    saveAnswers: function (answers) {
      const obj = {
        '_id': new Date().toString(),
        'obj': answers
      }
      this.answers = answers
      console.log(answers)
      db.put(obj, function callback (err, result) {
        if (!err) {
          console.log('result added')
          console.log(result)
        } else {
          console.log(err)
        }
      })
      this.replicate()
    },
    replicate: function () {
      db.replicate.to(remoteCouch)
    }
  },
  data: () => {
    return {
      answers: Object
    }
  }
}

export default PouchDbManager

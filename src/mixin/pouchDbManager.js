import PouchDB from 'pouchdb'
var db = new PouchDB('app-questionnaire')
var remoteCouchIp = 'http://127.0.0.1:5984/app-questionnaire'

var dbAdmin = new PouchDB('http://127.0.0.1:5984/app-questionnaire-questions')

const data = {
  answers: null,
  list: null,
  list_admin: null
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
      db.replicate.to(remoteCouchIp)
    },
    getData: function () {
      return this.data
    },
    getList: function (func) {
      const self = this
      if (self.data.list !== null) {
        func(self.data.list)
      } else {
        dbAdmin.get('questions', function callback (err, result) {
          if (err) {
            console.log(err)
          }
          self.data.list_admin = result
          self.data.list = result.data
          func(result.data)
        })
      }
    }
  },
  data: () => {
    return {
      data
    }
  }
}

export default PouchDbManager

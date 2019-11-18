import PouchDB from 'pouchdb'
var db = new PouchDB('app-questionnaire')
var remoteCouchIp = 'http://127.0.0.1:5984/app-questionnaire'

var remoteCouchIpAdmin = 'http://127.0.0.1:5984/app-questionnaire-questions'
var dbAdmin = new PouchDB(remoteCouchIpAdmin)

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
    },
    setList: function (list, func) {
      this.data.list_admin.data = list
      const obj = {
        '_id': this.data.list_admin._id,
        '_rev': this.data.list_admin._rev,
        'data': list
      }
      const self = this
      dbAdmin.put(obj, function callback (err, result) {
        if (err) {
        }
        self.data.list_admin._rev = result.rev
      })
      dbAdmin.replicate.to(remoteCouchIpAdmin)
    }
  },
  data: () => {
    return {
      data
    }
  }
}

export default PouchDbManager

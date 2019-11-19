import PouchDB from 'pouchdb'
var db = new PouchDB('app-questionnaire')
var remoteCouchIp = 'http://127.0.0.1:5984/app-questionnaire'
db.sync(remoteCouchIp)

var remoteCouchIpAdmin = 'http://127.0.0.1:5984/app-questionnaire-questions'
var dbAdmin = new PouchDB(remoteCouchIpAdmin)
dbAdmin.sync(remoteCouchIpAdmin)

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
      this.replicate() // répliquer les données
    },
    replicate: function () {
      db.sync(remoteCouchIp)
    },
    getAllKeys: function (func) { // obtentions des documents de réponse
      db.allDocs({}, function callback (err, result) {
        if (err) {
          console.log(err)
        }
        func(result)
      })
    },
    getAllByKeysList: function (keys, func) {
      keys = JSON.parse(JSON.stringify(keys)) // copie de keys (pour que l'appelant conserve la variable tel quel)
      this.getRecursive(keys, func, [])
    },
    getRecursive: function (keys, func, datas) { // nous obtenons récursivement les données
      if (keys.rows.length === 0) { // l'orsqu'il n'y a plus de données à obtenir
        func(datas)
        return
      }
      const self = this
      db.get(keys.rows[0].id, function callback (err, result) {
        if (err) {
          console.log(err)
          return
        }
        keys.rows.splice(0, 1)
        datas.push(result.obj)
        self.getRecursive(keys, func, datas)
      })
    },
    getList: function (func) { // obtentions de la liste des questions
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
    setList: function (list) { // mettre à jour la liste des questions
      this.data.list_admin.data = list
      const obj = {
        '_id': this.data.list_admin._id,
        '_rev': this.data.list_admin._rev,
        'data': list
      }
      const self = this
      dbAdmin.put(obj, function callback (err, result) {
        if (err) {
          console.log(err)
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

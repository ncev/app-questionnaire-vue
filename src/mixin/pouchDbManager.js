import PouchDB from 'pouchdb'
var db = new PouchDB('test_user')
var remoteCouch = 'http://127.0.0.1:5984/test_user'

class pouchDbManager {
    addPut (obj) {
        db.get(obj, function callback (err, result) {
            if (!err) {
            console.log('Successfully posted a todo!')
            console.log(result)
            }
        })
    }

    replicate () {
        db.replicate.to(remoteCouch)
    }
}
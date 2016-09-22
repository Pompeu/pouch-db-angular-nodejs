(() => {
  'use strict';

  angular
    .module('app')
    .service('db', pouchdb);

  pouchdb.$inject = ['$rootScope', '$q'];

  function pouchdb($rootScope, $q) {

    const db = new PouchDB('chat');

    this.getDB = getDB
    this.getDBSync = getDBSync
    this.put = put;

    function getDB () {
      return $q.when(db);
    }

    function getDBSync () {
      return db; 
    }

    function put(data) {

      if (typeof data.id !== 'undefined'){
        return $q.when(db.put(data));
      }

      return $q.when(db.post(data));
    }

  }
})();

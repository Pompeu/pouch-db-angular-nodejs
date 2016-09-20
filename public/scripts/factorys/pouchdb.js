(() => {
  'use strict';

  angular.module('app').factory('db', pouchdb);

  pouchdb.$inject = ['$rootScope', '$q', '$window'];

  function pouchdb($rootScope, $q, $window) {
    const db = new PouchDB('chat');
    const baseUrl = $window.location.origin;
    const remote = `${baseUrl}/db/chat`;

    const syncOptions = {
      live  : true,
      retry : true,
      sync  : 'now'
    };

    const service = {
      put:   put,
      getDb: getDb
    };

    return service;

    function getDb () {

      db.sync(remote, syncOptions)
        .on('change', () => $rootScope.$emit('chat-sync')); 

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

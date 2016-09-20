(() => {
  'use strict';

  angular.module('app').controller('ChatController', chat);

  chat.$inject = ['$rootScope','db', '$scope', '$q', '$timeout'];

  function chat ($rootScope, db, $scope, $q, $timeout) {
    const cc = this;
    cc.msg = '';
    const localdb = db.getDb()

    init();

    cc.sendMessage = (text, sender) => {
      const message = {
        sender:    sender || 'uname',
        text:      text,
        timestamp: Date.now() 
      };

      db.put(message)
        .then(() => (cc.msg = ''));
    };

    $rootScope.$on('chat-sync', () => init());

    function init () {
      return $q.when(localdb
        .allDocs({
          include_docs: true
        })
        .then(toDocs)
        .then(sortByDate))
        .then(docs => (cc.messages = docs));
    }

    function toDocs (all) {
      return all.rows.map(row => row.doc)
    }

    function sortByDate (docs) {
      return docs.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    }

  }

})();

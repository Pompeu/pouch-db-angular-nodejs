(() => {
  'use strict';

  angular.module('app').controller('ChatController', chat);

  chat.$inject = ['$rootScope','db', '$scope', '$q', '$timeout'];

  function chat ($rootScope, db, $scope, $q, $timeout) {
    const cc = this;
    cc.msg = '';
    const localdb = db.getDBSync()

    init();

    cc.sendMessage = (text, sender) => {
      const message = {
        sender:    sender || 'uname',
        text:      text,
        timestamp: new Date().toUTCString() 
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
        .map(doc => ({
          sender: doc.sender,
          text: doc.text ,
          timestamp: moment(doc.timestamp).format('h:mm:ss a')
        }));
    }

    function sortByDate (docs) {
      return docs.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    }

  }

})();

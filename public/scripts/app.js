(function() {
  angular.module('app',['ngMaterial', 'ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('chat', {
          url : '/',
          templateUrl: '/scripts/templates/chat.html',
          controller: 'ChatController',
          controllerAs: 'cc'
        })
    })
    .run(function (db, $rootScope, $window) {

      const baseUrl = $window.location.origin;
      const remote = `${baseUrl}/db/chat-ruby-conf`;

      const remotexDb = new PouchDB(remote, {
        ajax: {
          headers: {
            'X-Acting-Profile': 'pompeulimp',
            'Authorization':    'Bearer json_web_token'
          }
        }
      });

      const syncOptions = {
        live:  true,
        retry: true,
        sync:  'now'
      };


      db.getDB()
        .then(localDB => {
          return localDB
            .sync(remotexDb, syncOptions)
            .on('change', () => $rootScope.$broadcast('chat-sync')); 
        });

    });
}());

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
      const remote = `${baseUrl}/db/chat`;


      const syncOptions = {
        live:  true,
        retry: true,
        sync:  'now'
      };


      db.getDB()
        .then(localDB => {
          return localDB
            .sync(remote, syncOptions)
            .on('change', () => $rootScope.$broadcast('chat-sync')); 
        });

    });
}());

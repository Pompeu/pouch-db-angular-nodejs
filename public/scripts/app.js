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
    });
}());

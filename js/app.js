angular.module('CardsAgainstAssembly', ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/404');

  $stateProvider.state('home', {
    url:"/",
    templateUrl:"views/home.html",
    controller: "CardsCtrl"
  })
  .state('main', {
    url:"/main",
    templateUrl: "views/main.html",
    controller: "CardsCtrl"
  })
  .state("404", {
    url: "/404",
    templateUrl: "views/404.html"
  });
  
}]);

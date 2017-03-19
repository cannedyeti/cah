angular.module('CardsAgainstAssembly')
.controller('CardsCtrl', ['$scope', "QuestionsFactory", "AnswersFactory", function($scope, QuestionsFactory, AnswersFactory) {
  $scope.qCards = QuestionsFactory.getCards();
  $scope.displayCard = $scope.qCards[pickCardIndex($scope.qCards.length)];
  $scope.numPlayers = 3;
  $scope.errorMessage = "";

  $scope.$watch("numPlayers", function(newVal, oldVal){
    $scope.errorMessage = "";
    if(newVal < 3){
      $scope.errorMessage = "Need at least 3 players";
    } else if (newVal > 10){
      $scope.errorMessage = "Too many players";
    }
  });

}]);

function pickCardIndex(size){
  return Math.floor(Math.random() * size);
}

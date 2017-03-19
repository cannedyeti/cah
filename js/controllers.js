angular.module('CardsAgainstAssembly')
.controller('CardsCtrl', ['$scope', "QuestionsFactory", "AnswersFactory", "sharedProperties", function($scope, QuestionsFactory, AnswersFactory, sharedProperties) {
  $scope.qCards = QuestionsFactory.getCards();
  $scope.displayCard = $scope.qCards[pickCardIndex($scope.qCards.length)];
  $scope.errorMessage = "";
  var CARDS_PER_PLAYER = 2;
  $scope.playerCards = [];
  $scope.selectedAnswers = [];

  $scope.numPlayers = sharedProperties.getNumPlayers();

  for (i = 0; i < $scope.numPlayers; i++) {
        $scope.playerCards.push(shuffleArray(AnswersFactory.getCards(), CARDS_PER_PLAYER))
      };
      

  $scope.$watch("numPlayers", function(newVal, oldVal){
    $scope.errorMessage = "";
    if(newVal < 3){
      $scope.errorMessage = "Need at least 3 players";
    } else if (newVal > 10){
      $scope.errorMessage = "Too many players";
    }
  });
  $scope.assignAnswers = function() {
    sharedProperties.setNumPlayers($scope.numPlayers);
  }
  function shuffleArray(arr, limit) {
    if(limit > arr.length) {
      limit = arr.length;
    }
    var shuffled = arr.sort(function() {
      return 0.5 - Math.random();
    });
    return shuffled.slice(0, limit);
  }

  $scope.selectAnswers = function(playerIndex, card) {
    $scope.selectedAnswers[playerIndex] = card;
  }

}])
.service("sharedProperties", function(){
  var numPlayers = 3;

  return {
    getNumPlayers: function() {
      return numPlayers;
    },
    setNumPlayers: function(value) {
      numPlayers = value;
    }
  }
});

function pickCardIndex(size){
  return Math.floor(Math.random() * size);
}

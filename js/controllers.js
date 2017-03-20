angular.module('CardsAgainstAssembly')
.controller('CardsCtrl', ['$scope', "QuestionsFactory", "AnswersFactory", "sharedProperties", function($scope, QuestionsFactory, AnswersFactory, sharedProperties) {
  $scope.qCards = QuestionsFactory.getCards();
  $scope.displayCard = $scope.qCards[pickCardIndex($scope.qCards.length)];
  $scope.errorMessage = "";
  var CARDS_PER_PLAYER = 2;
  $scope.playerCards = [];
  $scope.selectedAnswers = {};
  $scope.pot = [];
  $scope.czarPicking = false;

  $scope.numPlayers = sharedProperties.getNumPlayers();

  for (i = 0; i < $scope.numPlayers; i++) {
    $scope.playerCards.push(shuffleArray(AnswersFactory.getCards(), CARDS_PER_PLAYER));
  }

  $scope.$watch("numPlayers", function(newVal, oldVal){
    $scope.errorMessage = "";
    if(newVal < 3){
      $scope.errorMessage = "Need at least 3 players";
    } else if (newVal > 10){
      $scope.errorMessage = "Too many players";
    }
  });

  $scope.$watchCollection('selectedAnswers', function(newAnswers, oldAnswers) {
    if(Object.keys(newAnswers).length === $scope.numPlayers-1){
      $scope.czarPicking = true;
      //remove card from players hand and place cards into the pot
      for (var key in newAnswers) {
        if (newAnswers.hasOwnProperty(key)) {
          $scope.pot.push($scope.playerCards[key].splice($scope.playerCards[key].indexOf(newAnswers[key]),1)[0]);
          //add new random card to players hand
          $scope.playerCards[key].push(shuffleArray(AnswersFactory.getCards(), 1)[0]);
        }
      }
    }
  });

  $scope.assignAnswers = function() {
    sharedProperties.setNumPlayers($scope.numPlayers);
  };

  $scope.selectAnswers = function(playerIndex, card) {
    $scope.selectedAnswers[playerIndex] = card;
    console.log($scope.selectedAnswers);
  };

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
  };
});

function pickCardIndex(size){
  return Math.floor(Math.random() * size);
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

angular.module('CardsAgainstAssembly')
.controller('CardsCtrl', ['$scope', "QuestionsFactory", "AnswersFactory", "sharedProperties", function($scope, QuestionsFactory, AnswersFactory, sharedProperties) {
  $scope.qCards = QuestionsFactory.getCards();
  $scope.displayCard = $scope.qCards[pickCardIndex($scope.qCards.length)];
  $scope.errorMessage = "";
  var CARDS_PER_PLAYER = 2;
  var MAX_ROUNDS = 5;
  $scope.playerCards = [];
  $scope.selectedAnswers = {};
  $scope.pot = {};
  $scope.czarPicking = false;
  $scope.cardCzar = 0;
  $scope.points = [];
  $scope.round = 0;

// FIND MAX OF ARRAY METHOD
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  $scope.numPlayers = sharedProperties.getNumPlayers();

  // Initialize points array
  if($scope.points.length === 0) {    
    for (var i = 0; i < $scope.numPlayers; i++) {
        $scope.points.push(0);
      }
  }


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
          $scope.pot[key] = $scope.playerCards[key].splice($scope.playerCards[key].indexOf(newAnswers[key]),1)[0];
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
    if(playerIndex != $scope.cardCzar){
      $scope.selectedAnswers[playerIndex] = card;
    }
  };

  $scope.selectWinningAnswer = function(playerIndex) {
      $scope.selectedAnswers = {};
      $scope.points[playerIndex]++;
      $scope.pot = {};
      $scope.czarPicking = false;
      if ($scope.cardCzar == $scope.numPlayers - 1){
        $scope.cardCzar = 0;
      } else {
        $scope.cardCzar++
      }
      $scope.displayCard = $scope.qCards[pickCardIndex($scope.qCards.length)];
      $scope.round++;
      $scope.checkWin();
  }

  $scope.checkWin = function() {
    if ($scope.round >= MAX_ROUNDS) {
      var winner =  $scope.points.max();
      alert("Player " + ($scope.points.indexOf(winner) + 1) + " won!")
    }
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

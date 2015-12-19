'use strict';

/**
 * @ngdoc function
 * @name ticTacToeApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the ticTacToeApp
 */
angular.module('ticTacToeApp')
  .controller('GameCtrl', ['$scope',function ($scope) {
    //Private variables
    var gameOver = false;
    
    var players =[{
        symbol : 'x',
        name : 'Player 1',
        avatar : '/images/4330.jpg'
      },{
        symbol : 'o',
        name : 'Player 2',
        avatar : '/images/7440.jpg'
      }];
    var usedCells = 0;
    var inLine = 0;
    var dimension = 0;
    //Initializing variables
    $scope.gameReady = false;
    $scope.board = null;  
    $scope.playerTurn = 0;
    $scope.dimension  = 0;
    $scope.actualPlayer = players[0];
    $scope.userMessage = 'it\'s your turn!';
    $scope.showOptions = false;
    $scope.playerOneScore = 0;
    $scope.playerTwoScore = 0;
    
    var gridSizes = [];
    for(var i = 3 ; i <=10;i++){
      gridSizes.push({
        name : i + 'x' + i,
        value   : i
      });
    }
    
    $scope.gridSizes = gridSizes;
    $scope.inLineList = [{
      name : 3,
      value : 3,
    }];
    
    $scope.gridSize = {};
    $scope.inLine = {};
    /**
    * Generate the list of possible parameter for the inline depending the size of the grid
    */
    $scope.generateInLine = function(){
      var size = $scope.gridSize.value;
      console.log($scope.gridSize);
      $scope.inLineList = [];
      for (var i = 3; i <= size;i++){
        $scope.inLineList.push({
          name : i,
          value : i
        });
      }
      $scope.inLine = $scope.inLineList[0];
    };
    
    $scope.showSelectGameMode = function(){
      $scope.gameReady = false;
      $scope.showOptions = false;
      $scope.playerOneScore = 0;
      $scope.playerTwoScore = 0;
    };
    /**
    * On User clicks the field
    * @param x The x position
    * @param y The y position 
    */
    $scope.onCellPress = function(x,y){
        if(gameOver) { return; }
        if($scope.board[x][y] === '-'){
          $scope.board[x][y] = players[$scope.playerTurn].symbol;
          console.log(inLine);
          if(winMove($scope.board,{x : x, y : y},inLine)) {
            $scope.userMessage = 'WON';
            if($scope.playerTurn === 0 ) {
              $scope.playerOneScore++;
            }else {
              $scope.playerTwoScore++;
            }
            gameOver = true;
            $scope.showOptions = true;
          }else {
            usedCells++;
            if(usedCells === dimension * dimension){
              gameOver = true;
              $scope.userMessage = 'TIE';
              $scope.showOptions = true;
            }
            nextPlayerTurn();
          }
        }
    };
    /**
    * Set next player logic
    */
    function nextPlayerTurn(){
      if ($scope.playerTurn === 0){
        $scope.playerTurn = 1;
      }else {
        $scope.playerTurn = 0;
      }
       $scope.actualPlayer = players[$scope.playerTurn];
    }
    
    /**
    * Check if the move in the postion x,y is a winner move or not
    * @param board The board
    * @param position The cordanate of the move in x,y
    * @param inLine Number of symbols that should be consecutive to win
    * @return {Boolean} True if move was a winner one , false if not
    */
    $scope.init = function init(){
      dimension = $scope.gridSize.value;
      inLine    = $scope.inLine.value;
      console.log(dimension);
      console.log(inLine);
      $scope.board = createBoard( dimension,'-');
      //Clear values
      usedCells = 0;
      gameOver  = false;
      $scope.gameReady = true;
      $scope.playerTurn = 0;
      $scope.dimension  = dimension;
      $scope.showOptions = false;
      $scope.actualPlayer = players[0];
      $scope.userMessage = 'it\'s your turn!';
    };
    /**
    * Check if the move in the postion x,y is a winner move or not
    * @param board The board
    * @param position The cordanate of the move in x,y
    * @param min Number of symbols that should be consecutive to win
    * @return {Boolean} True if move was a winner one , false if not
    */
    //TODO : Clean Code
    function winMove(board,position,min){
      var dimension = board.length;
      var col = 0, diagL = 0, diagR = 0, row = 0;
      var symbol = board[position.x][position.y];
      var leftX= 0 , rightX = 0;
      
      for(var i=0; i < dimension; i++){
        //Checking colum
        if(board[position.x][i] === symbol) {
          col++;
        } else if(col < min){
          col = 0;
        }
        //Checking Row
        if(board[i][position.y] === symbol) {
          row++;
        } else  if(row < min){
          row = 0;
        }
        //move the x position for the diagonals
        leftX = i + (position.x - position.y);
        //Left diagonal
        if(leftX >= 0 && leftX < dimension){
          if(board[leftX][i] === symbol){
            diagL++;
          }else if(diagL < min){
            diagL =0;
          }
        }
        //Rigth diagonal
        rightX = position.x + position.y - i;
        if(rightX >= 0 && rightX < dimension){
          if(board[rightX][i]===symbol){
            diagR++;
          }else if(diagR < min){
            diagR =0;
          }
        }
      }
      
      //Return if one of the results is equal to the needed for win the game
      return col >= min || row >= min || diagL >= min || diagR  >= min;
    }
    /**
    * Create a Array of Arrays for simulate the board
    * @param dimensions The dimensions of the board nxn
    * @param value The deafault value that will be insert in the board when it's created
    * @return {Board} Array of Array  nxn
    */
    function createBoard(dimension,value){
      var board = [];
      for(var i = 0; i < dimension; i++){
        board[i] = [];
        for(var j = 0; j< dimension; j++){
          board[i][j] = value;
        }
      }
      return board;
    }
    
     
  }]);

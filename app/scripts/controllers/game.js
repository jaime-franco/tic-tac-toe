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
    //Initializing variables
    $scope.gameReady = false;
    $scope.board = null;  
    $scope.playerTurn = 0;
    $scope.inLine = 3;
    $scope.dimension =3;
    $scope.actualPlayer = players[0];
    $scope.userMessage = "it's your turn!";
    /**
    * On User clicks the field
    * @param x The x position
    * @param y The y position 
    */
    $scope.onCellPress = function(x,y){
        if(gameOver) return;
        if($scope.board[x][y] === '-'){
          $scope.board[x][y] = players[$scope.playerTurn].symbol;
          if(winMove($scope.board,{x : x, y : y},$scope.inLine)) {
            $scope.userMessage = "WON";
            gameOver = true;
          }else {
            usedCells++;
            if(usedCells == $scope.dimension * $scope.dimension){
              gameOver = true;
              $scope.userMessage = "TIE" 
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
    function init(){
      $scope.board = createBoard( $scope.dimension,'-');
    }
    /**
    * Check if the move in the postion x,y is a winner move or not
    * @param board The board
    * @param position The cordanate of the move in x,y
    * @param inLine Number of symbols that should be consecutive to win
    * @return {Boolean} True if move was a winner one , false if not
    */
    //TODO : Clean Code
    function winMove(board,position,inLine){
      var dimension = board.length;
      var col = 0, diagL = 0, diagR = 0, row = 0;
      var symbol = board[position.x][position.y];
      var leftX= 0 , rightX = 0;
      
      for(var i=0; i < dimension; i++){
        //Checking colum
        if(board[position.x][i] === symbol) {
          col++;
        } else if(col !== inLine){
          col = 0;
        }
        //Checking Row
        if(board[i][position.y] === symbol) {
          row++;
        } else  if(row !== inLine){
          row = 0;
        }
        //move the x position for the diagonals
        leftX = i + (position.x - position.y);
        //Left diagonal
        if(leftX >= 0 && leftX < dimension){
          if(board[leftX][i] === symbol){
            diagL++;
          }else if(diagL !== inLine){
            diagL =0;
          }
        }
        //Rigth diagonal
        rightX = dimension  - i + position.x - 1;
        if(rightX >= 0 && rightX < dimension){
          if(board[rightX][i]===symbol){
            diagR++;
          }else if(diagR !== inLine){
            diagR =0;
          }
        }
      }
      
      //Return if one of the results is equal to the needed for win the game
      return col === inLine || row === inLine || diagL === inLine || diagR ===inLine;
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
    
     init();
  }]);

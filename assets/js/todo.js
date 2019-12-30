const todoList = angular.module('todoList', [])

todoList.controller('todoCtrl', function($scope) {

  $scope.addTodo = function(newTodo) {
    console.log(newTodo)

    // need to add todos to an array in local storage
  }

})